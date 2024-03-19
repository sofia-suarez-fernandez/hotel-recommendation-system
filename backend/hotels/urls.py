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
    path("hotels/<int:pk>/", HotelDetail.as_view(), name="hotelDetail"),
    path("hotels/cities/", CityList.as_view(), name="cityList"),
    # Reviews
    path(
        "hotels/<int:id>/reviews/", HotelReviewsList.as_view(), name="hotelReviewsList"
    ),
    path("users/<int:id>/reviews/", UserReviewsList.as_view(), name="userReviewsList"),
    path("reviews/<int:pk>/", ReviewDetail.as_view(), name="reviewDetail"),
    path("reviews/create/", CreateReview.as_view(), name="createReview"),
    path("reviews/", ReviewsList.as_view(), name="reviewsList"),
    # Recommendations
    path(
        "recommendations/<str:id>/",
        PopularRecList.as_view(),
        name="popularRecList",
    ),
    path(
        "recommendations/<str:city>/users/<str:user_id>/",
        CollaborativeFilteringRecList.as_view(),
        name="collaborativeFilteringRecList",
    ),
]
