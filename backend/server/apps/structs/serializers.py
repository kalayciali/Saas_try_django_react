from rest_framework import serializers
from apps.structs.models import Profile, Company, Department, Researchgroup
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [ 'company_name', 'portal_name', 'address' ]

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = [ 'company', 'name', 'address' ]

class ResearchgroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Researchgroup
        fields = ('company', 'department', 'name', 'descript')

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ('name')

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer()

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'user_card_id', 'is_admin', 'groups')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company = CompanySerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    research_groups = ResearchgroupSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = [ 'company', 'department', 'research_groups', 'user', 'descript', 'user_card_id' ]


