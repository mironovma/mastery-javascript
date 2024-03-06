import { Router } from "express";
import { taskController } from "../controllers/task-controller";

const router = Router();

router.get("/tasks", taskController.getAllTasks);

export default router;
