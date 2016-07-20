from django.shortcuts import render
from blog.models import Audio
from blog.forms import AudioForm
import youtube_dl
def index(request):
    return render(request, 'blog/index.html', {})

def my_hook(d):
    if d['status'] == "finished":
        print("Done downloading, now convertiong ...")

def serve(request):
    if request.method == "POST":
        form = AudioForm(request.POST)
        print(form.is_valid())
        if form.is_valid():
            form = form.save(commit=False)
            ydl_opt = {
                    'format':'bestaudio/best',
                    'postprocessors':[{
                        'key':'FFmpegExtractAudio',
                        'preferredcodec':'mp3',
                        'preferredquality':'192',
                        }],
                    'progress_hooks': [my_hook],
                    }
            with youtube_dl.YoutubeDL(ydl_opt) as ydl:
                mp3 = ydl.download([form.url])
            Audio.objects.create(title="first", mp3=mp3, url = form.url)
            form = AudioForm()
    else:
       form = AudioForm()
    return render(request, 'blog/serve.html',{'form':form})   
# Create your views here.
