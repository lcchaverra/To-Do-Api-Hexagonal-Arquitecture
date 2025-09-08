# API de Lista de Tareas con Arquitectura Hexagonal

Una API RESTful para gestionar tareas, construida con Node.js, Express y TypeScript siguiendo los principios de la Arquitectura Hexagonal.
 
## Características

- Operaciones CRUD para tareas
- Almacenamiento de datos en memoria (fácilmente reemplazable por una base de datos)
- TypeScript para seguridad de tipos
- Arquitectura limpia con separación de responsabilidades

## Comenzando

### Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd api-hexagonal
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecutando la Aplicación

#### Modo Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo con recarga automática en `http://localhost:3000`.

#### Modo Producción

1. Compila la aplicación:
   ```bash
   npm run build
   ```

2. Inicia el servidor en producción:
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000` por defecto.

## Endpoints de la API

### Tareas

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea específica
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea
- `DELETE /api/tasks/:id` - Eliminar una tarea

### Estado de Salud

- `GET /health` - Verificar si la API está funcionando

## Ejemplos de Solicitudes

### Crear una Nueva Tarea

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Completar proyecto",
  "description": "Terminar la implementación de la API",
  "completed": false
}' http://localhost:3000/api/tasks
```

### Obtener Todas las Tareas

```bash
curl http://localhost:3000/api/tasks
```

### Obtener una Tarea Específica

```bash
curl http://localhost:3000/api/tasks/1
```

### Actualizar una Tarea

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "title": "Título de tarea actualizado",
  "completed": true
}' http://localhost:3000/api/tasks/1
```

### Eliminar una Tarea

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Estructura del Proyecto

```
src/
├── application/     # Lógica de negocio de la aplicación
│   ├── use-cases/  # Casos de uso de la aplicación
│   └── dtos/       # Objetos de Transferencia de Datos (DTOs)
├── domain/         # Capa de dominio
│   ├── entities/   # Entidades de negocio
│   └── ports/      # Interfaces/puertos
├── infrastructure/ # Capa de infraestructura
│   ├── config/     # Configuración
│   └── persistence/ # Persistencia de datos
└── interfaces/     # Adaptadores de interfaz
    └── http/       # Interfaz HTTP
        ├── controllers/  # Manejadores de solicitudes
        └── routes/       # Definiciones de rutas
