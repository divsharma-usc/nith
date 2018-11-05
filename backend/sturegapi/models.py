from django.db import models

# Create your models here.
class StuReg(models.Model):
	rollno = models.CharField(max_length=10)
	semester = models.CharField(max_length=20)
	name = models.CharField(max_length=30)
	fathername = models.CharField(max_length=30)
	gender = models.CharField(max_length=20)
	phone = models.CharField(max_length=15)
	hosteler = models.CharField(max_length=5)
	parentPhone = models.CharField(max_length=15)
	parentEmail = models.CharField(max_length=30)
	permaAddress = models.CharField(max_length=200)
	corresAddress = models.CharField(max_length=200)
	dob =models.DateTimeField()