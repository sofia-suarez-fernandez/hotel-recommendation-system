"""Admin module for hotels app"""

from django.contrib import admin
from .models import Hotel, Review


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    """Hotel Admin"""

    list_display = (
        # "id",
        "hotel_name",
        "locality",
    )
    search_fields = ("hotel_name",)
    list_filter = ("hotel_name",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    # "id",
                    "hotel_name",
                    "locality",
                    "street_address",
                )
            },
        ),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """ReviewAdmin"""

    list_display = (
        # "id",
        "hotel_name",
        "rate",
        "user_account",
    )
    search_fields = (
        "rate",
        "hotel_name",
        "user_account",
    )
    list_filter = ("rate", "user_account", "hotel_name")
