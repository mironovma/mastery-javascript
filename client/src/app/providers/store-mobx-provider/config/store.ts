import { createContext } from "react";
import { reaction } from "mobx";

import { CardCategoryStore } from "@/features/card-category";
import { AuthUserStore } from "@/features/user-auth";
import { UserSettingsStore } from "@/features/user-settings";

export class RootStore {
    auth: AuthUserStore;
    category: CardCategoryStore;
    settings: UserSettingsStore;

    constructor() {
        this.auth = new AuthUserStore();
        this.category = new CardCategoryStore();
        this.settings = new UserSettingsStore();

        reaction(
            () => this.auth.user.id,
            (userId) => {
                if (userId) {
                    this.category.initializeUserCategories(userId);
                    this.settings.getUserSettings(userId);
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
    }
}

export const StoreMobxContext = createContext(new RootStore());
