"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const task_use_cases_1 = require("./application/use-cases/task.use-cases");
const in_memory_task_repository_1 = require("./infrastructure/persistence/in-memory-task.repository");
const task_controller_1 = require("./interfaces/http/controllers/task.controller");
const task_routes_1 = require("./interfaces/http/routes/task.routes");
const swagger_config_1 = __importDefault(require("./infrastructure/config/swagger.config"));
const cors_1 = __importDefault(require("cors"));
function createApp() {
    const app = (0, express_1.default)();
    // Configuración de CORS
    const corsOptions = {
        origin: ['*'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json());
    const taskRepository = new in_memory_task_repository_1.InMemoryTaskRepository();
    const taskUseCases = new task_use_cases_1.TaskUseCases(taskRepository);
    const taskController = new task_controller_1.TaskController(taskUseCases);
    const specs = (0, swagger_jsdoc_1.default)({
        definition: swagger_config_1.default,
        apis: ['src/interfaces/http/controllers/*.ts'],
    });
    app.use('/api/tasks', (0, task_routes_1.taskRouter)(taskController));
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });
    return app;
}
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
    });
}
exports.default = createApp();
function enableCors() {
    throw new Error('Function not implemented.');
}
