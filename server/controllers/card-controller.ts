import { Request, Response, NextFunction } from "express";

import { cardService } from "../services/card-service";

class CardController {
    async getCardToLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cards = await cardService.getCardToLearn(userId);

            return res.json(cards);
        } catch (error) {
            next(error);
        }
    }

    // Отправляем в БД для повторения (учим карточку)
    async onStartLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { cardId } = req.body;
            await cardService.onStartLearn(userId, cardId);

            return res.json("Success onStartLearn");
        } catch (error) {
            next(error);
        }
    }

    // Отпрвляем в БД выученных карточек (в повторениях ее не будет)
    async onEndLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { cardId } = req.body;
            await cardService.onEndLearn(userId, cardId);

            return res.json("Success onEndLearn");
        } catch (error) {
            next(error);
        }
    }

    // async getCards(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const cards = await cardService.getCards();
    //         return res.json(cards);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export const cardController = new CardController();
