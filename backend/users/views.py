"""This module contains the views for the users app."""

from rest_framework import generics
from .models import UserAccount  # , UserTwitter
from .serializers import UserAccountSerializer  # , UserTwitterSerializer


# class UserTwitterDetail(generics.RetrieveAPIView):
#     serializer_class = UserTwitterSerializer
#     queryset = UserTwitter.objects.all()


class UserAccountDetail(generics.RetrieveAPIView):
    """Class representing a UserAccountDetail object. Retrieves a user account."""

    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()
