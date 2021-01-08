from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, Group
)

class MyUserManager(BaseUserManager):

    def create_user(self, username, email, user_card_id, first_name, last_name, password):
        user = self.model(
            email=email,
            username=username,
            first_name = first_name,
            last_name = last_name,
            user_card_id = user_card_id
        )


        user.set_password(password)
        user.save(using=self._db)
        user.set_group(['normal_user',])
        return user

    def create_superuser(self, username, email, user_card_id, first_name, last_name, password):
        user = self.model(
            username = username,
            email=email,
            first_name = first_name,
            last_name = last_name,
            user_card_id = user_card_id,
            is_staff=True,
            is_active=True,
        )

        user.set_password(password)
        user.save(using=self._db)
        user.set_group(['normal_user'])
        return user

class MyUser(AbstractBaseUser):
    email = models.CharField(unique=True, max_length=255, blank=False,  null=False)
    username = models.CharField(unique=True, max_length=200, blank=False, null=False)
    user_card_id = models.IntegerField()
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, related_name="user_set")

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_card_id', 'first_name', 'last_name']

    def set_group(self, group_keys):
        for group_name in group_keys:
            group, created = Group.objects.get_or_create(name=group_name)
            self.groups.add(group)

    def is_in_this_group(self, group_key):
        return self.groups.filter(name=group_key).exists()

    def is_in_one_of_groups(self, group_keys):
        for key in group_keys:
            if self.groups.filter(name=key).exists():
                return True

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
    def get_short_name(self):
        return self.first_name
    def __str__(self):
        return self.get_full_name() + ' ' + self.email
