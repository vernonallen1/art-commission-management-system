from django.db import models
from django.contrib.auth.models import User

class Commission(models.Model):
    commission_size = models.CharField(max_length=100)
    commission_style = models.CharField(max_length=100)
    notes = models.TextField(default="")
    tip = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    status = models.CharField(max_length=100, default="Pending")
    completion_date = models.CharField(max_length=100, default="TBA")
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commissions')

    def __str__(self):
        return  f"Commission by {self.author.username} - Commission ID {self.id}"