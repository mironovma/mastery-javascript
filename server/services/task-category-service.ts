import { db } from "../helpers/db";

class TaskCategoryService {
    async getCategories() {
        // const taskCategories = await db.taskCategory.findMany();
        // return taskCategories;
    }
}

export const taskCategoryService = new TaskCategoryService();
