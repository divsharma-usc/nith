from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.userapi import views

urlpatterns = [
    path('userlogin/', views.login),
    path('adduser/',views.addUser)
]

urlpatterns = format_suffix_patterns(urlpatterns)
