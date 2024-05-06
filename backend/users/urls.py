from django.urls import path  # , re_path

from .views import UserAccountDetail #, UserTwitterDetail  # , recs_cf

app_name = "users_api"

urlpatterns = [
    # path(
    #     "users/twitter/<str:pk>/", UserTwitterDetail.as_view(), name="usertwitterdetail"
    # ),
    path(
        "users/account/<int:pk>/", UserAccountDetail.as_view(), name="useraccountdetail"
    ),
    # re_path(r"^cf/users/user/(?P<user_id>\w+)/$", recs_cf, name="recs_cb"),
]
