from django.contrib.auth.models import User
from rest_framework import serializers
from .models.Commission import Commission
from .models.ReferenceImage import ReferenceImage
from .models.Log import Log
from .models.Progress import Progress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "is_superuser"]
        extra_kwargs = {"password": {"write_only": True}, "is_superuser": {"read_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print(user)
        return user 
    
class LogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Log 
        fields = "__all__"
        extra_kwargs = {"user" : {"read_only": True}}

class CommissionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Commission
        fields = '__all__'
        extra_kwargs = {"author" : {"read_only": True}}

class ReferenceImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url = True)

    class Meta:
        model = ReferenceImage
        fields = '__all__'

class ProgressSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url = True)
    
    class Meta:
        model = Progress 
        fields = '__all__'