import { useLangSwitch } from "@/shared/hooks/useLang";
import { ReactNode } from "react";

export const LangProvider = ({ children }: { children: ReactNode }) => {
    /**
     * Т.к. инициализация языка происходит только при открытии navbar, то
     * при открытии приложения язык по дефолту выставляется в ru.
     * Чтобы useEffect от этого хука отрабатывал и ставился язык из localStorage,
     * я использую такой костыль. Мб, лучше как-нибудь переделать.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const langSwitcher = useLangSwitch();

    return <>{children}</>;
};
