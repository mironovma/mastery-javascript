import { Request, Response, NextFunction } from "express";
import { wordService } from "../service/word-service";

class WordController {
    async getAllWords(req: Request, res: Response, next: NextFunction) {
        try {
            const words = await wordService.getAllWords();
            return res.json(words);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

export const wordController = new WordController();
