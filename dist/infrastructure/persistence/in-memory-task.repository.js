"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTaskRepository = void 0;
const uuid_1 = require("uuid");
const task_entity_1 = require("../../domain/entities/task.entity");
class InMemoryTaskRepository {
    constructor() {
        this.tasks = new Map();
    }
    async findAll() {
        return Array.from(this.tasks.values());
    }
    async findById(id) {
        return this.tasks.get(id) || null;
    }
    async create(taskData) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const newTask = new task_entity_1.Task({
            id,
            ...taskData,
            createdAt: now,
            updatedAt: now,
        });
        this.tasks.set(id, newTask);
        return newTask;
    }
    async update(id, updates) {
        const existingTask = await this.findById(id);
        if (!existingTask)
            return null;
        if (updates.title !== undefined)
            existingTask.title = updates.title;
        if (updates.description !== undefined)
            existingTask.description = updates.description;
        if (updates.completed !== undefined)
            existingTask.completed = updates.completed;
        existingTask.updatedAt = new Date();
        this.tasks.set(id, existingTask);
        return existingTask;
    }
    async delete(id) {
        return this.tasks.delete(id);
    }
}
exports.InMemoryTaskRepository = InMemoryTaskRepository;
