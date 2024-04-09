import { Router } from "express";

import { cardController } from "../controllers/card-controller";

const cardRouter = Router();

cardRouter.get("/cards/learning/:userId", cardController.getCardToLearn);

cardRouter.post("/cards/start-learn/:userId", cardController.onStartLearn);
cardRouter.patch("/cards/end-learn/:userId", cardController.onEndLearn);

export default cardRouter;
