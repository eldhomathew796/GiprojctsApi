from django.urls import path
from . import views


urlpatterns = [
	path('', views.list_note, name='list_note'),
	
] 