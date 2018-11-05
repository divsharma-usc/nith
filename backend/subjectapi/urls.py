from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.subjectapi import views

urlpatterns = [
    path('uploadsub/', views.uploadSub),
    path('getSubs/',views.getSubs)
]

urlpatterns = format_suffix_patterns(urlpatterns)