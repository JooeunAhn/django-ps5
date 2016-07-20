from django.db import models

# Create your models here.


class Audio(models.Model):
    title = models.CharField(max_length=50)
    mp3 = models.FileField(upload_to="mp3/%Y/%D/") 
    url = models.URLField()
    
