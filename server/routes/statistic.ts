import { Router } from "express";
import { statisticController } from "../controllers/statistic-controller";

const statisticRouter = Router();

statisticRouter.get(
    "/statistic/today/:userId",
    statisticController.getUserStatisticToday
);

export default statisticRouter;