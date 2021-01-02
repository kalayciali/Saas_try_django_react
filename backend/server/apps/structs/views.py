from rest_framework import viewsets
from apps.structs.models import Department, Company, Profile, Researchgroup
from apps.structs.serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer

    queryset = Profile.objects.all()

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user = user)

#
#class DepartmentViewSet(viewsets.ModelViewSet):
#    serializer_class = DepartmentSerializer
#    queryset = Department.objects.all()
#
#    def perform_create(self, serializer):
#        serializer.save(company = self.request.user.profile.company)
#
#    def get_queryset(self):
#        return self.queryset.filter(company = self.request.user.profile.company)
#
#class ResearchgroupViewSet(viewsets.ModelViewSet):
#    serializer_class = ResearchgroupSerializer
#    queryset = Researchgroup.objects.all()
#
#    def perform_create(self, serializer):
#        serializer.save(company = self.request.user.profile.company)
#
#    def get_queryset(self):
#        return self.queryset.filter(company = self.request.user.profile.company, department=self.request.user.profile.department)
#
#
#
#
#class CompanyViewSet(viewsets.ModelViewSet):
#    serializer_class = CompanySerializer
#    queryset = Company.objects.all()
