from .models import Note
from rest_framework import serializers


class Noteserializers(serializers.ModelSerializer):
    note_title=serializers.CharField(max_length=150)
    note_desc=serializers.CharField(max_length=250)
    class Meta:
        model=Note
        fields=['id','note_title','note_desc']