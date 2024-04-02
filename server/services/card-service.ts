import { db } from "../helpers/db";

class CardService {
    async getCards() {
        // const users = await db.user.findMany();
        // return users;
    }
}

export const cardService = new CardService();
