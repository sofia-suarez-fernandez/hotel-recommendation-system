from django.db.models import Q
from hotels.models import Hotel, Review
from hotels.serializers import CitySerializer, HotelSerializer, ReviewSerializer
from recommender.online.neighborhood_based_recommender import NeighborhoodBasedRecs
from backend.recommender.online.popularity_recommender_original import PopularityBasedRecs
# from backend.recommender.online.popularity_recommender import PopularityBasedRecs
from rest_framework import generics  # , permissions


# Hotel
class HotelList(generics.ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class HotelDetail(generics.RetrieveAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class CityList(generics.ListAPIView):
    serializer_class = CitySerializer
    queryset = Hotel.objects.all().values("locality", "country").distinct()


# Reviews
class ReviewsList(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class UserReviewsList(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        user = self.kwargs["id"]
        return Review.objects.filter(
            Q(user_account__id=user) | Q(user_twitter__id=user)
        )


class HotelReviewsList(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        hotel = self.kwargs["id"]
        return Review.objects.filter(hotel__id=hotel)
    # .order_by("-created_at")


class CreateReview(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


# Recommender
class CollaborativeFilteringRecList(generics.ListAPIView):
    serializer_class = HotelSerializer

    def get_queryset(self):
        user = self.kwargs["user_id"]
        # current_city = self.kwargs["city"]
        current_city = self.kwargs["locality"]
        min_sim = 0.0
        max_candidates = 10
        neighborhood_size = 1
        num = 30

        print("Recommendations:", num)

        # Collaborative filtering recommender
        cf_hotels = NeighborhoodBasedRecs().recommend_hotels(
            user_id=user,
            num=num,
            current_city=current_city,
            min_sim=min_sim,
            max_candidates=max_candidates,
            neighborhood_size=neighborhood_size,
        )
        cf_hotels_ids = [hotel[0] for hotel in cf_hotels]
        recommended_hotels_ids = cf_hotels_ids
        num_cf_hotels = len(recommended_hotels_ids)
        print("Recommendations from collaborative filtering:", num_cf_hotels)
        print("Hotels ids from collaborative filtering: ", recommended_hotels_ids)

        # Popularity recommender
        num_popular_hotels = num - num_cf_hotels
        if num_popular_hotels != 0:
            popular_hotels = PopularityBasedRecs().popular_hotels_for_user(
                user_id=user, num=num_popular_hotels, current_city=current_city
            )
            popular_hotels_ids = [item["hotel_name_id"] for item in popular_hotels]
            num_popular_hotels = len(popular_hotels_ids)
            print("Recommendations from popular hotels:", num_popular_hotels)
            recommended_hotels_ids.extend(popular_hotels_ids)

        recommended_hotels = Hotel.objects.filter(id__in=recommended_hotels_ids)

        # This sorting is needed since .filter() does not preserve the order
        return sorted(
            recommended_hotels, key=lambda x: recommended_hotels_ids.index(x.id)
        )


class PopularRecList(generics.ListAPIView):
    serializer_class = HotelSerializer

    def get_queryset(self):
        current_city = self.kwargs["id"]
        num = 30

        popular_hotels = PopularityBasedRecs().popular_hotels(
            num=num, current_city=current_city
        )
        popular_hotels_ids = [item["hotel_name_id"] for item in popular_hotels]

        recommended_popular_hotels = Hotel.objects.filter(id__in=popular_hotels_ids)

        # This sorting is needed since .filter() does not preserve the order
        return sorted(
            recommended_popular_hotels, key=lambda x: popular_hotels_ids.index(x.id)
        )
