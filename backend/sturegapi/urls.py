from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.sturegapi import views

urlpatterns = [
    path('upload/', views.upload),
    path('getData/',views.getData),
    path('isStudentRegisterd/',views.isStudentRegisterd)
]

urlpatterns = format_suffix_patterns(urlpatterns)