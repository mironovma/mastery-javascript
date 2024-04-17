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

    async onStartLearn(userId: string, cardId: string) {
        const now = new Date();
        const nextReview = new Date(now.getTime() + 30 * 60000);

        const card = await db.userCard.create({
            data: {
                userId,
                cardId,
                nextReview: nextReview.toISOString(),
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
                    newCards: 1,
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
                    learnedCards: 1,
                },
            });
        } else {
            await db.userStatistics.update({
                where: {
                    id: userStatistic.id,
                },
                data: {
                    learnedCards: {
                        increment: 1,
                    },
                    date: new Date().toISOString(),
                },
            });
        }

        const currentCard = await db.userCard.findFirst({
            where: {
                userId,
                cardId,
            },
        });

        let card;

        // Далее в фиче для повторения карточек буду просто фильтровать по status и по времени
        if (!currentCard) {
            card = await db.userCard.create({
                data: {
                    userId,
                    cardId,
                    nextReview: today.toISOString(),
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

        return card;
    }

    async getCardToRepeat(userId: string) {
        const now = new Date();

        const userCards = await db.userCard.findMany({
            where: {
                userId,
                status: "LEARNING",
            },
        });

        if (!userCards.length) {
            return {
                message:
                    "Все карточки уже MEMORIZED. Начните учить новые карточки.",
            };
        }

        const cardsToRepeatIds = userCards
            .filter((card) => card.nextReview <= now)
            .map((card) => card.cardId);

        if (!cardsToRepeatIds.length) {
            return {
                message: "На данный момент нет карточек для повторения.",
            };
        }

        const cardsToRepeat = await db.card.findMany({
            where: {
                id: {
                    in: cardsToRepeatIds,
                },
            },
        });

        return cardsToRepeat;
    }

    async onEndRepeat(userId: string, cardId: string) {
        const card = await db.userCard.findFirst({
            where: {
                userId,
                cardId,
            },
        });

        if (!card) {
            return {
                message: `Карточки с id ${cardId} для такого пользователя не существует`,
            };
        }

        const reviewHours: Record<number, number> = {
            0: 2,
            1: 6,
            2: 24,
            3: 48,
            4: 96,
            5: 192,
            6: 384,
            7: 768,
            8: 100_000,
        };

        const hours = reviewHours[card.reviewCount];

        if (hours === undefined) {
            return {
                message:
                    "Ошибка при выставлении hours для следующего повторения",
            };
        }

        const now = new Date();

        const nextReview = new Date(now.getTime() + hours * 60 * 60000);

        const repeatedCard = await db.userCard.update({
            where: {
                id: card.id,
            },
            data: {
                reviewCount: {
                    increment: 1,
                },
                nextReview,
                status: card.reviewCount === 8 ? "MEMORIZED" : "LEARNING",
            },
        });

        const dateToday = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}-${now.getDate()}`;

        const dateStart = new Date(dateToday);
        const dateEnd = new Date(dateToday);
        dateStart.setHours(0, 0, 0, 0);
        dateEnd.setHours(23, 59, 59, 99);

        const userStatistic = await db.userStatistics.findFirst({
            where: {
                userId,
                date: {
                    gte: dateStart,
                    lte: dateEnd,
                },
            },
        });

        if (!userStatistic) {
            await db.userStatistics.create({
                data: {
                    userId,
                    repeatedCards: 1,
                },
            });
        } else {
            await db.userStatistics.update({
                where: {
                    id: userStatistic.id,
                },
                data: {
                    repeatedCards: {
                        increment: 1,
                    },
                },
            });
        }

        return repeatedCard;
    }

    async getCardToRepeatInfo(userId: string) {
        const now = new Date();

        const userCards = await db.userCard.findMany({
            where: {
                userId,
                status: "LEARNING",
            },
        });

        if (!userCards) {
            return { message: "Все карточки MEMORIZED. Начните учить еще." };
        }

        const cardsToRepeatLength = userCards.filter(
            (card) => card.nextReview < now
        ).length;

        let minsLeftToRepeat;

        if (!cardsToRepeatLength) {
            const sortedCardsByDate = userCards.sort(
                (cardA, cardB) =>
                    cardA.nextReview.getTime() - cardB.nextReview.getTime()
            );

            minsLeftToRepeat = Math.floor(
                (sortedCardsByDate[0].nextReview.getTime() - now.getTime()) /
                    1000 /
                    60
            );
        }

        return {
            cardsToRepeatLength,
            minsLeftToRepeat,
        };
    }
}

export const cardService = new CardService();
