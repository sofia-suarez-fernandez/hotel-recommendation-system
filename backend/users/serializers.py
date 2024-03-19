from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as UserCreateSerializerDjoser
from rest_framework import serializers
from users.models import UserAccount, UserTwitter

UserAccount = get_user_model()


class UserAccountSerializer(UserCreateSerializerDjoser):
    class Meta(UserCreateSerializerDjoser.Meta):
        model = UserAccount
        fields = "__all__"


class UserTwitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTwitter
        fields = "__all__"
