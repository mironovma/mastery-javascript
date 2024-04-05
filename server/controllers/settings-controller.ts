import { Request, Response, NextFunction } from "express";
import { settingsService } from "../services/settings-service";

class SettingsController {
    async getUserSettings(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const settings = await settingsService.getUserSettings(userId);
            return res.json(settings);
        } catch (error) {
            next(error);
        }
    }

    async setUserSettings(req: Request, res: Response, next: NextFunction) {}
}

export const settignsController = new SettingsController();
