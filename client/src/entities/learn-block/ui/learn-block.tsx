import { memo } from "react";
import { PencilIcon, CirclePlusIcon, HistoryIcon, ZapIcon } from "lucide-react";

import {
    SectionMenuHeader,
    SectionMenuWrapper,
    SectionMenuItem,
    SectionMenuItemText,
    SectionMenuItemTitle,
    SectionMenuItemDescription,
} from "@/shared/ui/custom/section-menu";

export const LearnBlock = memo(() => {
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
                        <SectionMenuItemTitle>
                            14 категорий выбрано
                        </SectionMenuItemTitle>
                    </SectionMenuItemText>
                </SectionMenuItem>

                <SectionMenuItem
                    to="/"
                    className="border-b-background border-b-2"
                >
                    <CirclePlusIcon className="text-rose-400" />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>
                            Учить новые карточки
                        </SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            Выучено сегодня: 0 из 5
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
