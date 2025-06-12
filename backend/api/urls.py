from django.urls import path
from . import views

urlpatterns = [
    path("commissions/", views.CommissionCreate.as_view(), name="commission_list"),
    path("commission/reference-images/<int:pk>", views.ReferenceImageViewSet.as_view(), name="reference-image-lists"),
    path("commissions/<int:pk>", views.CommissionDetail.as_view(), name="commission-detail"),
    path("logs/", views.LogCreate.as_view(), name="log-list"),
    path("admin-dashboard/", views.admin_dashboard, name="admin_dashboard"),
    path("token_admin/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair")
]