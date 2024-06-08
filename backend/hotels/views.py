"""This module contains the views for the hotels app."""

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics  # , permissions
from django.db.models import Q
from recommender.online.popularity_recommender import PopularityBasedRecs
from .models import City, Hotel, Review, Amenity
from .serializers import CitySerializer, HotelSerializer, ReviewSerializer, AmenitiesSerializer

from recommender.online.neighborhood_based_hotel_recommender import NeighborhoodBasedRecs


# Hotel
class HotelList(generics.ListAPIView):
    """Class representing a HotelList object. Lists all hotels."""

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class HotelDetail(generics.RetrieveAPIView):
    """Class representing a HotelDetail object. Retrieves a hotel."""

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get_object(self):
        """Retrieve the hotel object, replacing hyphens in the pk with spaces."""
        pk = self.kwargs.get("pk").replace("-", " ").lower()
        try:
            hotel = self.queryset.get(hotel_name__iexact=pk)
            return hotel
        except ObjectDoesNotExist:
            raise Http404


class CityList(generics.ListAPIView):
    """Class representing a CityList object. Lists all cities."""

    serializer_class = CitySerializer
    queryset = City.objects.all().values("locality", "country").distinct()


# Reviews
class ReviewsList(generics.ListAPIView):
    """Class representing a ReviewsList object. Lists all reviews."""

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class UserReviewsList(generics.ListAPIView):
    """Class representing a UserReviewsList object. Lists all reviews of a user."""

    serializer_class = ReviewSerializer

    def get_queryset(self):
        user = self.kwargs["id"]
        return Review.objects.filter(user_account_id__id=user)


class HotelReviewsList(generics.ListAPIView):
    """Class representing a HotelReviewsList object. Lists all reviews of a hotel."""

    serializer_class = ReviewSerializer

    def get_queryset(self):
        id = self.kwargs["id"].replace("-", " ").lower()
        try:
            reviews = Review.objects.filter(
                hotel_name_id__hotel_name__iexact=id
            ).order_by("-created_at")
            return reviews
        except ObjectDoesNotExist:
            raise Http404


class CreateReview(generics.CreateAPIView):
    """Class representing a CreateReview object. Creates a review."""

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    """Class representing a ReviewDetail object. Retrieves, updates, or deletes a review."""

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


# Amenities
class HotelAmenitiesList(generics.ListAPIView):
    """Class representing a HotelAmenitiesList object. Lists all amenities of a hotel."""

    serializer_class = AmenitiesSerializer

    def get_queryset(self):
        id = self.kwargs["id"].replace("-", " ").lower()
        try:
            amenities = Amenity.objects.filter(
                hotel_name_id__hotel_name__iexact=id
            )
            return amenities
        except ObjectDoesNotExist:
            raise Http404


# Recommender
class CollaborativeFilteringRecList(generics.ListAPIView):
    """Class representing a CollaborativeFilteringRecList object. Recommends hotels to a user based on collaborative filtering."""

    serializer_class = HotelSerializer

    def get_queryset(self):
        user = self.kwargs["user_account_id"]
        current_city = self.kwargs["locality"]
        min_sim = 0.3
        max_candidates = 10
        neighborhood_size = 1
        num = 30

        print("Max number of recommendations: ", num)

        # Collaborative filtering recommender
        recommended_hotels_ids = []
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
        print("--- COLLABORATIVE FILTERING ---")
        print("Number of recommendations from CF: ", num_cf_hotels)
        print("Hotel names from CF: ", recommended_hotels_ids)
        print()

        # Popularity recommender
        num_popular_hotels = num - num_cf_hotels
        print(num_popular_hotels)
        if num_popular_hotels != 0:
            popular_hotels = PopularityBasedRecs().popular_hotels_for_user(
                user_id=user, num=num_popular_hotels, current_city=current_city
            )
            popular_hotels_ids = [item["hotel_name"] for item in popular_hotels]
            num_popular_hotels = len(popular_hotels_ids)

            print("--- POPULARITY ---")
            print("Number of recommendations from Popular hotels: ", num_popular_hotels)
            print("Hotel names from Popular hotels: ", popular_hotels_ids)
            print()

            # Check for repeated hotels in both recommendation algorithms
            print("--- REPEATED HOTELS ---")
            print("Checking for repeated hotels in both recommendation algorithms...")
            repeated = set(recommended_hotels_ids) & set(popular_hotels_ids)
            print("Repeated hotels in both recommendation algorithms:", repeated)
            print("Number of repeated hotels: ", len(repeated))
            print()

            # Add popular hotels to the list of recommendations
            recommended_hotels_ids.extend(popular_hotels_ids)

        recommended_hotels = Hotel.objects.filter(hotel_name__in=recommended_hotels_ids)

        # This sorting is needed since .filter() does not preserve the order
        print("--- FINAL RECOMMENDATIONS ---")
        print("Final number of recommendations: ", len(recommended_hotels))
        print("Final hotel names: ", recommended_hotels_ids)
        print()
        
        return sorted(
            recommended_hotels, key=lambda x: recommended_hotels_ids.index(x.hotel_name)
        )


class PopularRecList(generics.ListAPIView):
    """Class representing a PopularRecList object. Recommends popular hotels to a user."""

    serializer_class = HotelSerializer

    def get_queryset(self):
        # current_city = self.kwargs["id"]
        current_city = self.kwargs["locality"]
        num = 30

        popular_hotels = PopularityBasedRecs().popular_hotels(
            num=num, current_city=current_city
        )
        popular_hotels_ids = [item["hotel_name"] for item in popular_hotels]

        recommended_popular_hotels = Hotel.objects.filter(
            hotel_name__in=popular_hotels_ids
        )

        # This sorting is needed since .filter() does not preserve the order
        return sorted(
            recommended_popular_hotels,
            key=lambda x: popular_hotels_ids.index(x.hotel_name),
        )
