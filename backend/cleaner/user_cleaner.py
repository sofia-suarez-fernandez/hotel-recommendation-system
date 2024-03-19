import logging
import os

import numpy as np
import pandas as pd

logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("User cleaner")

hotel_review = os.path.join(
    os.path.dirname(__file__), "./csv/input/hotel_review_twitter.csv"
)
user = os.path.join(os.path.dirname(__file__), "./csv/output/user_twitter.csv")

# UNCOMMENT FOR RUNNING THE TESTS
# hotel_review = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/input/hotel_review_twitter_test.csv"
# )
# user = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/output/user_twitter_test.csv"
# )


def main():
    create_user_database()


def hotel_review_cleaner():
    logger.info("Cleaning hotel reviews...")

    df_hotel_review = pd.read_csv(hotel_review, low_memory=False)

    df_hotel_review.drop(
        df_hotel_review.columns.difference(["id1", "firstName"]),
        axis=1,
        inplace=True,
    )

    df_hotel_review.rename(
        columns={
            "id1": "id",
            "firstName": "first_name",
        },
        inplace=True,
    )

    # Setting first_name as Anonymous if the first_name is null.
    # This is needed to create the username in create_user_database()
    df_hotel_review["first_name"] = np.where(
        df_hotel_review["first_name"].isnull(),
        "anonymous",
        df_hotel_review["first_name"],
    )

    return df_hotel_review


def create_user_database():
    logger.info("Creating user database...")

    df_hotel_review = hotel_review_cleaner()

    df_user = pd.DataFrame(
        columns=[
            "id",
            "username",
            "first_name",
        ]
    )

    df_user["id"] = df_hotel_review["id"]
    df_user["username"] = np.where(
        df_hotel_review["first_name"].duplicated(keep=False),
        df_hotel_review["first_name"]
        + df_hotel_review.groupby("first_name").cumcount().add(1).astype(str),
        df_hotel_review["first_name"],
    )
    df_user["first_name"] = df_hotel_review["first_name"]

    df_user = df_user.drop_duplicates(subset=["id"])

    # Specify dtypes
    df_user = df_user.astype(
        {
            "id": "string",
            "username": "string",
            "first_name": "string",
        }
    )

    # print(df_review.dtypes)

    df_user.to_csv(user, index=False)


if __name__ == "__main__":
    main()
