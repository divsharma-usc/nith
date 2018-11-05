from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.docapi import views

urlpatterns = [
    path('uploaddoc/', views.upload),
    path('hosteluploaddoc/',views.hostelupload)
]

urlpatterns = format_suffix_patterns(urlpatterns)
