"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(props) {
        this.id = props.id || '';
        this.title = props.title;
        this.description = props.description;
        this.completed = props.completed || false;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    update(updates) {
        if (updates.title !== undefined)
            this.title = updates.title;
        if (updates.description !== undefined)
            this.description = updates.description;
        if (updates.completed !== undefined)
            this.completed = updates.completed;
        this.updatedAt = new Date();
    }
}
exports.Task = Task;
