from django.conf.urls import url, include 
from rest_framework.routers import DefaultRouter
from apps.structs.views import ProfileViewSet

router = DefaultRouter()
router.register("profiles", ProfileViewSet, basename="profiles")
profile_urlpatterns = [url(r"^api/v1/", include(router.urls))]
