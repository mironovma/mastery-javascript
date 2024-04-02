import { db } from "../helpers/db";

class CategoryService {
    async getCategories() {
        const categories = await db.category.findMany();
        return categories;
    }

    async getUserCategories(userId: string) {
        const categories = await db.category.findMany({
            include: {
                users: true,
            },
        });

        const userCategories = categories.filter((category) =>
            category.users.some((user) => user.userId === userId)
        );

        return userCategories;
    }
}

export const categoryService = new CategoryService();
