from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from apps.structs.models import Department, Company, Profile, Researchgroup
from apps.structs.serializers import ProfileSerializer
from apps.structs.permissions import CanViewAndEditLabProfile, IsHigherManager

def perform_create_for_profile(instance, serializer):
    company = self.request.user.profile.company
    department = self.request.user.profile.department
    research_group = self.request.user.profile.research_group
    user = self.request.user
    instance.save(user=user,
                  company=company,
                  department=department,
                  research_group=research_group)

class UserProfileViewSet(viewsets.ModelViewSet):
    # normal users can see their profile 

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, CanViewAndEditLabProfile, ]
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        perform_create_for_profile(self, serializer)


class LabProfileViewSet(viewsets.ModelViewSet):
    # lab managers can list the profiles within their research groups

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, CanViewAndEditLabProfile, ]

    def get_queryset(self):
        lab_id = self.request.user.profile.research_group.id
        return Profile.objects.filter(research_group_id=lab_id)

    def perform_create(self, serializer):
        perform_create_for_profile(self, serializer)


class DepartmentProfileViewSet(viewsets.ModelViewSet):
    # department managers can list the profiles within their department

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsHigherManager, ]

    def get_queryset(self):
        department_id = self.request.user.profile.department.id
        return Profile.objects.filter(department_id = department_id)
    
    def perform_create(self, serializer):
        perform_create_for_profile(self, serializer)


class CompanyProfileViewSet(viewsets.ModelViewSet):
    # company managers can list the profiles within their company

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsHigherManager, ]

    def get_queryset(self):
        company_id = self.request.user.profile.company.id
        return Profile.objects.filter(company_id=company_id)

    def perform_create(self, serializer):
        perform_create_for_profile(self, serializer)

class AdminProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser, ]
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        perform_create_for_profile(self, serializer)


