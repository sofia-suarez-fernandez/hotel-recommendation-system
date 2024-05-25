"""Custom fields for hotel serializers """

from abc import ABCMeta, abstractmethod

from rest_framework.fields import Field


class NumReviewsField(Field):
    """Field for number of reviews of a hotel"""

    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, *args, **kwargs):
        """Initialize the field"""
        kwargs["source"] = "*"
        kwargs["read_only"] = True
        super(NumReviewsField, self).__init__(**kwargs)

    def to_representation(self, hotel):
        """Return the number of reviews of a hotel"""
        num_reviews = hotel.num_reviews()
        return num_reviews


class RatingAvgField(Field):
    """Field for average rating of a hotel"""

    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, *args, **kwargs):
        """Initialize the field"""
        kwargs["source"] = "*"
        kwargs["read_only"] = True
        super(RatingAvgField, self).__init__(**kwargs)

    def to_representation(self, hotel):
        """Return the average rating of a hotel"""
        rating_avg = hotel.rating_avg()
        return rating_avg
