"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUseCases = void 0;
const task_entity_1 = require("../../domain/entities/task.entity");
class TaskUseCases {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks() {
        const taskDTOs = await this.taskRepository.findAll();
        return taskDTOs.map(dto => new task_entity_1.Task(dto));
    }
    async getTaskById(id) {
        return this.taskRepository.findById(id);
    }
    async createTask(taskData) {
        return this.taskRepository.create({
            ...taskData,
            completed: taskData.completed || false,
        });
    }
    async updateTask(id, updateData) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            return null;
        }
        return this.taskRepository.update(id, {
            ...updateData,
            updatedAt: new Date(),
        });
    }
    async deleteTask(id) {
        return this.taskRepository.delete(id);
    }
}
exports.TaskUseCases = TaskUseCases;
