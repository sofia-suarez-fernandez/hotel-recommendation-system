from rest_framework import generics
from users.models import UserAccount, UserTwitter
from users.serializers import UserAccountSerializer, UserTwitterSerializer


class UserTwitterDetail(generics.RetrieveAPIView):
    serializer_class = UserTwitterSerializer
    queryset = UserTwitter.objects.all()


class UserAccountDetail(generics.RetrieveAPIView):
    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()
