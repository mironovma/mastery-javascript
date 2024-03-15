import { db } from "../helpers/db";

class TaskService {
    async getAllTasks(category: string, type: string, limit?: string) {
        const queryOptions: any = {
            where: {
                category: { category },
                type: { type },
            },
        };

        if (limit) {
            queryOptions.take = +limit;
        }

        const tasks = await db.task.findMany(queryOptions);
        return tasks;
    }

    // async createCard(title: string, description: string) {
    //     const card = await db.card.create({
    //         data: {
    //             title,
    //             description,
    //         },
    //     });

    //     return card;
    // }
}

export const taskService = new TaskService();
