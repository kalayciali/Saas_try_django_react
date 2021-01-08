from django.conf.urls import url, include 
from rest_framework.routers import DefaultRouter
from apps.structs.views import UserProfileViewSet, LabProfileViewSet, DepartmentProfileViewSet, CompanyProfileViewSet, AdminProfileViewSet

router = DefaultRouter()
router.register("userprofs", UserProfileViewSet, basename="userprof")
router.register("labprofs", LabProfileViewSet, basename="labprof")
router.register("departmentprofs", DepartmentProfileViewSet, basename="departmentprof")
router.register("companyprofs", CompanyProfileViewSet, basename="companyprof")
profiles_urlpatterns = [url(r"^api/v1/", include(router.urls))]

router = DefaultRouter()
router.register("profiles", AdminProfileViewSet, basename="profile")
admin_profile = [url(r"^api/v1/admin", include(router.urls))]
