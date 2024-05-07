from django.db import models
from django.db.models import Avg
from users.models import UserAccount
import decimal


class Hotel(models.Model):
    CHAR_DEFAULT = ""

    id = models.CharField(max_length=150, unique=True, primary_key=True)
    hotel_name = models.CharField(max_length=250)
    hotel_description = models.CharField(max_length=4000, default=CHAR_DEFAULT)
    hotel_url = models.CharField(max_length=250, default=CHAR_DEFAULT)
    hotel_image = models.CharField(max_length=4000, default=CHAR_DEFAULT)
    prince_range = models.CharField(max_length=250, default=CHAR_DEFAULT)
    street_address = models.CharField(max_length=250, default=CHAR_DEFAULT)
    locality = models.CharField(max_length=250, default=CHAR_DEFAULT)
    country = models.CharField(max_length=250, default=CHAR_DEFAULT)
    review_count = models.IntegerField(null=True)
    rating_value = models.FloatField(null=True)
    objects = models.Manager()

class Amenity(models.Model):
    hotel_name = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    parking = models.BooleanField()
    wifi = models.BooleanField()
    pool = models.BooleanField()
    gym = models.BooleanField()
    bar = models.BooleanField()
    evening_entertainment = models.BooleanField()
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
    country = models.CharField(max_length=250, null=True)
    locality = models.CharField(max_length=250)


class Review(models.Model):
    RATING_CHOICES = ((1, "Negative"), (2, "Neutral"), (3, "Positive"))
    CHAR_DEFAULT = ""

    hotel_name = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    review_title = models.CharField(max_length=250, default=CHAR_DEFAULT, null=True)
    review_text = models.CharField(max_length=4000, default=CHAR_DEFAULT, null=True)
    rate = models.DecimalField(max_digits=8, decimal_places=7, default=decimal.Decimal('3.0'))
    sentiment=models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    tripdate = models.CharField(max_length=250, default=CHAR_DEFAULT, null=True)
    included = models.BooleanField(default=True, null=True)
    user_account = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, null=True, blank=True
    )
    objects = models.Manager()

    def __str__(self):
        return f"{self.hotel_name}__{self.rate}__/{self.user_account}"


class Similarity(models.Model):
    created = models.DateField()
    source = models.CharField(max_length=150, db_index=True)
    target = models.CharField(max_length=150)
    similarity = models.DecimalField(max_digits=8, decimal_places=7)
    objects = models.Manager()

    class Meta:
        db_table = "similarity"

    def __str__(self):
        return "[({} => {}) sim = {}]".format(self.source, self.target, self.similarity)
