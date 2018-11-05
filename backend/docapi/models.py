from django.db import models

class File(models.Model):
	file = models.FileField(blank=False, null=False)
	timestamp = models.DateTimeField(auto_now_add=True)

class LibraryFine(models.Model):
	year = models.CharField(max_length=10)
	semester = models.CharField(max_length=10)
	rollno = models.CharField(max_length=15)
	fine = models.IntegerField()

class HostelFine(models.Model):
	year = models.CharField(max_length=10)
	semester = models.CharField(max_length=10)
	rollno = models.CharField(max_length=15)
	hostel = models.CharField(max_length=20)
	fine = models.IntegerField()




