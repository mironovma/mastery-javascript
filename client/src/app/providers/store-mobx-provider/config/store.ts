import { createContext } from "react";

import { CardCategoryStore } from "@/features/card-category";
import { AuthUserStore } from "@/features/user-auth";
import { UserSettingsStore } from "@/features/user-settings";

export class RootStore {
    auth = new AuthUserStore();
    category = new CardCategoryStore();
    settings = new UserSettingsStore();
}

export const StoreMobxContext = createContext(new RootStore());
