import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/ports/task.repository';

export class TaskUseCases {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    const taskDTOs = await this.taskRepository.findAll();
    return taskDTOs.map(dto => new Task(dto));
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async createTask(taskData: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.create({
      ...taskData,
      completed: taskData.completed || false,
    });
  }

  async updateTask(
    id: string,
    updateData: UpdateTaskDTO
  ): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }
    return this.taskRepository.update(id, {
      ...updateData,
      updatedAt: new Date(),
    });
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}
