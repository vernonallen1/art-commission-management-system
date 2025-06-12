from django.db import models
from django.contrib.auth.models import User 

class Log(models.Model):
    kind = models.CharField(max_length=100, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    message = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.kind}"
