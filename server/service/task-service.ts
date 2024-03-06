import { db } from "../helpers/db";

class TaskService {
    async getAllTasks() {
        const tasks = await db.task.findMany();
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
