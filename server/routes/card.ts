import { Router } from "express";

import { cardController } from "../controllers/card-controller";

const cardRouter = Router();

cardRouter.get("/cards", cardController.getCards);

export default cardRouter;
