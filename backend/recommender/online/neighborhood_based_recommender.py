from decimal import Decimal

from django.db.models import Q
from hotels.models import Hotel, Review, Similarity


class NeighborhoodBasedRecs:
    def recommend_hotels(
        self, user_id, num, current_city, min_sim, max_candidates, neighborhood_size
    ):
        is_user_account = user_id.isnumeric()

        active_user_reviews = []

        if is_user_account:
            active_user_reviews = (
                Review.objects.filter(Q(user_account__id=user_id))
                .filter(sentiment__isnull=False)
                .filter(included=True)
                .order_by("-sentiment")[:100]
            )
        else:
            active_user_reviews = (
                Review.objects.filter(Q(user_twitter__id=user_id))
                .filter(sentiment__isnull=False)
                .filter(included=True)
                .order_by("-sentiment")[:100]
            )

        return self.recommend_hotels_by_ratings(
            num,
            current_city,
            min_sim,
            max_candidates,
            neighborhood_size,
            active_user_reviews=active_user_reviews.values(),
        )

    def recommend_hotels_by_ratings(
        self,
        num,
        current_city,
        min_sim,
        max_candidates,
        neighborhood_size,
        active_user_reviews,
    ):
        if len(active_user_reviews) == 0:
            return {}

        hotel_ids = {
            hotel["hotel_name_id"]: hotel["sentiment"] for hotel in active_user_reviews
        }
        user_mean = sum(hotel_ids.values()) / len(hotel_ids)

        candidate_hotels = []

        if current_city != "Everywhere":
            hotels_current_city = Hotel.objects.filter(city=current_city).values("id")
            current_city_ids = [item["id"] for item in hotels_current_city]

            candidate_hotels = Similarity.objects.filter(
                Q(source__in=hotel_ids.keys())
                & ~Q(target__in=hotel_ids.keys())
                & Q(similarity__gt=min_sim)
                & Q(target__in=current_city_ids)
            )
        else:
            candidate_hotels = Similarity.objects.filter(
                Q(source__in=hotel_ids.keys())
                & ~Q(target__in=hotel_ids.keys())
                & Q(similarity__gt=min_sim)
            )

        candidate_hotels = candidate_hotels.order_by("-similarity")[:max_candidates]

        recs = dict()

        for candidate in candidate_hotels:
            target = candidate.target

            pre = 0
            sim_sum = 0

            rated_items = [i for i in candidate_hotels if i.target == target][
                :neighborhood_size
            ]

            if len(rated_items) >= 1:
                for sim_item in rated_items:
                    r = Decimal(hotel_ids[sim_item.source] - user_mean)
                    pre += sim_item.similarity * r
                    sim_sum += sim_item.similarity
                if sim_sum > 0:
                    recs[target] = {
                        "prediction": Decimal(user_mean) + pre / sim_sum,
                        "sim_items": [r.source for r in rated_items],
                    }

        sorted_items = sorted(
            recs.items(), key=lambda item: -float(item[1]["prediction"])
        )[:num]

        return sorted_items
