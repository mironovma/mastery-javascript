import { Router } from "express";
import { taskController } from "../controllers/task-controller";
import { wordController } from "../controllers/word-controllet";

const router = Router();

router.get("/tasks", taskController.getAllTasks);

// reword
router.get("/words", wordController.getAllWords);

export default router;
