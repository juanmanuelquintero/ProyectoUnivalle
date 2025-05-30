from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import USuariosViewSet
from .views import AsistenciaViewSet
from .views import crear_admins, login_admin

router = DefaultRouter()
router.register(r'usuarios', USuariosViewSet, basename='usuarios')
router.register(r'asistencia', AsistenciaViewSet, basename='asistencia')

urlpatterns = [
    path('', include(router.urls)),
    path('crear-admins/', crear_admins),
    path('login-admin/', login_admin),
]