"""urls for the hotels app"""
from django.urls import path

from .views import (
    CityList,
    CollaborativeFilteringRecList,
    CreateReview,
    HotelDetail,
    HotelList,
    HotelReviewsList,
    PopularRecList,
    ReviewDetail,
    ReviewsList,
    UserReviewsList,
)

app_name = "hotels_api"

urlpatterns = [
    # Hotels
    path("hotels/", HotelList.as_view(), name="hotelList"),
    path("hotels/cities/", CityList.as_view(), name="cityList"),
    path("hotels/<str:pk>/", HotelDetail.as_view(), name="hotelDetail"), # str:pk is the hotel's primary key (hotel_name)
    # Reviews
    path(
        "hotels/<str:id>/reviews/", HotelReviewsList.as_view(), name="hotelReviewsList" # str:id is the hotel's primary key (hotel_name)
    ),
    path("users/<int:id>/reviews/", UserReviewsList.as_view(), name="userReviewsList"),
    path("reviews/<int:pk>/", ReviewDetail.as_view(), name="reviewDetail"),
    path("reviews/create/", CreateReview.as_view(), name="createReview"),
    path("reviews/", ReviewsList.as_view(), name="reviewsList"),
    # Recommendations
    path(
        "recommendations/<str:locality>/",
        PopularRecList.as_view(),
        name="popularRecList",
    ),
    path(
        "recommendations/<str:locality>/users/<str:user_account_id>/",
        CollaborativeFilteringRecList.as_view(),
        name="collaborativeFilteringRecList",
    ),
]
