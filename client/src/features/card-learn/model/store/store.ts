import { makeAutoObservable, runInAction } from "mobx";

import type { Card } from "@/shared/types/card";

import $api from "@/shared/api/api";

// TODO: переименовать в CardLearnStore

export class CardStore {
    card: Card | null = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getCardsToLearn(userId: string) {
        this.isLoading = true;

        try {
            const response = await $api.get(`/cards/learning/${userId}`);

            runInAction(() => {
                this.card = response.data;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            return { error };
        }
    }

    async onStartLearn(userId: string, cardId: string) {
        await $api.post(`/cards/start-learn/${userId}`, { cardId });
        this.getCardsToLearn(userId); // Заново получаем карточки для запоминания, если лимит не превышен
    }

    async onEndLearn(userId: string, cardId: string) {
        await $api.patch(`/cards/end-learn/${userId}`, { cardId });
        this.getCardsToLearn(userId);
    }
}
