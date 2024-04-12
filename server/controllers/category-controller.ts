import { Request, Response, NextFunction } from "express";

import { categoryService } from "../services/category-service";

class CategoryController {
    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getCategories();
            return res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getUserCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;

            const userCategories = await categoryService.getUserCategories(
                userId
            );
            return res.json(userCategories);
        } catch (error) {
            next(error);
        }
    }

    async setUserCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, categories } = req.body;

            const userCategories = await categoryService.setUserCategories(
                userId,
                categories
            );

            return res.json({
                userCategories,
                message: "Список категорий изменен",
            });
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();
