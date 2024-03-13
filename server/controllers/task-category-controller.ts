import { NextFunction, Request, Response } from "express";
import { taskCategoryService } from "../service/task-category-service";

class TaskCategoryController {
    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const taskCategories = await taskCategoryService.getCategories();

            return res.json(taskCategories);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

export const taskCategoryController = new TaskCategoryController();
