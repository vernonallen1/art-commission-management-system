from django.db import models
from .Commission import Commission
from django.contrib.auth.models import User

class ReferenceImage(models.Model):
    commission = models.ForeignKey(Commission, on_delete=models.CASCADE, related_name="reference_images")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reference_images')
    image = models.ImageField(upload_to='reference_images/')

    def __str__(self):
        return f"Image for {self.commission.id}"