import { Router } from "express";
import { settignsController } from "../controllers/settings-controller";

const settingsRouter = Router();

settingsRouter.get("/settings/:userId", settignsController.getUserSettings);

settingsRouter.post("/settings", settignsController.setUserSettings);

export default settingsRouter;
