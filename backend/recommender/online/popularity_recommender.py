"""Module to implement a PopularityBasedRecs class to recommend popular hotels to users."""

from hotels.models import Hotel, Review


class PopularityBasedRecs:
    """Class representing a PopularityBasedRecs object. Recommends popular hotels to users."""

    def popular_hotels_for_user(self, user_id, num, current_city):
        """Function to recommend popular hotels to a specific user."""
        is_user_account = user_id.isnumeric()
        popular_hotels = []

        if is_user_account:
            user_hotels_reviewed = Review.objects.filter(
                user_account_id=user_id
            ).values("hotel_name_id")
            user_hotels_ids_reviewed = [
                item["hotel_name_id"] for item in user_hotels_reviewed
            ]

            if current_city != "Everywhere":
                popular_hotels = (
                    Hotel.objects.filter(locality=current_city)
                    .exclude(hotel_name__in=user_hotels_ids_reviewed)
                    .order_by("-review_count")
                    .values("hotel_name")[:num]
                )
            else:
                popular_hotels = (
                    Hotel.objects.all()
                    .exclude(hotel_name__in=user_hotels_ids_reviewed)
                    .order_by("-review_count")
                    .values("hotel_name")[:num]
                )

            return popular_hotels
        else:
            if current_city != "Everywhere":
                popular_hotels = (
                    Hotel.objects.filter(locality=current_city)
                    .order_by("-review_count")
                    .values("hotel_name")[:num]
                )
            else:
                popular_hotels = (
                    Hotel.objects.all()
                    .order_by("-review_count")
                    .values("hotel_name")[:num]
                )
            return popular_hotels


    def popular_hotels(self, num, current_city):
        """Function to recommend popular hotels to users."""
        popular_hotels = []

        if current_city != "Everywhere":
            popular_hotels = (
                Hotel.objects.filter(locality=current_city)
                .order_by("-review_count")
                .values("hotel_name")[:num]
            )
        else:
            popular_hotels = (
                Hotel.objects.all().order_by("-review_count").values("hotel_name")[:num]
            )
        return popular_hotels
