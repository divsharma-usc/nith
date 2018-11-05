from rest_framework import serializers
from .models import Reg

class RegSerializer(serializers.ModelSerializer):
  class Meta():
    model = Reg
    fields = ('status', 'year','semester','p1StartDate','p1endDate','p2StartDate','endDate')
