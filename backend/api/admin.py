from django.contrib import admin
from .models.Commission import Commission
from .models.ReferenceImage import ReferenceImage
from .models.Log import Log

# Register your models here.
admin.site.register(Commission)
admin.site.register(ReferenceImage)
admin.site.register(Log)