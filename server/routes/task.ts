import { Router } from "express";
import { taskController } from "../controllers/task-controller";
import { taskCategoryController } from "../controllers/task-category-controller";

const taskRouter = Router();

taskRouter.get("/tasks", taskController.getAllTasks);

taskRouter.get("/tasks-category", taskCategoryController.getCategories);

export default taskRouter;
