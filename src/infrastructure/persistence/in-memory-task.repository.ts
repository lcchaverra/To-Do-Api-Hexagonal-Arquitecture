import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskDTO } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/ports/task.repository';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map();

  async findAll(): Promise<TaskDTO[]> {
    return Array.from(this.tasks.values());
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) || null;
  }

  async create(taskData: CreateTaskDTO): Promise<Task> {
    const id = uuidv4();
    const now = new Date();
    const newTask = new Task({
      id,
      ...taskData,
      createdAt: now,
      updatedAt: now,
    });
    this.tasks.set(id, newTask);
    return newTask;
  }

  async update(id: string, updates: UpdateTaskDTO): Promise<Task | null> {
    const existingTask = await this.findById(id);
    if (!existingTask) return null;

    if (updates.title !== undefined) existingTask.title = updates.title;
    if (updates.description !== undefined) existingTask.description = updates.description;
    if (updates.completed !== undefined) existingTask.completed = updates.completed;
    
    existingTask.updatedAt = new Date();
    
    this.tasks.set(id, existingTask);
    
    return existingTask;
  }

  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }
}
