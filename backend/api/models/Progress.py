from django.db import models
from .Commission import Commission


class Progress(models.Model):
    image = models.ImageField(upload_to='progress/')
    commission = models.ForeignKey(Commission, on_delete=models.CASCADE, related_name='progress')
    status_progress = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=100, default="")