## API de tareas con autentificacion JWT
API que fue desarrollada con Express, Prisma y seguridad implementada mediante JWT, passport, CORS y Rate-limiting.

## Descripcion del proyecto
Esta API permite que los usuarios se registren, autentifiquen y gestionen sus tareas de forma segura. Solo el usuario creador puede ver, eliminar, modificar y crear mas tareas.

## Tecnologias utilizadas
** Express **: Framework para node.js.

** Prisma **: Gestion de BD.

** PostgreSQL/SQLite **: BD (base de datos).

** JWT (jsonwebtoken) **: Token para autentificar.

** Passport **: Middleware para autentificacion con JWT.

** Bcrypt **: Hash de contraseñas.

** CORS **: Control de acceso entre origenes.

** Express-rate-limit **: Limitacion de peticiones.

## Instalacion

## Clonar repositorio
-git clone

-cd

## Instalar dependencias
npm i 

## Configurar variables de entorno
Crear archivo ".env" en raiz del proyecto con lo siguiente: 
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd"
# O para SQLite:
# DATABASE_URL="file:./dev.db"

JWT_SECRET="tu_clave_secreta_muy_segura"
PORT=3000

## Ejecutar migraciones Prisma
npx prisma migrate dev --name init

## Iniciar servidor
npm start
# O para desarrollo
npm run dev

El servidor correrá en 'http://localhost:3000'

## Seguridad implementada 

## Flujo de autentificacion

# 1. Registro ** POST /auth/register **
- El usuario envia su email y contraseña.
- La contraseña se encripta con bcrypt antes de guardar.
- Se crea el usuario en la BD.

# 2. Login ** POST /auth/login **
- El usuario envia email y contraseña.
- Se verifica contraseña con bcrypt.
- Si es correcta, genera un JWT con el id de usuario.
- El token se devuelve al cliente.

# 3. Acceso a tareas protegidas ** /tasks **
- El cliente envia token en el header: 'Authorization: Bearer <token>'.
- Passport verifica el token usando JWT.
- Si es valido, se adjunta usuario en 'req.user'.
- El usuario solo puede acceder y modificar a sus propias tareas.

## JWT (JSON Web Token)
** Ubicacion **: Se genera en 'src/controllers/authController.js'

- Contienen el ID del usuario ('sub').
- Tiempo de exp: 1 hora.
- Secret key almacenada en variables de entorno.

## Passport JWT strategy
** Ubicacion **: 'src/config/passport.js'
 
- Extrae el token del header 'Authorization'.
- Verifica el token con la secret key.
- Busca el usuario en la BD.
- Protege todas las rutas de '/tasks'.

** Uso de rutas **: 'src/routes/tasks.routes.js'
router.use(passport.authenticate('jwt', { session: false }));

## CORS (Cross-Origin Resource Sharing)

** Ubicacion **: 'src/index.js'
app.use(cors({
  origin: '*', // En producción: cambiar por el dominio específico
  credentials: true
}));

- Permite peticiones desde cualquier origen.
- En produccion, configurar origin con el dominio del frontend.

## Rate-limit
** Ubicacion **: 'src/config/rateLimiter.js'
** Rate limiter para autentificacion **: 

- Limite: 5 intentos por minuto.
- Aplicado a: '/auth/register' y '/auth/login'.
- Previene ataques de fuerza bruta.

** Rate limiter de tareas **: 

- Limite: 100 solicitudes por 15 minutos.
- Aplicado a: todas las rutas de '/tasks'.
- Previene abuso de la API.

## Endpoints

## Autentificacion

# Registro
POST  /auth/register
Content-Type: application/json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}

# Login
POST /auth/login
Content-Type: application/json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}

** Respuesta **:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Tareas (Requieren autentificacion)
Todas las peticiones deben incluir el header: 
Authorization --> Bearer <Token>

# Listar tareas
GET /tasks

# Crear tarea
POST /tasks
Content-Type: application/json
{
  "title": "Título de la tarea",
  "description": "Descripción opcional",
  "state": "pending"
}

# Actualizar tarea
PUT /tasks/:id
Content-Type: application/json
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "state": "completed"
}

# Eliminar tareas
DELETE /tasks/:id

# Estructura del proyecto
```
├── docs/
│   └── security-concepts.md   # Explicación de conceptos de seguridad
├── prisma/
│   ├── migrations/            # Historial de migraciones
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── config/
│   │   ├── passport.js        # Configuración de Passport JWT
│   │   └── rateLimiter.js     # Configuración de rate limiters
│   ├── controllers/
│   │   ├── authController.js  # Lógica de autenticación
│   │   ├── tasks.controller.js # Lógica de tareas
│   │   └── users.controller.js # Lógica de usuarios
│   ├── routes/
│   │   ├── auth.routes.js     # Rutas de autenticación
│   │   ├── tasks.routes.js    # Rutas de tareas
│   │   └── users.routes.js    # Rutas de usuarios
│   ├── index.js               # Punto de entrada de la aplicación
│   └── prismaClient.js        # Cliente de Prisma
├── .env                       # Variables de entorno (no subir a git)
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore                 # Archivos ignorados por git
├── package.json               # Dependencias del proyecto
├── package-lock.json          # Versiones exactas de dependencias
└── README.md                  # Este archivo
```

## Notas de seguridad

- NUNCA subir el archivo '.env' a github (mantenerlo en .gitignore).
- Usar 'env.example' para documentar las variables necesarias.
- En produccion cambiar el 'origin' de CORS al dominio especifico.
- Usar contraseñas seguras para 'JWT_SECRET'.
- Configurar HTTPS en produccion.

## Pruebas
Puedes probar la API usando estas herramientas:

- Postman
- Insomnia
- Thunder client (extension VS code)

## Autor
Integrante A y B (simulacion): Juan Sebastian Ramirez Velez.

## Licensia
Este proyecto fue desarrollado como parte de un taller academico.