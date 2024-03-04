import { db } from "../helpers/db";

class CardService {
    async getAllCards() {
        const cards = await db.card.findMany();
        return cards;
    }

    async createCard(title: string, description: string) {
        const card = await db.card.create({
            data: {
                title,
                description,
            },
        });

        return card;
    }
}

export const cardService = new CardService();
