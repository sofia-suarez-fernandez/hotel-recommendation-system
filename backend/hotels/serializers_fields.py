from abc import ABCMeta, abstractmethod

from rest_framework.fields import Field


class NumReviewsField(Field):
    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, *args, **kwargs):
        kwargs["source"] = "*"
        kwargs["read_only"] = True
        super(NumReviewsField, self).__init__(**kwargs)

    def to_representation(self, hotel):
        num_reviews = hotel.num_reviews()
        return num_reviews


class RatingAvgField(Field):
    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, *args, **kwargs):
        kwargs["source"] = "*"
        kwargs["read_only"] = True
        super(RatingAvgField, self).__init__(**kwargs)

    def to_representation(self, hotel):
        rating_avg = hotel.rating_avg()
        return rating_avg
