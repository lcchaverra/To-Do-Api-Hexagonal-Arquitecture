export interface TaskDTO {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTaskDTO extends Omit<TaskDTO, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateTaskDTO extends Partial<Omit<TaskDTO, 'id' | 'createdAt'>> {}

export class Task {
  public readonly id: string;
  public title: string;
  public description: string;
  public completed: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: TaskDTO) {
    this.id = props.id || '';
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed || false;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  toJSON(): TaskDTO {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(updates: UpdateTaskDTO): void {
    if (updates.title !== undefined) this.title = updates.title;
    if (updates.description !== undefined) this.description = updates.description;
    if (updates.completed !== undefined) this.completed = updates.completed;
    this.updatedAt = new Date();
  }
}
