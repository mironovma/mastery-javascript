import { Card } from "@prisma/client";
import { db } from "../helpers/db";

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

    async onStartLearn(userId: string, cardId: string) {}

    async onEndLearn(userId: string, cardId: string) {}
}

export const cardService = new CardService();
