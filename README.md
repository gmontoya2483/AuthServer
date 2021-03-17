# AuthServer

## Description

Proyecto AuthServer del curso "Angular: Decero a experto (Edición 2021)".  
Backend server para manejar la autenticacion de usuarios

## Temas Cubiertos en esta aplicación:

* Fundamentos de Node
* REST Services
* JWT
* MongoDB - Mongo Atlas
* Express framework
* Express validator
* CRUD
* Validaciones
* Modelos de base de datos
* Encriptar contraseñas

## Variables de entorno
Se debe crear en la raiz del proyecto un archivo con el nombre ``.env``,  cuyo contenido debe tener las siguientes claves con sus correspondientes valores:

```editorconfig
PORT=NNNN // Puerto donde se ejecuta el servidor
BD_CNN=XXXXXXXXXXXXXXXXXX //MongoDB connection string
SECRET_JWT_SEED=XXXXXXXXXXXXXXXXXXXX  // Seed para la generacion de JWTs
```

## Dependecias
Para instalar las dependencias ejecutar ``npm install``

## Development server
Ejecutar`npm run dev` para el servidor de desarrollo.

## Endpoints

### POST: /api/auth/new
Body:  
```json5
{
  "name": "xxxxxxxx",
  "email": "xxxx@xxxx.xxx",
  "password": "xxxxxxxxx"
}
```

### POST: /api/auth/
Body:
```json5
{
  "email": "xxxx@xxxx.xxx",
  "password": "xxxxxxxxx"
}
```

### GET: /api/auth/renew
Headers:  
 ```text
x-token = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```




