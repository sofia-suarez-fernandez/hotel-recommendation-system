"""This module contains the models for the hotels app."""

import decimal
from django.db import models
from users.models import UserAccount


class Hotel(models.Model):
    """Class representing a Hotel object."""

    CHAR_DEFAULT = ""

    # id = models.CharField(max_length=150, unique=True, primary_key=True)
    hotel_name = models.CharField(max_length=250, unique=True, primary_key=True)
    hotel_description = models.CharField(max_length=4000, default=CHAR_DEFAULT)
    hotel_url = models.CharField(max_length=250, default=CHAR_DEFAULT)
    hotel_image = models.CharField(max_length=4000, default=CHAR_DEFAULT)
    price_range = models.CharField(max_length=250, default=CHAR_DEFAULT)
    street_address = models.CharField(max_length=250, default=CHAR_DEFAULT)
    locality = models.CharField(max_length=250, default=CHAR_DEFAULT)
    country = models.CharField(max_length=250, default=CHAR_DEFAULT)
    review_count = models.IntegerField(null=True)
    rating_value = models.FloatField(null=True)
    objects = models.Manager()

    def num_reviews(self):
        """Return the number of reviews for the hotel."""
        return self.review_count

    def rating_avg(self):
        """Return the average rating for the hotel."""
        return self.rating_value


class Amenity(models.Model):
    """Class representing an Amenity object."""

    hotel_name = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    parking = models.BooleanField()
    wifi = models.BooleanField()
    pool = models.BooleanField()
    gym = models.BooleanField()
    bar = models.BooleanField()
    # evening_entertainment = models.BooleanField()
    pets_allowed = models.BooleanField()
    pool_towels = models.BooleanField()
    coffee_shop = models.BooleanField()
    restaurant = models.BooleanField()
    breakfast = models.BooleanField()
    welcome_drink = models.BooleanField()
    happy_hour = models.BooleanField()
    airport_transportation = models.BooleanField()
    car_hire = models.BooleanField()
    taxi_service = models.BooleanField()
    business_center = models.BooleanField()
    meeting_rooms = models.BooleanField()
    security = models.BooleanField()
    baggage_storage = models.BooleanField()
    concierge = models.BooleanField()
    gift_shop = models.BooleanField()
    non_smoking = models.BooleanField()
    outdoor_fireplace = models.BooleanField()
    shops = models.BooleanField()
    sun_loungers = models.BooleanField()
    atm = models.BooleanField()
    doorperson = models.BooleanField()
    first_aid_kit = models.BooleanField()
    umbrella = models.BooleanField()
    check_in_24h = models.BooleanField()
    front_desk_24h = models.BooleanField()
    private_check_in_out = models.BooleanField()
    dry_cleaning = models.BooleanField()
    laundry_service = models.BooleanField()


class City(models.Model):
    """Class representing a City object."""

    country = models.CharField(max_length=250, null=True)
    locality = models.CharField(max_length=250)

    objects = models.Manager()


class Review(models.Model):
    """Class representing a Review object."""

    RATING_CHOICES = ((1, "Negative"), (2, "Neutral"), (3, "Positive"))
    CHAR_DEFAULT = ""

    hotel_name_id = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    review_title = models.CharField(max_length=250, default=CHAR_DEFAULT, null=True)
    review_text = models.CharField(max_length=4000, default=CHAR_DEFAULT, null=True)
    rate = models.DecimalField(
        max_digits=8, decimal_places=7, default=decimal.Decimal("3.0"), null=True
    )
    sentiment = models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    tripdate = models.CharField(max_length=250, default=CHAR_DEFAULT, null=True)
    included = models.BooleanField(default=True, null=True)
    user_account_id = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    objects = models.Manager()

    def __str__(self):
        return f"{self.hotel_name_id}__{self.rate}__/{self.user_account_id}"


class Similarity(models.Model):
    """Class representing a Similarity object."""

    created = models.DateField()
    source = models.CharField(max_length=150, db_index=True)
    target = models.CharField(max_length=150)
    similarity = models.DecimalField(max_digits=8, decimal_places=7)
    objects = models.Manager()

    class Meta:
        """Class representing a Meta object."""

        db_table = "similarity"

    def __str__(self):
        return "[({} => {}) sim = {}]".format(self.source, self.target, self.similarity)
