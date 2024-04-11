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

interface LearnBlockProps {
    className?: string;
    learnedToday?: number;
    dailyCardsToLearn?: number;
}

export const LearnBlock = observer(
    ({ className, learnedToday = 0, dailyCardsToLearn }: LearnBlockProps) => {
        const { t } = useTranslation();
        const { category } = useMobxStore();

        const selectedCategories = category.userCategories.length;

        if (category.isLoading) {
            return (
                <div className={className}>
                    <SectionMenuHeader>
                        Изучение новых карточек
                    </SectionMenuHeader>
                    <div className="flex flex-col gap-[1px]">
                        <Skeleton className="w-full h-16" />
                        <Skeleton className="w-full h-16" />
                        <Skeleton className="w-full h-16" />
                        <Skeleton className="w-full h-16" />
                    </div>
                </div>
            );
        }

        return (
            <div className={className}>
                <SectionMenuHeader>Изучение новых карточек</SectionMenuHeader>
                <SectionMenuWrapper>
                    <SectionMenuItem
                        to="/app/category"
                        className="border-b-background border-b-2"
                    >
                        <PencilIcon className="text-gray-400" />
                        <SectionMenuItemText>
                            <SectionMenuItemTitle className="flex items-center gap-1">
                                {t("категорий", {
                                    count: selectedCategories,
                                })}
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
                                Выучено сегодня: {learnedToday} из{" "}
                                {dailyCardsToLearn}
                            </SectionMenuItemDescription>
                        </SectionMenuItemText>
                    </SectionMenuItem>

                    <SectionMenuItem
                        to="/app/repeat"
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
                            <SectionMenuItemTitle>
                                Микс-режим
                            </SectionMenuItemTitle>
                            <SectionMenuItemDescription>
                                Повторите все карточки: новые, старые, на
                                повторение
                            </SectionMenuItemDescription>
                        </SectionMenuItemText>
                    </SectionMenuItem>
                </SectionMenuWrapper>
            </div>
        );
    },
);
