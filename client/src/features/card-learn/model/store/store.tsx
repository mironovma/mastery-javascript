import $api from "@/shared/api/api";
import { makeAutoObservable, runInAction } from "mobx";

export class CardStore {
    cards = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async loadLearningCards(userId: string) {
        this.isLoading = true;

        try {
            const response = await $api.get(`/cards/learning/${userId}`);
            runInAction(() => {
                this.cards = response.data;
            });
        } catch (error) {
            return { error };
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    /**
     * TODO: Придумать названия для эндпоинтов и контроллеров
     * + сервисов получше + НАЗВАНИЙ ACTION в этом сторе
     */
    async onLearn(userId: string, cardId: string) {
        await $api.post(`/cards/to-learn/${userId}`, { cardId });
        this.loadLearningCards(userId); // Заново получаем карточки для запоминания, если лимит не превышен (TODO: сравнивать с лимитом!)
    }

    async onMemorize(userId: string, cardId: string) {
        await $api.post(`/cards/to-memorized/${userId}`, { cardId });
        this.loadLearningCards(userId);
    }
}
