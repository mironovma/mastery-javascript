import { Router } from "express";

import { cardController } from "../controllers/card-controller";

const cardRouter = Router();

cardRouter.get("/cards/learning/:userId", cardController.getCardToLearn);

/**
 * TODO: Придумать названия для эндпоинтов и контроллеров + сервисов получше
 */
cardRouter.post("/cards/start-learn/:userId", cardController.onStartLearn);
cardRouter.post("/cards/end-learn/:userId", cardController.onEndLearn);

export default cardRouter;
