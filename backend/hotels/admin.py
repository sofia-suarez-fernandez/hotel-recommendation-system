from django.contrib import admin
from hotels.models import Hotel, Review


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "city",
    )
    search_fields = ("hotel__name",)
    list_filter = ("name",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "name",
                    "city",
                    "address",
                )
            },
        ),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "hotel",
        "rating",
        "user_twitter",
        "user_account",
    )
    search_fields = (
        "rating",
        "hotel__name",
        "user_twitter__username",
        "user_account__username",
    )
    list_filter = ("rating", "user_account", "user_twitter", "hotel")
