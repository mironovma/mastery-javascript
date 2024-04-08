import { Category } from "@prisma/client";
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

    async setUserCategories(
        userId: string,
        // на клиенте в локальном стейте еще хранится isSelected - на сервере удобно далее фильтровать
        categories: (Category & { isSelected: boolean })[]
    ) {
        const oldUserCategories = await db.userCategory.deleteMany({
            where: {
                userId,
            },
        });

        const newCategories = categories
            .filter((cat) => cat.isSelected)
            .map((cat) => ({
                userId,
                categoryId: cat.id,
            }));

        const userCategories = await db.userCategory.createMany({
            data: newCategories,
        });

        return userCategories;
    }
}

export const categoryService = new CategoryService();
