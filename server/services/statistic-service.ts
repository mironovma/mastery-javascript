import { db } from "../helpers/db";

class StatisticService {
    async getUserStatisticToday(userId: string) {
        const currenDate = new Date();
        const year = currenDate.getFullYear();
        const month = String(currenDate.getMonth() + 1).padStart(2, "0");
        const day = String(currenDate.getDate()).padStart(2, "0");

        const startOfDay = new Date(`${year}-${month}-${day}T00:00:00Z`);
        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfDay.getDate() + 1);

        let statisticToday;

        statisticToday = await db.userStatistics.findFirst({
            where: {
                userId,
                date: {
                    gte: startOfDay, // дата и время больше или равно началу сегодняшнего
                    lt: startOfNextDay, // но меньше начала следующего дня
                },
            },
        });

        return statisticToday;
    }

    async getUserStatisticAll(userId: string) {
        const statisticAll = await db.userStatistics.findMany({
            where: {
                userId,
            },
        });

        return statisticAll;
    }

    async createUserStatisticToday(userId: string) {
        const statisticToday = await db.userStatistics.create({
            data: {
                userId,
            },
        });

        return statisticToday;
    }
}

export const statisticService = new StatisticService();
