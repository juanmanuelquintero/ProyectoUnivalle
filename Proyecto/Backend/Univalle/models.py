from django.db import models
from django.contrib.auth.hashers import make_password, check_password



class Usuarios(models.Model):
    codigo = models.CharField(db_column='Codigo',  max_length=50,primary_key=True)  # Field name made lowercase.
    nombre1 = models.CharField(db_column='Nombre1', max_length=50)  # Field name made lowercase.
    nombre2 = models.CharField(db_column='Nombre2', max_length=50, null=True, blank=True)  # Field name made lowercase.
    apellido1 = models.CharField(db_column='Apellido1', max_length=50)  # Field name made lowercase.
    apellido2 = models.CharField(db_column='Apellido2', max_length=50, null=True, blank=True)  # Field name made lowercase.
    identificacion = models.IntegerField(db_column='Identificacion')  # Field name made lowercase.
    programa = models.CharField(db_column='Programa', max_length=50, null=True, blank=True)  # Field name made lowercase.
    foto = models.CharField(db_column='Foto', max_length=50)  
    tipo_usuario = models.CharField(db_column='TipoUsuario', max_length=50)
    bandera = models.CharField(db_column='Bandera', max_length=10)

    class Meta:
        managed = False
        db_table = 'usuarios'
class Asistencia(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    codigo = models.CharField(db_column='Codigo',  max_length=50)  # Field name made lowercase.
    fecha = models.DateTimeField()  # Field name made lowercase.
    ES = models.CharField(db_column='E/S', max_length=50)
    IP = models.CharField(db_column='Ip_global', max_length=20) 


    class Meta:
        managed = False
        db_table = 'asistencia'

class Admin(models.Model):
    codigo = models.IntegerField(db_column='Codigo', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50)  # Field name made lowercase.
    apellido = models.CharField(db_column='Apellido', max_length=50)  # Field name made lowercase.
    contraseña = models.CharField(db_column='Contraseña', max_length=128)  # espacio suficiente para hash
    correo = models.CharField(db_column='Correo', max_length=50)  # Field name made lowercase.

    class Meta:
        db_table = 'admin'
