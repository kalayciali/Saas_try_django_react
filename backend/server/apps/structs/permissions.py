from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        message = "You only have read permissions on this page"
        return request.method in SAFE_METHODS


class CanViewAndEditLabProfile(BasePermission):

    def has_permission(self, request, view):
        if (view.action == "list" and not request.user.is_in_this_group('lab_manager')):
            return False

        if (request.user.is_in_this_group('lab_manager') and not request.method in SAFE_METHODS):
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if (request.user.is_in_this_group('lab_manager') or obj == request.profile):
            return True

class IsHigherManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_in_one_of_groups(['department_manager', 'company_manager', 'cardtap_admin'])

