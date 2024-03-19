from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("hotels.urls", namespace="hotels")),
    path("", include("users.urls", namespace="users")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    # OpenAPI3
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    # Swagger UI:
    path(
        "doc/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    # Redoc UI:
    path(
        "redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
