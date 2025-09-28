import express, { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { TaskUseCases } from './application/use-cases/task.use-cases';
import { InMemoryTaskRepository } from './infrastructure/persistence/in-memory-task.repository';
import { TaskController } from './interfaces/http/controllers/task.controller';
import { taskRouter } from './interfaces/http/routes/task.routes';
import getSwaggerDefinition from './infrastructure/config/swagger.config';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export function createApp(): Application {
  const app = express();
  
  // Configuración de CORS
  const corsOptions = {
    origin: ["*", 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:7100'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  
  const taskRepository = new InMemoryTaskRepository();
  const taskUseCases = new TaskUseCases(taskRepository);
  const taskController = new TaskController(taskUseCases);
  
  const portFromEnv = process.env.PORT || '7100';
  const baseUrl = process.env.BASE_URL || `http://localhost:${portFromEnv}`;

  const specs = swaggerJsdoc({
    definition: getSwaggerDefinition(baseUrl),
    apis: ['src/interfaces/http/controllers/*.ts'],
  });

  app.use('/api/tasks', taskRouter(taskController));
  
  app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(specs, { explorer: true })
  );
  
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
  });
  
  return app;
}

if (require.main === module) {
  const PORT = Number(process.env.PORT || 7100);
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
  });
}

export default createApp();

