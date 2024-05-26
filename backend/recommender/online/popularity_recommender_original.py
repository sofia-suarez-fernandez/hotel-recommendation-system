from django.db.models import Avg, Count
from backend.hotels.models import Hotel, Review


class PopularityBasedRecs:
    # Popular hotels for a specific user
    def popular_hotels_for_user(self, user_id, num, current_city):
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
                hotels_current_city = Hotel.objects.filter(
                    locality=current_city
                ).values("id")
                current_city_ids = [item["id"] for item in hotels_current_city]

                popular_hotels = (
                    # Ignore the reviews of hotels that are not in the current city
                    # Ignore the reviews made by the user itself
                    Review.objects.filter(hotel_name__in=current_city_ids)
                    .exclude(hotel_name_id__in=user_hotels_ids_reviewed)
                    .values("hotel_name_id")
                    .annotate(Count("user_twitter"), Avg("rating"))
                )
            else:
                popular_hotels = (
                    # Ignore the reviews made by the user itself
                    Review.objects.all()
                    .exclude(hotel_name_id__in=user_hotels_ids_reviewed)
                    .values("hotel_name_id")
                    .annotate(Count("user_twitter"), Avg("rating"))
                )

        else:
            user_hotels_reviewed = Review.objects.filter(user_twitter=user_id).values(
                "hotel_name_id"
            )
            user_hotels_ids_reviewed = [
                item["hotel_name_id"] for item in user_hotels_reviewed
            ]

            if current_city != "Everywhere":
                hotels_current_city = Hotel.objects.filter(locality=current_city).values(
                    "id"
                )
                current_city_ids = [item["id"] for item in hotels_current_city]

                popular_hotels = (
                    # Ignore the reviews of hotels that are not in the current city
                    # Ignore the reviews made by the user itself
                    Review.objects.filter(hotel_name_id__in=current_city_ids)
                    .exclude(hotel_name_id__in=user_hotels_ids_reviewed)
                    .values("hotel_name_id")
                    .annotate(Count("user_twitter"), Avg("rating"))
                )
            else:
                popular_hotels = (
                    # Ignore the reviews made by the user itself
                    Review.objects.all()
                    .exclude(hotel_name_id__in=user_hotels_ids_reviewed)
                    .values("hotel_name_id")
                    .annotate(Count("user_twitter"), Avg("rating"))
                )

        popular_items_sorted = sorted(
            popular_hotels, key=lambda item: -float(item["user_twitter__count"])
        )[:num]

        return popular_items_sorted

    # Popular hotels for everyone
    def popular_hotels(self, num, current_city):
        popular_hotels = []

        if current_city != "Everywhere":
            hotels_current_city = Hotel.objects.filter(locality=current_city).values("id")
            current_city_ids = [item["id"] for item in hotels_current_city]
            popular_hotels = (
                Review.objects.filter(hotel_name_id__in=current_city_ids)
                .values("hotel_name_id")
                .annotate(Count("user_twitter"), Avg("rating"))
            )
        else:
            popular_hotels = (
                Review.objects.all()
                .values("hotel_name_id")
                .annotate(Count("user_twitter"), Avg("rating"))
            )

        popular_items_sorted = sorted(
            popular_hotels, key=lambda item: -float(item["user_twitter__count"])
        )[:num]

        return popular_items_sorted
