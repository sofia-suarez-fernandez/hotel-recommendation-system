from ...hotels.models import Hotel, Review

class PopularityBasedRecs:
    # Popular hotels for everyone
    def popular_hotels(self, num, current_city):
        popular_hotels = []

        if current_city != "Everywhere":
            hotels_current_city = Hotel.objects.filter(locality=current_city).values("id")
            current_city_ids = [item["id"] for item in hotels_current_city]
            popular_hotels = (
                Review.objects.filter(hotel__in=current_city_ids)
                .values("hotel_name_id")
            )
        else:
            popular_hotels = (
                Review.objects.all()
                .values("hotel_name_id")
            )

        popular_items_sorted = sorted(
            popular_hotels, key=lambda item: -float(item["review_count"])
        )[:num]

        return popular_items_sorted
