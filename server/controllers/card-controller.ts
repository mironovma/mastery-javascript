import { Request, Response, NextFunction } from "express";

import { cardService } from "../services/card-service";

class CardController {
    async getCards(req: Request, res: Response, next: NextFunction) {
        try {
            const cards = await cardService.getCards();
            return res.json(cards);
        } catch (error) {
            next(error);
        }
    }
}

export const cardController = new CardController();
