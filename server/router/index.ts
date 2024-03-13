import { Router } from "express";
import { taskController } from "../controllers/task-controller";
import { taskCategoryController } from "../controllers/task-category-controller";

const router = Router();

router.get("/tasks", taskController.getAllTasks);

router.get("/tasks-category", taskCategoryController.getCategories);

export default router;
