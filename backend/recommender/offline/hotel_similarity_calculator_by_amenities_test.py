import logging
import os
import unittest
from datetime import datetime

from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import coo_matrix
from tqdm import tqdm

import django
import numpy as np
import pandas as pd
import psycopg2

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from hotels.models import Similarity


logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("Item similarity calculator")

MARGARITVILLE = "Margaritaville Resort Times Square"
MOXY = "Moxy NYC Times Square"
POD51 = "Pod 51 Hotel"
BRYANT = "The Bryant Park Hotel"


def normalize(x):
    """Normalize the data"""
    x = x.astype(float)
    norm = np.linalg.norm(x)
    if norm == 0:
        return x
    return x / norm


class HotelSimilarityByAmenitiesMatrixBuilder(object):
    def __init__(self, min_overlap=15, min_sim=0.2):
        self.min_overlap = min_overlap
        self.min_sim = min_sim
        self.db = "django.db.backends.postgresql"

    def build(self, amenities, save=True):
        """Build the item similarity matrix"""

        logger.debug("Calculating similarities ... using %s hotels", len(amenities))
        start_time = datetime.now()

        logger.debug("Creating amenities matrix...")

        # Convert amenities to a sparse matrix
        amenities.set_index("hotel_name_id", inplace=True)
        
        coo = coo_matrix(amenities.values)

        logger.debug("Calculating overlap matrix...")
        overlap_matrix = (
            coo.astype(bool).astype(int).dot(coo.transpose().astype(bool).astype(int))
        )

        number_of_overlaps = (overlap_matrix > self.min_overlap).count_nonzero()

        print("Number of overlaps: ", number_of_overlaps)
        
        logger.debug(
            "Overlap matrix leaves %s out of %s with %s",
            number_of_overlaps,
            overlap_matrix.count_nonzero(),
            self.min_overlap,
        )

        logger.debug(
            "Rating matrix (size %sx%s) finished, in %s seconds",
            coo.shape[0],
            coo.shape[1],
            datetime.now() - start_time,
        )

        sparsity_level = 1 - (amenities.shape[0] / (coo.shape[0] * coo.shape[1]))
        logger.debug("Sparsity level: %s", sparsity_level)

        start_time = datetime.now()

        logger.debug("Calculating similarity matrix...")

        cor = cosine_similarity(coo, dense_output=False)

        # Apply min_sim threshold
        cor = cor.multiply(cor > self.min_sim)

        # Apply min_overlap threshold
        cor = cor.multiply(overlap_matrix > self.min_overlap)

        # Create a dictionary of hotel names
        hotels = dict(enumerate(amenities.index.unique()))
        logger.debug(
            "Correlation is finished, done in %s seconds", datetime.now() - start_time
        )

        if save:
            start_time = datetime.now()
            logger.debug("save starting")
            if self.db == "django.db.backends.postgresql":
                self._save_similarities(cor, hotels)
            else:
                self._save_with_django(cor, hotels)

            logger.debug(
                "Save finished, done in %s seconds", datetime.now() - start_time
            )

        return cor, hotels

    def _save_similarities(self, sm, index, created=datetime.now()):
        start_time = datetime.now()

        logger.debug("Truncating table in %s seconds", datetime.now() - start_time)
        no_saved = 0
        sims = []
        coo = coo_matrix(sm)
        csr = coo.tocsr()

        logger.debug(
            "Instantiation of coo_matrix in %s seconds",
            datetime.now() - start_time,
        )

        query = (
            "Insert into similarity (created, source, target, similarity) values %s;"
        )

        conn = self._get_conn()
        cur = conn.cursor()

        cur.execute("Truncate table similarity")

        logger.debug("%s similarities to save", coo.count_nonzero())
        xs, ys = coo.nonzero()
        for x, y in tqdm(zip(xs, ys), leave=True):
            if x == y:
                continue

            sim = round(csr[x, y], 7)

            if sim < self.min_sim:
                continue

            if len(sims) == 500000:
                psycopg2.extras.execute_values(cur, query, sims)
                sims = []
                logger.debug("%s saved in %s", no_saved, datetime.now() - start_time)

            new_similarity = (str(created), index[x], index[y], sim)
            no_saved += 1
            sims.append(new_similarity)

        psycopg2.extras.execute_values(cur, query, sims, template=None, page_size=1000)
        conn.commit()
        logger.debug(
            "%s Similarity items saved, done in %s seconds",
            no_saved,
            datetime.now() - start_time,
        )

    @staticmethod
    def _get_conn():
        conn = psycopg2.connect(
            host="localhost",
            database="hotelsrecommendersystem",
            user="postgres",
            password="Gorrion2000!",
        )
        return conn

    def _save_with_django(self, sm, index, created=datetime.now()):
        start_time = datetime.now()
        Similarity.objects.all().delete()
        logger.info("truncating table in %s seconds", datetime.now() - start_time)
        sims = []
        no_saved = 0
        start_time = datetime.now()
        coo = coo_matrix(sm)
        csr = coo.tocsr()

        logger.debug(
            "instantiation of coo_matrix in %s seconds", datetime.now() - start_time
        )
        logger.debug("%s similarities to save", coo.count_nonzero())
        xs, ys = coo.nonzero()
        for x, y in zip(xs, ys):
            if x == y:
                continue

            sim = round(csr[x, y], 7)

            if sim < self.min_sim:
                continue

            if len(sims) == 500000:
                Similarity.objects.bulk_create(sims)
                sims = []
                logger.debug("%s saved in %s", no_saved, datetime.now() - start_time)

            new_similarity = Similarity(
                source=index[x], target=index[y], created=created, similarity=sim
            )
            no_saved += 1
            sims.append(new_similarity)

        Similarity.objects.bulk_create(sims)
        logger.info(
            "%s Similarity items saved, done in %s seconds",
            no_saved,
            datetime.now() - start_time,
        )


class TestHotelSimilarityByAmenitiesMatrixBuilder(unittest.TestCase):
    def setUp(self):
        self.amenities = pd.DataFrame(
            [
                [
                    True,
                    True,
                    True,
                    True,
                    False,
                    False,
                    False,
                    True,
                    True,
                    True,
                    False,
                    True,
                    True,
                    True,
                    False,
                    True,
                    False,
                    False,
                    True,
                    False,
                    True,
                    False,
                    False,
                    False,
                    True,
                    False,
                    True,
                    True,
                    True,
                    True,
                    False,
                    True,
                    True,
                    True,
                    MARGARITVILLE,
                ],
                [
                    True,
                    True,
                    True,
                    False,
                    False,
                    False,
                    False,
                    True,
                    True,
                    True,
                    True,
                    False,
                    False,
                    False,
                    True,
                    True,
                    True,
                    True,
                    False,
                    True,
                    True,
                    False,
                    False,
                    True,
                    True,
                    False,
                    True,
                    False,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    MOXY,
                ],
                [
                    True,
                    False,
                    True,
                    False,
                    True,
                    True,
                    False,
                    True,
                    False,
                    True,
                    False,
                    False,
                    False,
                    False,
                    True,
                    False,
                    False,
                    False,
                    True,
                    True,
                    False,
                    True,
                    False,
                    False,
                    True,
                    False,
                    True,
                    True,
                    False,
                    True,
                    True,
                    False,
                    False,
                    True,
                    POD51,
                ],
                [
                    True,
                    True,
                    True,
                    True,
                    True,
                    False,
                    True,
                    True,
                    False,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    False,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    True,
                    False,
                    False,
                    True,
                    True,
                    True,
                    True,
                    True,
                    BRYANT,
                ],
            ],
            columns=[
                "parking",
                "wifi",
                "pool",
                "gym",
                "bar",
                "pets_allowed",
                "pool_towels",
                "coffee_shop",
                "restaurant",
                "breakfast",
                "welcome_drink",
                "happy_hour",
                "airport_transportation",
                "car_hire",
                "taxi_service",
                "business_center",
                "meeting_rooms",
                "security",
                "baggage_storage",
                "concierge",
                "gift_shop",
                "non_smoking",
                "outdoor_fireplace",
                "shops",
                "sun_loungers",
                "ATM",
                "doorperson",
                "first_aid_kit",
                "umbrella",
                "check_in_24h",
                "front_desk_24h",
                "private_check_in_out",
                "dry_cleaning",
                "laundry_service",
                "hotel_name_id",
            ],
        )

    def test_simple_similarity(self):
        builder = HotelSimilarityByAmenitiesMatrixBuilder(10, 0.5)

        no_items = len(set(self.amenities["hotel_name_id"]))
        
        cor, hotels = builder.build(amenities=self.amenities, save=False)

        self.assertIsNotNone(cor, "Cor matrix is None")
        self.assertIsNotNone(hotels, "Hotels dictionary is None")

        df = pd.DataFrame(cor.toarray(), columns=hotels.values(), index=hotels.values())
        
        self.assertIsNotNone(df, "Dataframe is None")
        self.assertEqual(
            df.shape[0],
            no_items,
            "Expected correlations matrix to have a row for each item",
        )
        self.assertEqual(
            df.shape[1],
            no_items,
            "Expected correlations matrix to have a column for each item",
        )

        self.assertAlmostEqual(df[MARGARITVILLE][MOXY], 0.6978632)
        self.assertAlmostEqual(df[MARGARITVILLE][MARGARITVILLE], 1)
        self.assertAlmostEqual(df[MOXY][MOXY], 1)
        self.assertAlmostEqual(df[POD51][POD51], 1)
        self.assertAlmostEqual(df[BRYANT][BRYANT], 1)

    def test_min_items(self):
        builder = HotelSimilarityByAmenitiesMatrixBuilder(10, 0.5)

        cor, hotels = builder.build(amenities=self.amenities, save=False)

        df = pd.DataFrame(cor.toarray(), columns=hotels.values(), index=hotels.values())

        self.assertEqual(
            cor.shape[0], 4, "Expected correlations matrix to have a row for each item"
        )
        self.assertEqual(
            cor.shape[1],
            4,
            "Expected correlations matrix to have a column for each item",
        )

        self.assertAlmostEqual(df[MARGARITVILLE][MOXY], 0.6978632)
        self.assertAlmostEqual(df[MOXY][MOXY], 1)

    def test_save_similarities(self):
        builder = HotelSimilarityByAmenitiesMatrixBuilder(10, 0.5)

        cor = builder.build(amenities=self.amenities)

        self.assertIsNotNone(cor)

        similarities = Similarity.objects.all()
        av_log = similarities[0]

        self.assertEqual(Similarity.objects.count(), 10)
        self.assertEqual(av_log.source, MARGARITVILLE)
        self.assertEqual(av_log.target, MOXY)
        self.assertAlmostEqual(float(av_log.similarity), 0.6978632)

    def test_overlap(self):
        builder = HotelSimilarityByAmenitiesMatrixBuilder(1, -1)

        cor, hotels = builder.build(amenities=self.amenities, save=False)

        self.assertIsNotNone(cor)

        self.assertEqual(
            cor.count_nonzero(), 16
        )


if __name__ == "__main__":
    unittest.main()
