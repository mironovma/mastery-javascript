import { ReactNode } from "react";
import { RootStore, StoreMobxContext } from "../config/store";

interface StoreMobxProviderProps {
    children: ReactNode;
}

export const StoreMobxProvider = ({ children }: StoreMobxProviderProps) => {
    return (
        <StoreMobxContext.Provider value={new RootStore()}>
            {children}
        </StoreMobxContext.Provider>
    );
};
