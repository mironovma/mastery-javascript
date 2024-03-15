import { Router } from "express";
import { validate } from "../middleware/validate";

import { registrationSchema } from "../schemas/user-schema";
import { userController } from "../controllers/user-controller";

const authRouter = Router();

authRouter.post(
    "/registration",
    validate(registrationSchema),
    userController.registration
);

authRouter.post("/login", userController.login);

authRouter.post("/logout", userController.logout);

authRouter.get("/activate/:link", userController.activate);

authRouter.get("/refresh", userController.refresh);

export default authRouter;
