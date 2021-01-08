from apps.structs.models import Department, Company, Profile, Researchgroup
from apps.structs.serializers import ProfileSerializer
from django.contrib.auth import get_user_model
import string
import random

User = get_user_model()
ALPHABET = string.ascii_lowercase

def gen_random_str(length):
    string =""
    for _ in range(length):
        i = random.randint(0, len(ALPHABET)- 1)
        string += ALPHABET[i]
    return string

def create_user_instance(username, email, card_id, first_name, last_name, password):
    user = User.objects.create(username=username, email=email, user_card_id=card_id, first_name=first_name, last_name=last_name, password=password)
    return user

def create_company(company_name, portal_name, address):
    company = Company.objects.create(company_name=company_name, portal_name=portal_name, address=address)
    return company

def create_department(name, address, company):
    department = Department.objects.create(name=name, address=address, company=company)
    return department

def create_lab(company, department, name, descript):
    lab = Researchgroup.objects.create(company=company, department=department, name=name, descript=descript)
    return lab

def create_profile(user, company, department, research_group, descript):
    prof = Profile.objects.create(user=user, company=company, department=department, research_group=research_group, descript=descript)
    return prof

def get_user():
    username=""
    for _ in range(8):
        i = random.randint(0, len(ALPHABET)- 1)
        username += ALPHABET[i]

    email = ""
    j = 0
    while True:
        i = random.randint(0, len(ALPHABET)- 1)
        if j <= 9:
            email += ALPHABET[i]
            continue
        email += "@"
        for _ in range(8):
            i = random.randint(0, len(ALPHABET)- 1)
            email += ALPHABET[i]
        email += ".com"
        break

    card_id = ""
    for _ in range(8):
        i = random.randint(1, 9)
        card_id += str(i)


    first_name =""
    for _ in range(8):
        i = random.randint(0, len(ALPHABET)- 1)
        first_name += ALPHABET[i]

    last_name =""
    for _ in range(8):
        i = random.randint(0, len(ALPHABET)- 1)
        last_name += ALPHABET[i]


    password =""
    for _ in range(8):
        i = random.randint(0, len(ALPHABET)- 1)
        password += ALPHABET[i]

    user = create_user_instance(username, email, card_id, first_name, last_name, password)
    return user

def get_company()
    company_name = gen_random_str(10)
    portal_name = gen_random_str(15)
    address = gen_random_str(30)

    company = create_company(company_name, portal_name, address)
    return company

def get_department(company):
    name = gen_random_str(10)
    address = gen_random_str(30)

    department = create_department(name, address, company)
    return department

def get_lab(company, department):
    name = gen_random_str(10)
    descript = gen_random_str(30)

    lab = create_lab(company, department, name, descript)
    return lab

def get_profile(user, company, department, lab)
    descript = gen_random_str(40)

    profile = create_profile(user, company, department, lab, descript)
    return profile

def populate_db():

    for i in range(2):
        company = get_company()
        for j in range(9):
            department = get_department(company)
            for k in range(8):
                lab = get_lab(company, department)
                user = get_user()
                profile = get_profile(user, company, department, lab)


