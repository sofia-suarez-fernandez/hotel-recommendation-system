from django.db import models
from django.db.models import Avg
from users.models import UserAccount, UserTwitter

class Hotel(models.Model):
    id = models.CharField(max_length=150, unique=True, primary_key=True)
    country = models.CharField(max_length=250, null=True)
    city = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    name = models.CharField(max_length=250)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    price = models.IntegerField(null=True)
    facilities = models.CharField(max_length=4000, null=True)
    images = models.CharField(max_length=4000, null=True)
    objects = models.Manager()

    def num_reviews(self):
        return Review.objects.filter(hotel=self).count()

    def rating_avg(self):
        return Review.objects.filter(hotel=self).aggregate(Avg("rating"))

    def __str__(self):
        return str(self.name)


class City(models.Model):
    country = models.CharField(max_length=250, null=True)
    city = models.CharField(max_length=250)


class Review(models.Model):
    RATING_CHOICES = ((1, "Negative"), (2, "Neutral"), (3, "Positive"))

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    user_twitter = models.ForeignKey(
        UserTwitter, on_delete=models.CASCADE, null=True, blank=True
    )
    user_account = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, null=True, blank=True
    )
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    sentiment = models.IntegerField(choices=RATING_CHOICES, null=True, default=2)
    review = models.CharField(max_length=1000, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    included = models.BooleanField(default=True)
    objects = models.Manager()

    def __str__(self):
        return f"{self.hotel}__{self.rating}__{self.user_twitter}/{self.user_account}"


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
