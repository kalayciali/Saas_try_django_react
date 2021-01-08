from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Company(models.Model):
    company_name = models.CharField(max_length=100)
    portal_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

class Department(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

class Researchgroup(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    descript = models.CharField(max_length=500)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    research_group = models.ForeignKey(Researchgroup, on_delete=models.CASCADE)
    descript = models.CharField(max_length=500, blank=True)

class Hardware(models.Model):
    mac_address = models.CharField(max_length=17)
    class AllocatedChoices(models.TextChoices):
        YES = 'Yes'
        NO = 'No'
    allocated = models.CharField(choices=AllocatedChoices.choices, max_length=5)
    creat_date = models.DateTimeField()
    aws_thingname = models.CharField(max_length=50)


