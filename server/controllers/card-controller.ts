import { Request, Response, NextFunction } from "express";

import { cardService } from "../services/card-service";

/**
 * TODO:
 * Реализовать сервисы для этого контроллера.
 *
 * 1. При получении карточек сравнивать "лимит в день" и уже кол-во выученных карточек
 *
 * 2. При onLearn в стату записываю каждый раз +1 к числу выученных карточек СЕГОДНЯ
 *
 * 3. При onMemorize в стату записываю кол-во выученных карточек (полностью выученных)
 */

class CardController {
    async getCardsToLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const cards = await cardService.getCardsToLearn(userId);
            // return res.json(cards);
            return res.json("приветик. реализуй сервисы на сервере");
        } catch (error) {
            next(error);
        }
    }

    // Отправляем в БД для повторения (учим карточку)
    async onLearn(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { cardId } = req.body;
            await cardService.onLearn(userId, cardId);

            return res.status(200);
        } catch (error) {
            next(error);
        }
    }

    // Отпрвляем в БД выученных карточек (в повторениях ее не будет)
    async onMemorize(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { cardId } = req.body;

            await cardService.onMemorize(userId, cardId);
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
