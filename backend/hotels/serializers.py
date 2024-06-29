"""Serializers for hotels app"""

from rest_framework import serializers
from .models import City, Hotel, Review, Amenity
from .serializers_fields import NumReviewsField, RatingAvgField
from recommender.online.sentiment_analysis.sentiment_analysis import SentimentAnalysis


class HotelSerializer(serializers.ModelSerializer):
    """Hotel serializer"""

    num_reviews = NumReviewsField()
    rating = RatingAvgField()

    class Meta:
        """Meta class"""
        model = Hotel
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):
    """City serializer"""

    class Meta:
        """Meta class"""
        model = City
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    """Review serializer"""

    class Meta:
        """Meta class"""
        model = Review
        fields = "__all__"

class AmenitiesSerializer(serializers.ModelSerializer):
    """Amenities serializer"""

    class Meta:
        """Meta class"""
        model = Amenity
        fields = "__all__"
