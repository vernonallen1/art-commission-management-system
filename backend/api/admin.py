from django.contrib import admin
from .models.Commission import Commission
from .models.ReferenceImage import ReferenceImage
from .models.Log import Log
from .models.Progress import Progress

# Register your models here.
admin.site.register(Commission)
admin.site.register(ReferenceImage)
admin.site.register(Log)
admin.site.register(Progress)