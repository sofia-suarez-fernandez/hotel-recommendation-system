from decimal import Decimal

from django.db.models import Q
from hotels.models import Hotel, Review, Similarity


class NeighborhoodBasedRecs:

    def recommend_hotels(
        self, user_id, num, current_city, min_sim, max_candidates, neighborhood_size
    ):
        """Function to recommend hotels based on the reviews of the user."""

        is_user_account = user_id.isnumeric()

        active_user_reviews = []

        if is_user_account:
            active_user_reviews = (
                Review.objects.filter(Q(user_account_id__id=user_id))
                .filter(included=True)
                .filter(sentiment__isnull=False)
                .order_by("-sentiment")[:100]
            )

        return self.recommend_hotels_by_amenities(
            num,
            current_city,
            min_sim,
            max_candidates,
            neighborhood_size,
            active_user_reviews=active_user_reviews.values(),
        )

    def recommend_hotels_by_amenities(
        self,
        num,
        current_city,
        min_sim,
        max_candidates,
        neighborhood_size,
        active_user_reviews,
    ):
        """Function to recommend hotels based on the amenities of the hotels reviewed by the user."""

        if len(active_user_reviews) == 0:
            return {}

        # map hotel_name_id to sentiment
        hotel_ids = {
            hotel["hotel_name_id_id"]: hotel["sentiment"] for hotel in active_user_reviews
        }

        # mean of the reviews' sentiments in hotel_ids (hotels reviewed by the user)
        user_mean = sum(hotel_ids.values()) / len(hotel_ids)

        candidate_hotels = []

        # user is filtering by city
        if current_city != "Everywhere":
            hotels_in_current_city = Hotel.objects.filter(locality=current_city).values(
                "hotel_name"
            )

            current_city_hotel_names = [
                item["hotel_name"] for item in hotels_in_current_city
            ]

            # source is in the hotels reviewed by the user
            # target is not in the hotels reviewed by the user
            # similarity is greater than min_sim
            # target is in the hotels in the current city
            candidate_hotels = Similarity.objects.filter(
                Q(source__in=hotel_ids.keys())
                & ~Q(target__in=hotel_ids.keys())
                & Q(similarity__gte=min_sim)
                & Q(target__in=current_city_hotel_names)
            )
        else:
            # source is in the hotels reviewed by the user
            # target is not in the hotels reviewed by the user
            # similarity is greater than min_sim
            candidate_hotels = Similarity.objects.filter(
                Q(source__in=hotel_ids.keys())
                & ~Q(target__in=hotel_ids.keys())
                & Q(similarity__gte=min_sim)
            )

        candidate_hotels = candidate_hotels.order_by("-similarity")[:max_candidates]

        # recommendations dictionary
        recommendations = dict()

        for candidate in candidate_hotels:
            target = candidate.target

            pre = 0
            similarity_sum = 0

            # create a list of hotels with the same target as the current one
            rated_hotels = [i for i in candidate_hotels if i.target == target][
                :neighborhood_size
            ]

            # if there are hotels with the same target as the current one
            if len(rated_hotels) >= 1:
                for similar_hotel in rated_hotels:
                    # r = sentiment of the hotel - mean of the reviews' sentiments in hotel_ids
                    r = Decimal(hotel_ids[similar_hotel.source] - user_mean)
                    # pre = pre + r * similarity of the hotel
                    pre += r * similar_hotel.similarity
                    similarity_sum += similar_hotel.similarity
                # if similarity_sum is greater than 0
                if similarity_sum > 0:
                    # add the prediction to the recommendations dictionary
                    recommendations[target] = {
                        "prediction": Decimal(user_mean) + pre / similarity_sum,
                        "similar_items": [r.source for r in rated_hotels],
                    }

        # sort the recommendations by prediction in descending order
        sorted_recommendations = sorted(
            recommendations.items(), key=lambda hotel: -float(hotel[1]["prediction"])
        )[:num]

        return sorted_recommendations
