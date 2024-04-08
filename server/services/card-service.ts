import { db } from "../helpers/db";

class CardService {
    async getCardsToLearn(userId: string) {}

    async onLearn(userId: string, cardId: string) {}

    async onMemorize(userId: string, cardId: string) {}

    // async getCards() {
    //     const users = await db.user.findMany();
    //     return users;
    // }
}

export const cardService = new CardService();
