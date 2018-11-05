from django.db import models

# Create your models here.
class UserProfile(models.Model):
	username = models.CharField(max_length=20)
	password = models.CharField(max_length=20)
	role = models.IntegerField()
	useremail = models.CharField(max_length=30,default="no email")
	userdetail = models.CharField(max_length=20,default="admin")

