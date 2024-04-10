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

    async setUserSettings(userId: string, settings: { dailyCards: number }) {
        let userSettings;

        userSettings = await db.userSettings.findFirst({
            where: {
                userId,
            },
        });

        if (!userSettings) {
            userSettings = await db.userSettings.create({
                data: {
                    userId,
                    settings,
                },
            });

            return userSettings;
        }

        const newUserSettings = await db.userSettings.update({
            where: {
                id: userSettings.id,
            },
            data: {
                settings,
            },
        });

        return newUserSettings;
    }
}

export const settingsService = new SettingsService();
