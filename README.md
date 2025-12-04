# Taller Parejas Node - Sistema Completo

Proyecto full-stack que integra backend y frontend para la gestión de usuarios y tareas mediante una API REST.

## Descripción del Proyecto

Sistema completo de gestión desarrollado como parte del taller académico del SENA. Implementa una arquitectura cliente-servidor con:

- **Backend**: API REST con Express, Prisma y autenticación JWT
- **Frontend**: Interfaz web con HTML, CSS y JavaScript vanilla

## Estructura del Proyecto

Este proyecto utiliza **submódulos de Git** para mantener backend y frontend en repositorios independientes:
```
taller-parejas-node/
├── backend/          # Submódulo: API REST
├── frontend/         # Submódulo: Interfaz web
└── README.md         # Este archivo
```

## Repositorios

- **Backend**: [taller-parejas-node-backend](https://github.com/JuansseVelez/taller-parejas-node-backend)
- **Frontend**: [taller-parejas-node-frontend](https://github.com/JuansseVelez/taller-parejas-node-frontend)
- **Principal**: [taller-parejas-node](https://github.com/JuansseVelez/taller-parejas-node)

## Clonar el Proyecto Completo

Para clonar el proyecto con todos los submódulos:
```bash
git clone --recursive https://github.com/JuansseVelez/taller-parejas-node.git
```

Si ya clonaste el proyecto sin submódulos:
```bash
git submodule update --init --recursive
```

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL / SQLite
- JWT (JSON Web Tokens)
- Passport.js
- Bcrypt
- CORS
- Express Rate Limit

### Frontend
- HTML5
- CSS3
- JavaScript Vanilla

## Instalación y Configuración

### 1. Clonar el Proyecto
```bash
git clone --recursive https://github.com/JuansseVelez/taller-parejas-node.git
cd taller-parejas-node
```

### 2. Configurar Backend
```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con:
# DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd"
# JWT_SECRET="tu_clave_secreta"
# PORT=3000

# Ejecutar migraciones
npx prisma migrate dev --name init

# Iniciar servidor
npm start
```

El backend estará disponible en: `http://localhost:3000`

### 3. Configurar Frontend
```bash
cd ../frontend

# Opción A: Abrir directamente
# Doble clic en index.html

# Opción B: Usar Live Server (VS Code)
# Clic derecho en index.html -> Open with Live Server

# Opción C: Servidor HTTP
python -m http.server 8080
# o
npx http-server
```

## Funcionalidades

### Gestión de Usuarios
- Crear usuarios con nombre y email
- Listar todos los usuarios
- Actualizar información de usuarios
- Eliminar usuarios

### Gestión de Tareas
- Crear tareas asignadas a usuarios
- Listar todas las tareas
- Actualizar tareas existentes
- Eliminar tareas
- Visualizar usuario asignado a cada tarea

## API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Usuarios
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Tareas (Requieren autenticación)
- `GET /tasks` - Listar tareas
- `POST /tasks` - Crear tarea
- `PUT /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

## Seguridad Implementada

- **JWT**: Autenticación mediante tokens
- **Bcrypt**: Hash de contraseñas
- **Passport**: Middleware de autenticación
- **CORS**: Control de acceso entre orígenes
- **Rate Limiting**: Protección contra abuso de la API

## Notas de Desarrollo

- El backend debe estar corriendo antes de usar el frontend
- En producción, configurar CORS con dominios específicos
- Mantener el archivo `.env` fuera del control de versiones
- Usar HTTPS en entornos de producción

## Autor

**Juan Sebastian Ramirez Velez**

Taller Académico - SENA

## Licencia

Este proyecto fue desarrollado como parte de un taller académico.

## Fecha

Diciembre 2024