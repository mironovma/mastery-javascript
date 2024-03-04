import { Router } from "express";
import { cardController } from "../controllers/card-controller";

const router = Router();

router.get("/cards", cardController.getAllCards);

export default router;
