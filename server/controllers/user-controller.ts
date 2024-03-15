import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { userService } from "../services/user-service";
import { ApiError } from "../exceptions/api-error";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            if (error instanceof ZodError) {
                const apiError = ApiError.BadRequest(
                    "Ошибка валидации",
                    error.issues
                );
                next(apiError);
            } else {
                next(error);
            }
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const userData = await userService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const token = await userService.logout(refreshToken);

            res.clearCookie("refreshToken");

            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;

            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL!);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refreshToken(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
