import { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Lista de Tareas',
    version: '1.0.0',
    description: 'Una API RESTful para gestionar tareas con Arquitectura Hexagonal',
    contact: {
      name: 'Soporte de API',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo',
    },
  ],
  components: {
    schemas: {
      Task: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'ID único generado automáticamente para la tarea',
          },
          title: {
            type: 'string',
            description: 'Título de la tarea',
          },
          description: {
            type: 'string',
            description: 'Descripción detallada de la tarea',
          },
          completed: {
            type: 'boolean',
            default: false,
            description: 'Estado de completitud de la tarea',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha y hora de creación de la tarea',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha y hora de la última actualización de la tarea',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensaje de error',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Tareas',
      description: 'Operaciones sobre tareas',
    },
  ],
  paths: {
    '/api/tasks': {
      get: {
        tags: ['Tareas'],
        summary: 'Obtener todas las tareas',
        responses: {
          '200': {
            description: 'Lista de tareas obtenida correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Task',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Tareas'],
        summary: 'Crear una nueva tarea',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
              example: {
                title: 'Mi nueva tarea',
                description: 'Esta es una nueva tarea',
                completed: false,
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Tarea creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          '400': {
            description: 'Datos de entrada inválidos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        tags: ['Tareas'],
        summary: 'Obtener una tarea por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la tarea',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Tarea encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Tareas'],
        summary: 'Actualizar una tarea',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la tarea',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          description: 'Objeto de tarea que necesita ser actualizado',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
              example: {
                title: 'Título de la tarea actualizada',
                description: 'Descripción de la tarea actualizada',
                completed: true,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Tarea actualizada correctamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          '400': {
            description: 'Datos de entrada inválidos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Tareas'],
        summary: 'Eliminar una tarea',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la tarea',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Tarea eliminada correctamente',
          },
          '404': {
            description: 'Tarea no encontrada',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
