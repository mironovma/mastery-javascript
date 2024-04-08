import { Router } from "express";

import { cardController } from "../controllers/card-controller";

const cardRouter = Router();

cardRouter.get("/cards/learning/:userId", cardController.getCardsToLearn);

/**
 * TODO: Придумать названия для эндпоинтов и контроллеров + сервисов получше
 */
cardRouter.post("/cards/to-learn/:userId", cardController.onLearn);
cardRouter.post("/cards/to-memorized/:userId", cardController.onMemorize);

export default cardRouter;
