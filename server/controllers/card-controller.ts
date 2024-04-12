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
            const { userId, cardId } = req.body;
            await cardService.onStartLearn(userId, cardId);

            return res.json("Success onStartLearn");
        } catch (error) {
            next(error);
        }
    }

    // Отпрвляем в БД выученных карточек (в повторениях ее не будет)
    async onEndLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, cardId } = req.body;
            await cardService.onEndLearn(userId, cardId);

            return res.json("Success onEndLearn");
        } catch (error) {
            next(error);
        }
    }

    async getCardToRepeat(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cards = await cardService.getCardToRepeat(userId);

            return res.json(cards);
        } catch (error) {
            next(error);
        }
    }

    async onEndRepeat(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, cardId } = req.body;
            await cardService.onEndRepeat(userId, cardId);

            return res.json("Success onEndRepeat");
        } catch (error) {
            next(error);
        }
    }

    async getCardToRepeatInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cardToRepeatInfo = await cardService.getCardToRepeatInfo(
                userId
            );

            return res.json(cardToRepeatInfo);
        } catch (error) {
            next(error);
        }
    }
}

export const cardController = new CardController();
