import logging
import os
import unittest
from datetime import datetime

import django
import pandas as pd
import psycopg2
from scipy.sparse import coo_matrix
from sklearn.metrics.pairwise import cosine_similarity
from tqdm import tqdm

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from hotels.models import Similarity

logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("Item similarity calculator")

CHANDIGARH = "Chandigarh 1"
MAHABALESHWAR = "Mahabaleshwar 1"
MYSORE = "Mysore 1"
OOTY = "Ooty 1"


def normalize(x):
    x = x.astype(float)
    x_sum = x.sum()
    x_num = x.astype(bool).sum()
    x_mean = x_sum / x_num

    if x_num == 1 or x.std() == 0:
        return 0.0
    return (x - x_mean) / (x.max() - x.min())


class ItemSimilarityMatrixBuilder(object):
    def __init__(self, min_overlap=15, min_sim=0.2):
        self.min_overlap = min_overlap
        self.min_sim = min_sim
        self.db = "django.db.backends.postgresql_psycopg2"

    def build(self, ratings, save=True):
        logger.debug("Calculating similarities ... using %s ratings", len(ratings))
        start_time = datetime.now()

        logger.debug("Creating ratings matrix")
        ratings["rating"] = ratings["rating"].astype(float)
        ratings["avg"] = ratings.groupby("user_twitter_id")["rating"].transform(
            lambda x: normalize(x)
        )

        ratings["avg"] = ratings["avg"].astype(float)
        ratings["user_twitter_id"] = ratings["user_twitter_id"].astype("category")
        ratings["hotel_id"] = ratings["hotel_id"].astype("category")

        coo = coo_matrix(
            (
                ratings["avg"].astype(float),
                (
                    ratings["hotel_id"].cat.codes.copy(),
                    ratings["user_twitter_id"].cat.codes.copy(),
                ),
            )
        )

        logger.debug("Calculating overlaps between the items")
        overlap_matrix = (
            coo.astype(bool).astype(int).dot(coo.transpose().astype(bool).astype(int))
        )

        number_of_overlaps = (overlap_matrix > self.min_overlap).count_nonzero()
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

        sparsity_level = 1 - (ratings.shape[0] / (coo.shape[0] * coo.shape[1]))
        logger.debug("Sparsity level is %s", sparsity_level)

        start_time = datetime.now()
        cor = cosine_similarity(coo, dense_output=False)

        cor = cor.multiply(cor > self.min_sim)
        cor = cor.multiply(overlap_matrix > self.min_overlap)

        hotels = dict(enumerate(ratings["hotel_id"].cat.categories))
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

            sim = csr[x, y]

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
            password="myPa$$w0rd",
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

            sim = csr[x, y]

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


class TestItemSimilarityMatrixBuilder(unittest.TestCase):
    def setUp(self):
        self.ratings = pd.DataFrame(
            [
                [1, CHANDIGARH, 3, "2013-10-12 23:21:27+00:00"],
                [1, MAHABALESHWAR, 6, "2013-10-12 23:21:27+00:00"],
                [1, MYSORE, 7, "2013-10-12 23:21:27+00:00"],
                [2, MAHABALESHWAR, 6, "2013-10-12 23:21:27+00:00"],
                [2, MYSORE, 7, "2013-10-12 23:21:27+00:00"],
                [2, OOTY, 3, "2013-10-12 23:21:27+00:00"],
                [3, MAHABALESHWAR, 7, "2013-10-12 23:21:27+00:00"],
                [3, MYSORE, 6, "2013-10-12 23:21:27+00:00"],
                [3, OOTY, 3, "2013-10-12 23:21:27+00:00"],
            ],
            columns=["user_twitter_id", "hotel_id", "rating", "rating_timestamp"],
        )

    def test_simple_similarity(self):
        builder = ItemSimilarityMatrixBuilder(0)

        no_items = len(set(self.ratings["hotel_id"]))
        cor, hotels = builder.build(ratings=self.ratings, save=False)
        df = pd.DataFrame(cor.toarray(), columns=hotels.values(), index=hotels.values())
        self.assertIsNotNone(df)
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

        self.assertAlmostEqual(df[MAHABALESHWAR][MYSORE], 0.71066905451870177)
        self.assertAlmostEqual(df[MYSORE][MYSORE], 1)
        self.assertAlmostEqual(df[CHANDIGARH][CHANDIGARH], 1)
        self.assertAlmostEqual(df[MAHABALESHWAR][MAHABALESHWAR], 1.0)
        self.assertAlmostEqual(df[OOTY][OOTY], 1)

    def test_min_ratings(self):
        builder = ItemSimilarityMatrixBuilder(2)

        cor, hotels = builder.build(ratings=self.ratings, save=False)
        df = pd.DataFrame(cor.toarray(), columns=hotels.values(), index=hotels.values())
        self.assertEqual(
            cor.shape[0], 4, "Expected correlations matrix to have a row for each item"
        )
        self.assertEqual(
            cor.shape[1],
            4,
            "Expected correlations matrix to have a column for each item",
        )

        self.assertAlmostEqual(df[MAHABALESHWAR][MYSORE], 0.71066905451870177)
        self.assertAlmostEqual(df[MYSORE][MYSORE], 1)

    def test_save_similarities(self):
        builder = ItemSimilarityMatrixBuilder(0, 0.1)

        cor = builder.build(ratings=self.ratings)

        self.assertIsNotNone(cor)

        similarities = Similarity.objects.all()
        av_log = similarities[0]

        self.assertEqual(Similarity.objects.count(), 2)
        self.assertEqual(av_log.source, MYSORE)
        self.assertEqual(av_log.target, MAHABALESHWAR)
        self.assertAlmostEqual(float(av_log.similarity), 0.71066905451870177)

    def test_overlap(self):
        builder = ItemSimilarityMatrixBuilder(1, -1)

        cor, hotels = builder.build(ratings=self.ratings, save=False)

        self.assertIsNotNone(cor)

        self.assertEqual(cor.count_nonzero(), 9)


if __name__ == "__main__":
    unittest.main()
