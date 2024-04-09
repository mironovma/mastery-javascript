import { Card } from "@prisma/client";
import { db } from "../helpers/db";
import { ApiError } from "../exceptions/api-error";

class CardService {
    async getCardToLearn(userId: string) {
        const userCategoriesToLearn = await db.userCategory.findMany({
            where: {
                userId,
            },
        });

        const tryGetCard = async (attempt = 0): Promise<Card | null> => {
            if (attempt > userCategoriesToLearn.length) {
                return null;
            }

            const randomCategoryToLearn = Math.floor(
                Math.random() * userCategoriesToLearn.length
            );

            const selectedCategory = userCategoriesToLearn.splice(
                randomCategoryToLearn,
                1
            )[0]; // Выбираем категорию и удаляем ее, чтобы не выбирать снова в следующем шаге рекурсии

            const userCardsInLearning = await db.userCard.findMany({
                where: {
                    userId,
                },
            });

            const userCardsInLearningIds = userCardsInLearning.map(
                (card) => card.cardId
            );

            const cardToLearn = await db.card.findFirst({
                where: {
                    categoryId: selectedCategory.categoryId,
                    NOT: {
                        id: {
                            in: userCardsInLearningIds,
                        },
                    },
                },
            });

            if (cardToLearn) {
                return cardToLearn;
            } else {
                return tryGetCard(attempt + 1);
            }
        };

        return tryGetCard();
    }

    async onStartLearn(userId: string, cardId: string) {
        const card = await db.userCard.create({
            data: {
                userId,
                cardId,
                // TODO: прибавлять 30 минут
                nextReview: "2024-04-09T10:35:49.888Z",
                status: "LEARNING",
            },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const userStatistic = await db.userStatistics.findFirst({
            where: {
                userId,
                date: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

        if (!userStatistic) {
            await db.userStatistics.create({
                data: {
                    userId,
                },
            });
        } else {
            await db.userStatistics.update({
                where: {
                    id: userStatistic.id,
                },
                data: {
                    newCards: {
                        increment: 1,
                    },
                    date: new Date().toISOString(),
                },
            });
        }

        return card;
    }

    async onEndLearn(userId: string, cardId: string) {
        const currentCard = await db.userCard.findFirst({
            where: {
                userId,
                cardId,
            },
        });

        let card;

        // Далее в фиче для повторения карточек буду просто фильтровать по status
        if (!currentCard) {
            card = await db.userCard.create({
                data: {
                    userId,
                    cardId,
                    nextReview: "2222-11-11T11:11:11Z",
                    status: "MEMORIZED",
                },
            });

            return card;
        }

        card = await db.userCard.update({
            where: {
                id: currentCard?.id,
            },
            data: {
                status: "MEMORIZED",
            },
        });

        // TODO: сделать редактирование статистики и здесь, чтобы поле learnedCard увеличивалось

        return card;
    }
}

export const cardService = new CardService();
