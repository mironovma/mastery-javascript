import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type LangType = "ru" | "en";

export const useLangSwitch = (
    storageKey: string = "ui-lang",
    defaultLang: LangType = "ru"
) => {
    const [lang, setLang] =
        useState<LangType>(
            () => localStorage.getItem(storageKey) as LangType
        ) || defaultLang;

    const { i18n } = useTranslation();

    const onLangChange = (lang: LangType) => {
        setLang(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem(storageKey, lang);
    };

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, []);

    return { lang, onLangChange };
};
