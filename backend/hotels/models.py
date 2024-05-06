from django.db import models
from django.db.models import Avg
from users.models import UserAccount


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


class City(models.Model):
    country = models.CharField(max_length=250, null=True)
    locality = models.CharField(max_length=250)


class Review(models.Model):
    RATING_CHOICES = ((1, "Negative"), (2, "Neutral"), (3, "Positive"))
    CHAR_DEFAULT = ""

    hotel_name = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    review_title = models.CharField(max_length=250, default=CHAR_DEFAULT)
    review_text = models.CharField(max_length=4000, default=CHAR_DEFAULT)
    rate = models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    sentiment=models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    tripdate = models.CharField(max_length=250, default=CHAR_DEFAULT)
    included = models.BooleanField(default=True)
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
