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

from hotels.models import Similarity, Review



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
        self.db = "django.db.backends.postgresql_psycopg2"

    def build(self, reviews, save=True):
        """Build the item similarity matrix"""
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
            password="myPa$$w0rd",
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

    all_reviews = load_all_reviews()
    ItemSimilarityMatrixBuilder(4, 0.2).build(all_reviews)


def load_all_reviews(min_reviews=1):
    """Load all reviews"""
    columns = ["user_account_id", "hotel_name_id", "sentiment"]

    reviews_data = Review.objects.all().values(*columns)

    df_review = pd.DataFrame.from_records(reviews_data, columns=columns)

    # num_reviews_by_user = df_review["user_id"].value_counts()
    # # < 14 -> SPARSITY: 0.9887726803945661
    # # < 28 -> SPARSITY: 0.931618634438591
    # # < 30 -> SPARSITY: 0.8450902273259902
    # # Filtering reviews by users that made 2 reviews or more
    # df_review = df_review[
    #     ~df_review["user_id"].isin(num_reviews_by_user[num_reviews_by_user < 2].index)
    # ]

    user_count = df_review[["user_account_id", "hotel_name_id"]].groupby("user_account_id").count()
    user_count = user_count.reset_index()
    user_ids = user_count[user_count["hotel_name_id"] > min_reviews]["user_account_id"]
    df_review = df_review[df_review["user_account_id"].isin(user_ids)]
    df_review["sentiment"] = df_review["sentiment"].astype(float)

    return df_review


if __name__ == "__main__":
    main()
