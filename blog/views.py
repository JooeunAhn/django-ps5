from django.shortcuts import render
from blog.models import Audio
from blog.forms import AudioForm
import youtube_dl
def index(request):
    return render(request, 'blog/index.html', {})

def serve(request):
    if request.method == "POST":
        form = AudioForm(request.POST)
        print(form.is_valid())
        if form.is_valid():

            form = form.save(commit=False)
            with youtube_dl.YoutubeDL() as ydl:
                mp3 = ydl.download([form.url])
            Audio.objects.create(title="first", mp3=mp3, url = form.url)
            form = AudioForm()
    else:
       form = AudioForm()
    return render(request, 'blog/serve.html',{'form':form})   
# Create your views here.
