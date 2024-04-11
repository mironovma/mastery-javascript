import { memo, useCallback, useState } from "react";

import { UserSettings } from "@/features/user-settings";
import { LearnBlock } from "@/entities/learn-block";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

export const LearnSection = memo(() => {
    const { auth, settings, statistic } = useMobxStore();

    const dailyCards = settings.userSettings?.[0].settings.dailyCards;
    const [dailyCardsToLearn, setDailyCardsToLearn] = useState<
        number | undefined
    >(dailyCards);

    const onSaveNewUserSettings = useCallback(() => {
        settings.setNewUserSettings(auth.user.id, {
            dailyCards: dailyCardsToLearn!,
        });
    }, [dailyCardsToLearn]);

    const onSetNewDailyCardsToLearn = useCallback((amount: number) => {
        setDailyCardsToLearn(amount);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <LearnBlock
                dailyCardsToLearn={dailyCardsToLearn}
                learnedToday={statistic.statisticToday?.newCards}
            />
            <UserSettings
                dailyCardsToLearn={dailyCardsToLearn}
                learnedToday={statistic.statisticToday?.newCards}
                onSetNewDailyCardsToLearn={onSetNewDailyCardsToLearn}
                onSaveNewUserSettings={onSaveNewUserSettings}
            />
        </div>
    );
});
