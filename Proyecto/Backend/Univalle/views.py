from rest_framework import viewsets
from .models import Usuarios
from .serializers import USuariosSerializer
from .models import Asistencia
from .serializers import AsistenciaSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .models import Admin
import json




class USuariosViewSet(viewsets.ModelViewSet):
    serializer_class = USuariosSerializer

    def get_queryset(self):
        codigo = self.request.query_params.get('codigo')

        if codigo:
            return Usuarios.objects.filter(codigo=codigo)
        else:
            return Usuarios.objects.all()
        
class AsistenciaViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenciaSerializer

    def get_queryset(self):
        id = self.request.query_params.get('id')

        if id:
            return Asistencia.objects.filter(id=id)
        else:
            return Asistencia.objects.all()

@csrf_exempt
def crear_admins(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)

            # Si llega un solo diccionario, lo convertimos a lista
            if isinstance(datos, dict):
                datos = [datos]

            for admin_data in datos:
                Admin.objects.create(
                    codigo=admin_data['codigo'],
                    nombre=admin_data['nombre'],
                    apellido=admin_data['apellido'],
                    contraseña=make_password(admin_data['contraseña']),
                    correo=admin_data['correo']
                )
            return JsonResponse({'mensaje': 'Admins registrados correctamente'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def login_admin(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)
            codigo = datos.get('codigo')
            contraseña = datos.get('contraseña')

            admin = Admin.objects.get(codigo=codigo)

            if check_password(contraseña, admin.contraseña):
                return JsonResponse({
                    'mensaje': 'Login exitoso',
                    'codigo': admin.codigo,
                    'nombre': admin.nombre,
                    'apellido': admin.apellido,
                    'correo': admin.correo
                })
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except Admin.DoesNotExist:
            return JsonResponse({'error': 'Administrador no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


