import { CardCategoryStore } from "@/features/card-category";
import { AuthUserStore } from "@/features/user-auth";
import { createContext } from "react";

export class RootStore {
    auth = new AuthUserStore();
    category = new CardCategoryStore();
}

export const StoreMobxContext = createContext(new RootStore());
