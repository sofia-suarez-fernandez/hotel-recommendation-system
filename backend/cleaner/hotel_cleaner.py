import logging
import os

import numpy as np
import pandas as pd

logging.basicConfig(
    format="%(asctime)s : %(levelname)s : %(message)s", level=logging.DEBUG
)
logger = logging.getLogger("Hotel cleaner")


hotel_data = os.path.join(
    os.path.dirname(__file__), "./csv/input/hotel_data_twitter.csv"
)
hotel_info = os.path.join(
    os.path.dirname(__file__), "./csv/input/hotel_info_twitter.csv"
)
hotel = os.path.join(os.path.dirname(__file__), "./csv/output/hotel_twitter.csv")


# UNCOMMENT FOR RUNNING THE TESTS
# hotel_data = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/input/hotel_data_twitter_test.csv"
# )
# hotel_info = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/input/hotel_info_twitter_test.csv"
# )
# hotel = os.path.join(
#     os.path.dirname(__file__), "./csv/tests/output/hotel_twitter_test.csv"
# )


def main():
    create_hotel_database()


def hotel_info_cleaner():
    logger.info("Cleaning hotels info...")

    df_hotel_info = pd.read_csv(hotel_info)

    df_hotel_info.drop(
        df_hotel_info.columns.difference(
            ["Code", "City", "Address", "Latitude", "Longitude", "Price", "Amenities"]
        ),
        axis=1,
        inplace=True,
    )

    df_hotel = pd.DataFrame(
        columns=[
            "id",
            "city",
            "address",
            "latitude",
            "longitude",
            "price",
            "facilities",
        ]
    )

    # Specify dtypes
    df_hotel = df_hotel.astype(
        {
            "id": "int32",
            "city": "string",
            "address": "string",
            "latitude": "float64",
            "longitude": "float64",
            "price": "int32",
            "facilities": "string",
        }
    )

    df_hotel["id"] = df_hotel_info["Code"].astype("string").str[:7]
    df_hotel["id"] = df_hotel["id"].str.replace(".", "")
    df_hotel["city"] = df_hotel_info["City"]
    df_hotel["address"] = df_hotel_info["Address"]
    df_hotel["latitude"] = df_hotel_info["Latitude"]
    df_hotel["longitude"] = df_hotel_info["Longitude"]
    df_hotel["price"] = df_hotel_info["Price"]
    df_hotel["facilities"] = df_hotel_info["Amenities"]

    df_hotel.replace("\r\n", "", regex=True, inplace=True)
    df_hotel.sort_values(by=["address"], inplace=True)
    # Delete duplicated addresses
    df_hotel.drop_duplicates(subset=["address"], inplace=True)
    # Add null price
    df_hotel.replace({"price": {" ": np.nan}}, inplace=True)

    return df_hotel


def hotel_data_cleaner():
    logger.info("Cleaning hotels data...")

    df_hotel_data = pd.read_csv(hotel_data)

    df_hotel_data.drop(
        df_hotel_data.columns.difference(["Address", "Name"]),
        axis=1,
        inplace=True,
    )

    df_hotel = pd.DataFrame(columns=["address", "name"])

    # Specify dtypes
    df_hotel = df_hotel.astype(
        {
            "address": "string",
            "name": "string",
        }
    )

    df_hotel["address"] = df_hotel_data["Address"]
    df_hotel["name"] = df_hotel_data["Name"]

    df_hotel.replace("\n", "", regex=True, inplace=True)
    df_hotel.replace("\r", "", regex=True, inplace=True)
    df_hotel.sort_values(by=["address"], inplace=True)
    # Delete duplicated address
    df_hotel.drop_duplicates(subset=["address"], inplace=True)

    return df_hotel


def create_hotel_database():
    logger.info("Creating hotel database...")

    df_hotel_info = hotel_info_cleaner()
    df_hotel_data = hotel_data_cleaner()

    df_hotel = pd.DataFrame(
        columns=[
            "id",
            "country",
            "city",
            "address",
            "name",
            "latitude",
            "longitude",
            "price",
            "facilities",
            "images",
        ]
    )

    # Specify dtypes
    df_hotel = df_hotel.astype(
        {
            "id": "int32",
            "country": "string",
            "city": "string",
            "address": "string",
            "name": "string",
            "latitude": "float64",
            "longitude": "float64",
            "price": "int32",
            "facilities": "string",
            "images": "string",
        }
    )

    df_hotel["id"] = df_hotel_info["id"]
    df_hotel["country"] = "India"
    df_hotel["city"] = df_hotel_info["city"]
    df_hotel["address"] = df_hotel_data["address"]
    df_hotel["name"] = np.where(
        df_hotel_info["address"].values == (df_hotel_data["address"].values),
        df_hotel_data["name"],
        np.nan,
    )
    df_hotel["latitude"] = df_hotel_info["latitude"]
    df_hotel["longitude"] = df_hotel_info["longitude"]
    df_hotel["price"] = df_hotel_info["price"]
    df_hotel["facilities"] = df_hotel_info["facilities"]
    df_hotel["images"] = np.nan

    df_hotel.sort_values(by=["id"], inplace=True)
    # Delete duplicated id
    df_hotel.drop_duplicates(subset=["id"], inplace=True)
    # If address is null
    df_hotel.dropna(subset=["address"], inplace=True)

    df_hotel.to_csv(hotel, index=False)


if __name__ == "__main__":
    main()
