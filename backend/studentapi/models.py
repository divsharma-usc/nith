from django.db import models

# Create your models here.
class Student(models.Model):
	enrollment_year = models.CharField(max_length=10)
	department = models.CharField(max_length=20)
	course = models.CharField(max_length=20)
	email = models.CharField(max_length=30)
	rollno = models.CharField(max_length=20)
