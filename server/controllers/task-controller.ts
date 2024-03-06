import { NextFunction, Request, Response } from "express";
import { taskService } from "../service/task-service";

class TaskController {
    // async createCard(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { title, description } = req.body;

    //         const cardData = await cardService.createCard(title, description);

    //         return res.json(cardData);
    //     } catch (error) {
    //         console.log(error);
    //         // next(error);
    //     }
    // }

    async getAllTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await taskService.getAllTasks();
            return res.json(tasks);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

export const taskController = new TaskController();
