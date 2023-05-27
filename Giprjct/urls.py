from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from Giapp.views import NoteViewset
from Giapp import views
from django.conf import settings

# router=routers.DefaultRouter()
router=routers.SimpleRouter()

router.register("note-delete/<int:pk>/",views.NoteViewDelete)
router.register('note-details',views.NoteViewset)#list view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path('',include('Giapp.urls')),
    path('note-details/<int:pk>', views.note_Details, name='note-details'),
    path('note-delete/<int:pk>', views.note_Delete, name='note-delete'),
    path('note-update/<int:pk>', views.note_Update, name='note-update'),
    
    
  
    
    
  
    
]
