import { makeAutoObservable, runInAction } from "mobx";

import $api from "@/shared/api/api";

interface StatisticToday {
    id: string;
    userId: string;
    date: Date;
    newCards: number;
    repeatedCards: number;
    learnedCards: number;
}

export class UserStatisticStore {
    statisticToday: StatisticToday | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getUserStatisticToday(userId: string) {
        this.isLoading = true;

        try {
            const response = await $api.get(`/statistic/today/${userId}`);
            runInAction(() => {
                this.statisticToday = response.data;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            return { error };
        }
    }

    /**
     * @deprecated Этот action нигде не используется. Возможно, в будущем удалить.
     */
    async createUserStatisticToday(userId: string) {
        this.isLoading = true;

        try {
            const response = await $api.post("/statistic/today", { userId });
            runInAction(() => {
                this.statisticToday = response.data;
            });
        } catch (error) {
            return { error };
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}
