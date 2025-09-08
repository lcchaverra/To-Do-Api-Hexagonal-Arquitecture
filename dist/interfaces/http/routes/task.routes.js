"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = taskRouter;
const express_1 = require("express");
function taskRouter(controller) {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => controller.getAllTasks(req, res));
    router.get('/:id', (req, res) => controller.getTaskById(req, res));
    router.post('/', (req, res) => controller.createTask(req, res));
    router.put('/:id', (req, res) => controller.updateTask(req, res));
    router.delete('/:id', (req, res) => controller.deleteTask(req, res));
    return router;
}
