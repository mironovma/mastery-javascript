import { NextFunction, Request, Response } from "express";
import { cardService } from "../service/card-service";

class CardController {
    async createCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description } = req.body;

            const cardData = await cardService.createCard(title, description);

            return res.json(cardData);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }

    async getAllCards(req: Request, res: Response, next: NextFunction) {
        try {
            const cards = await cardService.getAllCards();
            return res.json(cards);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

export const cardController = new CardController();
