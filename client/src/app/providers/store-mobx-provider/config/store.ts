import { AuthUserStore } from "@/features/user-auth";
import { createContext } from "react";

export class RootStore {
    auth = new AuthUserStore();
}

export const StoreMobxContext = createContext(new RootStore());
