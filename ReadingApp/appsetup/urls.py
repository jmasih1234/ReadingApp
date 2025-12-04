from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('instructions/', views.instructions, name='instructions'),
    path('api/log-trial/', views.log_trial, name='log_trial'),
    path('api/save-survey/', views.save_survey, name='save_survey'),
]