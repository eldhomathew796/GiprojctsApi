from django.shortcuts import render
from .serializers import Noteserializers
from .models import Note
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view
# Create your views here.
def list_note(request):

	return render(request, 'base.html')





class NoteViewset(viewsets.ModelViewSet):
    # permission_classes =(IsAuthenticated,)
    queryset=Note.objects.all()
    serializer_class=Noteserializers
    




class NoteViewDelete(viewsets.ModelViewSet):
    queryset=Note.objects.all()
    serializer_class=Noteserializers
    
    
    @action(detail=True, methods=['DELETE'])
    def delete_object(self, request, pk=None):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)
    




@api_view(['GET'])
def note_Details(request, pk):
    qs = Note.objects.filter(id=pk)
    serializers = Noteserializers(qs, many=True)
    return Response(serializers.data)


@api_view(['DELETE'])
def note_Delete(request, pk):
    qs = Note.objects.filter(id=pk).first()
    qs.delete()
    return Response("Deleted successfully")


# Update eBook
@api_view(['PATCH',"PUT"])
def note_Update(request, pk):
    qs = Note.objects.filter(id=pk).first()
    
    serializer = Noteserializers(instance=qs, data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
    
  
       