from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    def create_superuser(self, email, username, password=None, **other_fields):
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_active", True)

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **other_fields)

        user.set_password(password)
        user.save()
        return user

    def create_user(
        self, email, username, first_name, last_name, password=None, **other_fields
    ):
        if not email:
            raise ValueError(("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            **other_fields
        )

        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=150, unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(
        max_length=150, blank=True, null=True
    )  # Delete null=True
    last_name = models.CharField(
        max_length=150, blank=True, null=True
    )  # Delete null=True
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name", "is_staff"]

    def __str__(self):
        return str(self.username)


# class UserTwitter(models.Model):
#     id = models.CharField(max_length=150, unique=True, primary_key=True)
#     username = models.CharField(max_length=150, unique=True)
#     first_name = models.CharField(max_length=150, blank=True, null=True)

#     objects = models.Manager()

#     def __str__(self):
#         return str(self.username)
