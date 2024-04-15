import { memo, useCallback, useEffect, useState } from "react";

import { LearnBlock } from "@/entities/learn-block";
import { UserSettings } from "@/features/user-settings";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { observer } from "mobx-react-lite";

const AppPage = observer(() => {
    const { auth, settings, statistic, cardsToRepeat } = useMobxStore();

    const [dailyCardsToLearn, setDailyCardsToLearn] = useState(
        settings.userSettings?.[0].settings.dailyCards,
    );

    useEffect(() => {
        setDailyCardsToLearn(settings.userSettings?.[0].settings.dailyCards);
    }, [settings.userSettings]);

    const onSaveNewUserSettings = useCallback(() => {
        settings.setNewUserSettings(auth.user.id, {
            dailyCards: dailyCardsToLearn!,
        });
    }, [auth.user.id, dailyCardsToLearn, settings]);

    const onSetNewDailyCardsToLearn = useCallback((amount: number) => {
        setDailyCardsToLearn(amount);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <LearnBlock
                dailyCardsToLearn={dailyCardsToLearn}
                learnedToday={statistic.statisticToday?.newCards}
                cardsToRepeat={
                    cardsToRepeat.cardsToRepeatInfo?.cardsToRepeatLength
                }
                timeToRepeat={cardsToRepeat.cardsToRepeatInfo?.minsLeftToRepeat}
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

export default memo(AppPage);
