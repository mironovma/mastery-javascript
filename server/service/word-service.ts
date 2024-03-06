import { db } from "../helpers/db";

class WordService {
    async getAllWords() {
        const words = await db.word.findMany();
        return words;
    }
}

export const wordService = new WordService();
