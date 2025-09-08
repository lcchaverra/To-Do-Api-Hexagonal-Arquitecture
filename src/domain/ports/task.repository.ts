import { Task, CreateTaskDTO, UpdateTaskDTO, TaskDTO } from '../entities/task.entity';

export interface TaskRepository {
  findAll(): Promise<TaskDTO[]>;
  findById(id: string): Promise<Task | null>;
  create(task: CreateTaskDTO): Promise<Task>;
  update(id: string, task: UpdateTaskDTO): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}
