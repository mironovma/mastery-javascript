import { Router } from "express";

import { cardController } from "../controllers/card-controller";

const cardRouter = Router();

cardRouter.get("/cards/learning/:userId", cardController.getCardToLearn);

cardRouter.post("/cards/start-learn", cardController.onStartLearn);
cardRouter.patch("/cards/end-learn", cardController.onEndLearn);

cardRouter.get("/cards/repeat/:userId", cardController.getCardToRepeat);
cardRouter.get(
    "/cards/repeat-info/:userId",
    cardController.getCardToRepeatInfo
);

cardRouter.post("/cards/end-repeat", cardController.onEndRepeat);

export default cardRouter;
