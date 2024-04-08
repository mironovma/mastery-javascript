import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { PencilIcon, CirclePlusIcon, HistoryIcon, ZapIcon } from "lucide-react";

import {
    SectionMenuHeader,
    SectionMenuWrapper,
    SectionMenuItem,
    SectionMenuItemText,
    SectionMenuItemTitle,
    SectionMenuItemDescription,
} from "@/shared/ui/custom/section-menu";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Skeleton } from "@/shared/ui/skeleton";

export const LearnBlock = observer(() => {
    const { t } = useTranslation();
    const { auth, category, settings } = useMobxStore();

    const selectedCategories = category.userCategories.length;

    useEffect(() => {
        if (auth.user.id) {
            category.initializeUserCategories(auth.user.id);
        }
    }, [auth.user.id, category]);

    return (
        <div>
            <SectionMenuHeader>Изучение новых карточек</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem
                    to="/app/category"
                    className="border-b-background border-b-2"
                >
                    <PencilIcon className="text-gray-400" />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle className="flex items-center gap-1">
                            {category.isLoading ? (
                                <Skeleton className="w-4 h-4" />
                            ) : (
                                t("категорий", { count: selectedCategories })
                            )}
                        </SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            Выберите категории карточек для изучения
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                </SectionMenuItem>

                <SectionMenuItem
                    to="/app/learn"
                    className="border-b-background border-b-2"
                >
                    <CirclePlusIcon className="text-rose-400" />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>
                            Учить новые карточки
                        </SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            Выучено сегодня: 0 из{" "}
                            {settings.userSettings?.[0].settings.dailyCards}
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                </SectionMenuItem>

                <SectionMenuItem
                    to="/"
                    className="border-b-background border-b-2"
                >
                    <HistoryIcon className="text-yellow-300" />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>
                            Повторить карточки
                        </SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            Карточки для повторения появятся через 3 часа
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                </SectionMenuItem>

                <SectionMenuItem to="/">
                    <ZapIcon className="text-blue-400" />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>Микс-режим</SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            Повторите все карточки: новые, старые, на повторение
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
});
