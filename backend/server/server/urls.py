from django.contrib import admin
from django.urls import path

from apps.accounts.urls import accounts_urlpatterns
from apps.structs.urls import profiles_urlpatterns, admin_profile

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_urlpatterns
urlpatterns += profiles_urlpatterns
urlpatterns += admin_profile
