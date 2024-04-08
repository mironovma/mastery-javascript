import { observer } from "mobx-react-lite";

import {
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuWrapper,
} from "@/shared/ui/custom/section-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { useEffect } from "react";

/**
 * TODO: реализовать отображение ежедневных карточек к изучению
 * в виде окружности с секциями
 *  + функционал для редактирования этого количества
 */
interface UserSettingsProps {
    className?: string;
}

export const UserSettings = observer(({ className }: UserSettingsProps) => {
    const { auth, settings } = useMobxStore();

    const dailyCards = settings.userSettings?.[0].settings.dailyCards;

    useEffect(() => {
        settings.getUserSettings(auth.user.id);
    }, [auth.user.id, settings]);

    return (
        <div className={className}>
            <SectionMenuHeader>Настройки</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem className="border-b-background border-b-2">
                    <div className="flex items-center gap-2">
                        Выучено карточек сегодня:{" "}
                        {settings.isLoading ? (
                            <Skeleton className="w-4 h-4" />
                        ) : (
                            dailyCards ?? 0
                        )}
                    </div>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
});
