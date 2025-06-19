from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import generics 
from .serializers import UserSerializer, CommissionSerializer, ReferenceImageSerializer, LogSerializer, ProgressSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models.Commission import Commission
from .models.ReferenceImage import ReferenceImage
from .models.Log import Log
from .models.Progress import Progress
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

class CommissionCreate(generics.ListCreateAPIView):
    serializer_class = CommissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Commission.objects.all() if user.is_superuser else Commission.objects.filter(author=user) 

        status = self.request.query_params.get('status')

        if status:
            qs = qs.filter(status=status)
        
        return qs
    
    def perform_create(self, serializer):
        if serializer.is_valid():
                serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class LogCreate(generics.ListCreateAPIView):
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user 
        return Log.objects.all() if user.is_superuser else Commission.objects.filter(user=user)
    
    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class CommissionDetail(generics.RetrieveUpdateAPIView):
    serializer_class = CommissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Commission.objects.all() if user.is_superuser else Commission.objects.filter(author=user)

class ReferenceImageViewSet(generics.ListCreateAPIView):
    serializer_class = ReferenceImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # <-- Necessary for handling image uploads

    def get_queryset(self):
        user = self.request.user
        commission_id = self.kwargs.get('pk')

        queryset = ReferenceImage.objects.all() if user.is_superuser else ReferenceImage.objects.filter(author=user)

        if commission_id:
            queryset = queryset.filter(commission=commission_id)

        return queryset

    def create(self, request, *args, **kwargs):
        commission_id = self.kwargs.get('pk')
        images = request.FILES.getlist('image')
        author = request.user

        if not images:
            return Response({'error': 'No images provided.'}, status=400)

        for img in images:
            ReferenceImage.objects.create(
                commission_id=commission_id,
                author=author,
                image=img
            )

        return Response({'message': 'Images uploaded.'}, status=201)
    
class ProgressViewSet(generics.ListCreateAPIView):
    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # <-- Necessary for handling image uploads

    def get_queryset(self):
        user = self.request.user
        commission_id = self.kwargs.get('pk')

        queryset = Progress.objects.all() if user.is_superuser else ReferenceImage.objects.filter(author=user)

        if commission_id:
            queryset = queryset.filter(commission=commission_id)

        print("here")
        print(queryset)
        return queryset

    def create(self, request, *args, **kwargs):
        commission_id = self.kwargs.get('pk')
        images = request.FILES.getlist('image')
        status_progress = request.data.get('status_progress')
        description = request.data.get('description') 

        if not images:
            return Response({'error': 'No images provided.'}, status=400)

        for img in images:
            Progress.objects.create(
                commission_id=commission_id,
                description=description,
                status_progress=status_progress,
                image=img
            )

        return Response({'message': 'Images uploaded.'}, status=201)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

def admin_dashboard(request):
    if request.user.is_superuser:
        return JsonResponse({"message": "Welcome, superuser!"})
    return JsonResponse({"message": "You are not authorized to view this page."}, status=403)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['is_superuser'] = self.user.is_superuser 
        print("Custom serializer hit:", data)  
        return data 
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

