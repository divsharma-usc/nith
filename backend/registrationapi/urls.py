from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.registrationapi import views

urlpatterns = [
    path('checkstatus/', views.checkstatus),
    path('newReg/',views.newReg),
    path('stopReg/',views.stopReg),
    path('getReg/',views.getReg),
    path('getRegInfo/',views.getRegInfo)
]

urlpatterns = format_suffix_patterns(urlpatterns)
