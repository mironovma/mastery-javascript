import { Request, Response, NextFunction } from "express";
import { statisticService } from "../services/statistic-service";

class StatisticController {
    async getUserStatisticToday(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userId } = req.params;
            const statisticToday = await statisticService.getUserStatisticToday(
                userId
            );
            return res.json(statisticToday);
        } catch (error) {
            next(error);
        }
    }

    async getUserStatisticAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const statisticAll = await statisticService.getUserStatisticAll(
                userId
            );

            return res.json(statisticAll);
        } catch (error) {
            next(error);
        }
    }

    async createUserStatisticToday(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userId } = req.body;
            const statisticToday =
                await statisticService.createUserStatisticToday(userId);
            return res.json(statisticToday);
        } catch (error) {
            next(error);
        }
    }
}

export const statisticController = new StatisticController();
