import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

export function taskRouter(controller: TaskController): Router {
  const router = Router();

  router.get('/', (req, res) => controller.getAllTasks(req, res));
  router.get('/:id', (req, res) => controller.getTaskById(req, res));
  router.post('/', (req, res) => controller.createTask(req, res));
  router.put('/:id', (req, res) => controller.updateTask(req, res));
  router.delete('/:id', (req, res) => controller.deleteTask(req, res));

  return router;
}
