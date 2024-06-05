"""Calculate the item similarity matrix"""

import logging
import os
from datetime import datetime

import django
import pandas as pd
import psycopg2
from scipy.sparse import coo_matrix
from sklearn.metrics.pairwise import cosine_similarity

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from hotels.models import Similarity, Amenity


logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("Item similarity calculator")


def normalize(x):
    """Normalize the data"""
    x = x.astype(float)
    x_sum = x.sum()
    x_num = x.astype(bool).sum()
    x_mean = x_sum / x_num

    if x_num == 1 or x.std() == 0:
        return 0.0
    return (x - x_mean) / (x.max() - x.min())


class ItemSimilarityMatrixBuilder(object):
    """Build the item similarity matrix"""

    def __init__(self, min_overlap, min_sim):
        """Initialize the class"""
        self.min_overlap = min_overlap
        self.min_sim = min_sim
        # self.db = "django.db.backends.postgresql_psycopg2"
        self.db="django.db.backends.postgresql"

    def build(self, amenities, save=True):
        """Build the item similarity matrix"""

        logger.debug("Calculating similarities ... using %s amenities", len(amenities))
        
        start_time = datetime.now()

        logger.debug("Creating ratings matrix")

        # Convert amenities to a sparse matrix
        amenities.set_index("hotel_name_id", inplace=True)
        coo = coo_matrix(amenities.values)

        # Calculate similarity matrix
        sim = cosine_similarity(coo)

        # Apply min_sim threshold
        sim = sim * (sim >= self.min_sim)
        # @ multiplies matrices element-wise
        # coo.T is the transpose of coo
        # Apply min_overlap threshold
        overlap = (coo @ coo.T) >= self.min_overlap

        # Apply both thresholds
        # Set to 0 any value in the similarity matrix where the number of amenities shared between two hotels is less than min_overlap.
        sim = sim * overlap

        return sim



        logger.debug("Calculating similarities ... using %s ratings", len(reviews))
        start_time = datetime.now()

        logger.debug("Creating ratings matrix")

        reviews["sentiment"] = reviews["sentiment"].astype(float)
        reviews["user_account_id"] = reviews["user_account_id"].astype("category")
        reviews["hotel_name_id"] = reviews["hotel_name_id"].astype("category")

        coo = coo_matrix(
            (
                reviews["sentiment"],
                (
                    reviews["hotel_name_id"].cat.codes.copy(),
                    reviews["user_account_id"].cat.codes.copy(),
                ),
            )
        )

        logger.debug("Calculating overlaps between the items")
        overlap_matrix = (
            coo.astype(bool).astype(int).dot(coo.transpose().astype(bool).astype(int))
        )

        number_of_overlaps = (overlap_matrix >= self.min_overlap).count_nonzero()

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

        sparsity_level = 1 - (reviews.shape[0] / (coo.shape[0] * coo.shape[1]))
        logger.debug("Sparsity level is %s", sparsity_level)

        start_time = datetime.now()

        cor = cosine_similarity(coo, dense_output=False)

        cor = cor.multiply(cor >= self.min_sim)
        cor = cor.multiply(overlap_matrix >= self.min_overlap)

        hotels = dict(enumerate(reviews["hotel_name_id"].cat.categories))
        logger.debug(
            "Correlation is finished, done in %s seconds", datetime.now() - start_time
        )
        if save:
            start_time = datetime.now()
            logger.debug("save starting")
            self._save_with_django(cor, hotels)

            logger.debug(
                "save finished, done in %s seconds", datetime.now() - start_time
            )

        return cor, hotels

    @staticmethod
    def _get_conn():
        """Get the connection to the database"""
        conn = psycopg2.connect(
            host="localhost",
            database="hotelsrecommendersystem",
            user="postgres",
            # password="myPa$$w0rd",
            password="Gorrion2000!",
        )
        return conn

    def _save_with_django(self, sm, index, created=datetime.now()):
        """Save the similarity matrix"""
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

        # coo.count_nonzero() does NOT exclude the items (0,0), (1,1), (2,2)...
        logger.debug("%s similarities to save", coo.count_nonzero())

        xs, ys = coo.nonzero()
        for x, y in zip(xs, ys):
            if x == y:
                continue

            sim = csr[x, y]

            if len(sims) == 500000:
                Similarity.objects.bulk_create(sims)
                sims = []
                logger.debug("%s saved in %s", no_saved, datetime.now() - start_time)

            new_similarity = Similarity(
                source=index[x], target=index[y], created=created, similarity=sim
            )

            # no_saved excludes the items (0,0), (1,1), (2,2)...
            no_saved += 1
            sims.append(new_similarity)

        Similarity.objects.bulk_create(sims)
        logger.info(
            "%s Similarity items saved, done in %s seconds",
            no_saved,
            datetime.now() - start_time,
        )


def main():
    """Main function to calculate the item similarity matrix"""
    logger.info("Calculation of item similarity")

    all_amenities = load_all_amenities()
    ItemSimilarityMatrixBuilder(4, 0.2).build(all_amenities)


def load_all_amenities():
    """Load all amenities"""
    columns = ["parking", "wifi", "pool", "gym", "bar", "pets_allowed", "pool_towels", "coffee_shop", "restaurant", "breakfast", "welcome_drink", "happy_hour", "airport_transportation", "car_hire", "taxi_service", "business_center", "meeting_rooms", "security", "baggage_storage", "concierge", "gift_shop", "non_smoking", "outdoor_fireplace", "shops", "sun_loungers", "atm", "doorperson", "first_aid_kit", "umbrella", "check_in_24h", "front_desk_24h", "private_check_in_out", "dry_cleaning", "laundry_service", "hotel_name_id"]

    amenities_data = Amenity.objects.all(*columns)
    logger.info(len(amenities_data))

    df_amenity = pd.DataFrame.from_records(amenities_data, columns=columns)
    if df_amenity.empty:
        logger.error("DataFrame is empty after loading data from database.")
        return None
    else:
        logger.info("DataFrame loaded successfully. Number of rows: %s", len(df_amenity))

    return df_amenity

if __name__ == "__main__":
    main()
