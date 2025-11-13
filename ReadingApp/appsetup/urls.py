from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/log-trial/', views.log_trial, name='log_trial'),
]