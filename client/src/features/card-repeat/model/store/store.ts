import { makeAutoObservable, runInAction } from "mobx";

import type { Card } from "@/shared/types/card";
import $api from "@/shared/api/api";

export class CardRepeatStore {
    cardsToRepeat: Card[] | null = null;
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getCardsToRepeat(userId: string) {
        this.isLoading = true;
        try {
            const response = await $api.get(`/cards/repeat/${userId}`);

            runInAction(() => {
                this.cardsToRepeat = response.data;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async onRepeat(card: Card) {
        // Если "Забыл ответ", то просто пушим эту карточку в конец массива, чтобы снова на нее попасть.
        runInAction(() => {
            if (this.cardsToRepeat !== null) {
                this.cardsToRepeat.push(card);
            }
        });
    }

    async onEndRepeat(userId: string, cardId: string) {
        this.isLoading = true;
        try {
            await $api.post("/cards/end-repeat", { userId, cardId });

            runInAction(() => {
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}
