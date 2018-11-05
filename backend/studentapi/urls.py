from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.studentapi import views

urlpatterns = [
    path('uploaddoc/', views.uploaddoc),
    path('getData/',views.getStudentData)
]

urlpatterns = format_suffix_patterns(urlpatterns)
