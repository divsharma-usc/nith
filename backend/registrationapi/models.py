from django.db import models
from datetime import datetime
# Create your models here.
class Reg(models.Model):
	status = models.BooleanField()
	year = models.CharField(max_length=20)
	semester = models.IntegerField()
	p1StartDate = models.DateTimeField()
	p1EndDate = models.DateTimeField(default=datetime.now(),blank=True)
	p2StartDate = models.DateTimeField()
	endDate = models.DateTimeField()


class StudentRegistered(models.Model):
	year = models.CharField(max_length=10)
	semester = models.IntegerField()
	email = models.CharField(max_length=20)