import { Router } from "express";
import { statisticController } from "../controllers/statistic-controller";

const statisticRouter = Router();

statisticRouter.get(
    "/statistic/today/:userId",
    statisticController.getUserStatisticToday
);

statisticRouter.get(
    "/statistic/all/:userId",
    statisticController.getUserStatisticAll
);

statisticRouter.post(
    "/statistic/today",
    statisticController.createUserStatisticToday
);

export default statisticRouter;
