import { db } from "../helpers/db";

class SettingsService {
    async getUserSettings(userId: string) {
        const settings = await db.userSettings.findMany({
            where: {
                userId,
            },
        });

        return settings;
    }
}

export const settingsService = new SettingsService();
