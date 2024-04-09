import $api from "@/shared/api/api";
import { makeAutoObservable, runInAction } from "mobx";

interface Card {
    id: string;
    categoryId: string;
    question: string;
    shortAnswer: string;
    detailedAnswer?: string;
    options?: Array<{ answer: string; isTrue: boolean }>;
}

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
            });
        } catch (error) {
            return { error };
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async onStartLearn(userId: string, cardId: string) {
        await $api.post(`/cards/to-learn/${userId}`, { cardId });
        this.getCardsToLearn(userId); // Заново получаем карточки для запоминания, если лимит не превышен (TODO: сравнивать с лимитом!)
    }

    async onEndLearn(userId: string, cardId: string) {
        await $api.post(`/cards/to-memorized/${userId}`, { cardId });
        this.getCardsToLearn(userId);
    }
}
