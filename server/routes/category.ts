import { Router } from "express";

import { categoryController } from "../controllers/category-controller";

const categoryRouter = Router();

categoryRouter.get("/categories", categoryController.getCategories);

categoryRouter.get("/categories/:userId", categoryController.getUserCategories);

categoryRouter.post("/categories", categoryController.setUserCategories);

export default categoryRouter;
