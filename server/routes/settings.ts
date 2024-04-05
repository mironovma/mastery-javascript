import { Router } from "express";
import { settignsController } from "../controllers/settings-controller";

const settingsRouter = Router();

settingsRouter.get("/settings/:userId", settignsController.getUserSettings);

// settingsRouter.patch("/settigns/:userId", settignsController.setUserSettings);

export default settingsRouter;
