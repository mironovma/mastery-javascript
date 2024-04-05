import { observer } from "mobx-react-lite";

import { useUserData } from "@/shared/hooks/useCategories";
import {
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuWrapper,
} from "@/shared/ui/custom/section-menu";

/**
 * TODO: реализовать отображение ежедневных карточек к изучению + редактировать это число
 */
interface UserSettingsProps {
    className?: string;
}

export const UserSettings = observer(({ className }: UserSettingsProps) => {
    const { dailyCards } = useUserData();

    return (
        <div className={className}>
            <SectionMenuHeader>Настройки</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem
                    to=""
                    className="border-b-background border-b-2"
                >
                    <div>Выучено карточек сегодня: {dailyCards}</div>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
});
