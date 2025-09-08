"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */
class TaskController {
    constructor(taskUseCases) {
        this.taskUseCases = taskUseCases;
    }
    /**
     * @swagger
     * /api/tasks:
     *   get:
     *     summary: Get all tasks
     *     tags: [Tasks]
     *     responses:
     *       200:
     *         description: A list of tasks
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Task'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async getAllTasks(req, res) {
        try {
            const tasks = await this.taskUseCases.getAllTasks();
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   get:
     *     summary: Get a task by ID
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The task ID
     *     responses:
     *       200:
     *         description: Task found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       404:
     *         description: Task not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async getTaskById(req, res) {
        try {
            const task = await this.taskUseCases.getTaskById(req.params.id);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching task' });
        }
    }
    /**
     * @swagger
     * /api/tasks:
     *   post:
     *     summary: Create a new task
     *     tags: [Tasks]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Task'
     *     responses:
     *       201:
     *         description: Task created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       400:
     *         description: Invalid input
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async createTask(req, res) {
        try {
            const { title, description, completed } = req.body;
            if (!title || !description) {
                res.status(400).json({ error: 'Title and description are required' });
                return;
            }
            const taskData = {
                title,
                description,
                completed: completed || false,
            };
            const newTask = await this.taskUseCases.createTask(taskData);
            res.status(201).json(newTask);
        }
        catch (error) {
            res.status(500).json({ error: 'Error creating task' });
        }
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   put:
     *     summary: Update a task
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The task ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Task'
     *     responses:
     *       200:
     *         description: Task updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Task'
     *       400:
     *         description: Invalid input
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: Task not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async updateTask(req, res) {
        try {
            const { title, description, completed } = req.body;
            const updateData = {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(completed !== undefined && { completed }),
            };
            const updatedTask = await this.taskUseCases.updateTask(req.params.id, updateData);
            if (!updatedTask) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json(updatedTask);
        }
        catch (error) {
            res.status(500).json({ error: 'Error updating task' });
        }
    }
    /**
     * @swagger
     * /api/tasks/{id}:
     *   delete:
     *     summary: Delete a task
     *     tags: [Tasks]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The task ID to delete
     *     responses:
     *       204:
     *         description: Task deleted successfully
     *       404:
     *         description: Task not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async deleteTask(req, res) {
        try {
            const success = await this.taskUseCases.deleteTask(req.params.id);
            if (!success) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Error deleting task' });
        }
    }
}
exports.TaskController = TaskController;
