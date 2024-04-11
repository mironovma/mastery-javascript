import { createContext } from "react";
import { reaction } from "mobx";

import { CardCategoryStore } from "@/features/card-category";
import { AuthUserStore } from "@/features/user-auth";
import { UserSettingsStore } from "@/features/user-settings";
import { CardStore } from "@/features/card-learn";
import { UserStatisticStore } from "@/features/user-statistic";

export class RootStore {
    auth: AuthUserStore;
    card: CardStore;
    category: CardCategoryStore;
    settings: UserSettingsStore;
    statistic: UserStatisticStore;

    constructor() {
        this.auth = new AuthUserStore();
        this.card = new CardStore();
        this.category = new CardCategoryStore();
        this.settings = new UserSettingsStore();
        this.statistic = new UserStatisticStore();

        reaction(
            () => this.auth.user.id,
            (userId) => {
                if (userId) {
                    this.card.getCardsToLearn(userId);
                    this.card.getCardsToRepeat(userId);
                    this.category.initializeUserCategories(userId);
                    this.settings.getUserSettings(userId);
                    this.statistic.getUserStatisticToday(userId);
                }
            },
        );

        // Для обновления стейта со статистикой для изучения и повторения карточек
        reaction(
            () => this.card.card,
            () => {
                this.statistic.getUserStatisticToday(this.auth.user.id);
            },
        );
    }
}

export const StoreMobxContext = createContext(new RootStore());
