import { makeAutoObservable } from "mobx";

import $api from "@/shared/api/api";
import { Settings, UserSettings } from "@/shared/types/user-data";

export class UserSettingsStore {
    userSettings: UserSettings[] | undefined;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUserSettings(settings: UserSettings[]) {
        this.userSettings = settings;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async getUserSettings(userId: string) {
        this.setIsLoading(true);
        try {
            const response = await $api.get(`/settings/${userId}`);

            this.setUserSettings(response.data as UserSettings[]);
        } catch (error) {
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    async setNewUserSettings(userId: string, settings: Settings) {
        this.setIsLoading(true);
        try {
            await $api.post("/settings", { userId, settings });
            await this.getUserSettings(userId);
        } catch (error) {
            return { error };
        } finally {
            this.setIsLoading(false);
        }
    }
}
