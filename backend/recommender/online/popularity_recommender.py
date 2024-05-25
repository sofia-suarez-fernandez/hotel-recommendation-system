"""Module to implement a PopularityBasedRecs class to recommend popular hotels to users."""

from backend.hotels.models import Hotel, Review


class PopularityBasedRecs:
    """Class representing a PopularityBasedRecs object. Recommends popular hotels to users."""

    def popular_hotels(self, num, current_city):
        """Function to recommend popular hotels to users."""
        popular_hotels = []

        if current_city != "Everywhere":
            hotels_current_city = Hotel.objects.filter(locality=current_city).values(
                "hotel_name"
            )
            current_city_ids = [item["hotel_name"] for item in hotels_current_city]
            popular_hotels = Review.objects.filter(hotel__in=current_city_ids).values(
                "hotel_name_id"
            )
        else:
            popular_hotels = Review.objects.all().values("hotel_name_id")

        popular_items_sorted = sorted(
            popular_hotels, key=lambda item: -float(item["review_count"])
        )[:num]

        return popular_items_sorted
