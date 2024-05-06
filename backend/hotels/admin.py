from django.contrib import admin
from hotels.models import Hotel, Review


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "hotel_name",
        "locality",
    )
    search_fields = ("hotel__hotel_name",)
    list_filter = ("hotel_name",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "hotel_name",
                    "locality",
                    "street_address",
                )
            },
        ),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "hotel_name",
        "rate",
        "user_account",
    )
    search_fields = (
        "rating",
        "hotel__hotel_name",
        "user_account__username",
    )
    list_filter = ("rate", "user_account", "hotel_name")
