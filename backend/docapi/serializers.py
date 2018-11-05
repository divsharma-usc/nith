from rest_framework import serializers
from .models import File, LibraryFine, HostelFine

class FileSerializer(serializers.ModelSerializer):
  class Meta():
    model = File
    fields = ('file', 'timestamp')

class LibraryFineSerializer(serializers.ModelSerializer):
	class Meta():
		model = LibraryFine
		fields = ('year','semester','rollno','fine')

class HostelFineSerializer(serializers.ModelSerializer):
	class Meta():
		model = HostelFine
		fields = ('year','semester','rollno','hostel','fine')