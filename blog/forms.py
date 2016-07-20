from django import forms
from blog.models import Audio
class AudioForm(forms.ModelForm):
    class Meta:
        model = Audio
        fields = ("url",)

