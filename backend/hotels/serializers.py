from hotels.models import City, Hotel, Review
from hotels.serializers_fields import NumReviewsField, RatingAvgField
from rest_framework import serializers


class HotelSerializer(serializers.ModelSerializer):
    num_reviews = NumReviewsField()
    rating = RatingAvgField()

    class Meta:
        model = Hotel
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
