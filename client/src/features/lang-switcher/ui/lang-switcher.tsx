import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LangType, useLangSwitch } from "@/shared/hooks/useLang";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

export const LangSwither = memo(() => {
    const { t } = useTranslation();
    const { lang, onLangChange } = useLangSwitch();

    return (
        <Select value={lang ?? undefined} onValueChange={onLangChange}>
            <SelectTrigger>
                <SelectValue placeholder={t("Язык")} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t("Выберите язык")}</SelectLabel>
                    <SelectItem value={"en" as LangType}>English</SelectItem>
                    <SelectItem value={"ru" as LangType}>Русский</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
});
