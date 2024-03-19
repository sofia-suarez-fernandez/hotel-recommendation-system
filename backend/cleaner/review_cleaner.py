import logging
import os

import numpy as np
import pandas as pd

logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("Review cleaner")

hotel_review = os.path.join(
    os.path.dirname(__file__), "./csv/input/hotel_review_twitter.csv"
)
hotel = os.path.join(os.path.dirname(__file__), "./csv/output/hotel_twitter.csv")
review = os.path.join(os.path.dirname(__file__), "./csv/output/review_twitter.csv")

# UNCOMMENT FOR RUNNING THE TESTS
# hotel_review = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/input/hotel_review_twitter_test.csv"
# )
# hotel = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/output/hotel_twitter_test.csv"
# )
# review = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/output/review_twitter_test.csv"
# )


def main():
    create_review_database()


def hotel_review_cleaner():
    logger.info("Cleaning hotels reviews...")

    df_hotel_review = pd.read_csv(hotel_review, low_memory=False)
    df_hotel_output = pd.read_csv(hotel, low_memory=False)

    df_hotel_review.drop(
        df_hotel_review.columns.difference(
            ["Hotel Code", "id1", "totalRating", "review", "submittedAt"]
        ),
        axis=1,
        inplace=True,
    )

    df_hotel = pd.DataFrame(
        columns=["hotel_id", "user_twitter_id", "rating", "review", "created_at"]
    )

    df_hotel["hotel_id"] = df_hotel_review["Hotel Code"].astype("string").str[:6]
    df_hotel["hotel_id"] = df_hotel["hotel_id"].str.replace(".", "")
    df_hotel["user_twitter_id"] = df_hotel_review["id1"]
    df_hotel["rating"] = df_hotel_review["totalRating"]
    df_hotel["review"] = df_hotel_review["review"]
    df_hotel["created_at"] = df_hotel_review["submittedAt"]

    # Convert rating to a numeric type to fixing mixing types (int, float)
    df_hotel["rating"] = pd.to_numeric(df_hotel["rating"], errors="coerce")

    # Convert created_at to datetime
    df_hotel["created_at"] = pd.to_datetime(df_hotel["created_at"], errors="coerce")

    df_hotel.sort_values(by=["hotel_id"], inplace=True)

    # Delete all rows where the hotel code does not exist in the hotel database
    df_hotel = df_hotel[df_hotel["hotel_id"].isin(df_hotel_output["id"])].dropna()

    return df_hotel


def create_review_database():
    logger.info("Creating review database...")

    df_hotel_review = hotel_review_cleaner()

    df_review = pd.DataFrame(
        columns=[
            "hotel_id",
            "user_twitter_id",
            "user_account_id",
            "review",
            "rating",
            "sentiment",
            "created_at",
            "updated_at",
            "included",
        ]
    )

    df_review["hotel_id"] = df_hotel_review["hotel_id"]
    df_review["user_twitter_id"] = df_hotel_review["user_twitter_id"]
    df_review["review"] = np.where(
        df_hotel_review["review"].str.len() <= 1000, df_hotel_review["review"], np.nan
    )
    # Convert 5-stars to 3-stars ratings
    df_review["rating"] = df_hotel_review["rating"] * 3 / 5

    df_review["created_at"] = df_hotel_review["created_at"]
    df_review["included"] = True

    # Taking reviews where the rating is not null AND not 0.0
    df_review = df_review[(df_review["rating"].notna() & df_review["rating"] != 0.0)]

    # Deleting reviews with none review text
    df_review = df_review[(df_review["review"].notna())]

    # Rounding 3-stars rating
    df_review["rating"] = df_review["rating"].round().astype(int)
    df_review["sentiment"] = df_review["rating"]

    # Avoid repeated reviews
    df_review.drop_duplicates(
        subset=["hotel_id", "user_twitter_id", "review"], inplace=True
    )

    # Specify dtypes
    df_review = df_review.astype(
        {
            "hotel_id": "int32",
            "user_twitter_id": "string",
            "review": "string",
            "rating": int,
            "sentiment": int,
            "created_at": "datetime64[ns, UTC]",
            "updated_at": "datetime64[ns, UTC]",
            "included": "boolean",
        }
    )

    # print(df_review.dtypes)
    df_review.to_csv(review)


if __name__ == "__main__":
    main()
