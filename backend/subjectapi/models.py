from django.db import models

# Create your models here.
class Subject(models.Model):
	department = models.CharField(max_length=30)
	semester = models.CharField(max_length=20)
	course = models.CharField(max_length=20)
	sub_code = models.CharField(max_length=10)
	sub_name = models.CharField(max_length=40)
	T_credits = models.CharField(max_length=5)
	L_credits = models.CharField(max_length=5)
	P_credits = models.CharField(max_length=5)
