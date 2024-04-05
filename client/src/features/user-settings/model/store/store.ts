import { makeAutoObservable } from "mobx";

import $api from "@/shared/api/api";
import { UserSettings } from "@/shared/types/user-data";

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
}
