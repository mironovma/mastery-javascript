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
                    this.category.initializeUserCategories(userId);
                    this.settings.getUserSettings(userId);
                    this.statistic.getUserStatisticToday(userId);

                    /**
                     * Чтобы в компонентах не писать бойлерплейт код с useEffect, 
                     * где при маунте компонента получаем что-то (категории, настройки) в зависимости
                     * от user id.
                     * 
                     * Старый код выглядел бы примерно так:
                     * 
                        const { category, auth } = useMobxStore();

                        useEffect(() => {
                            if (auth.user.id) {
                                category.initializeUserCategories(auth.user.id);
                            }
                        }, [auth.user.id, category]);
                    * А теперь этот бойлерплейт в каждом компоненте не нужен.
                     */
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
