/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react-lite";

import { CongratsWindow } from "@/widgets/congrats-window";
import { Card } from "@/entities/card";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Skeleton } from "@/shared/ui/skeleton";

export const CardLearn = observer(() => {
    const { auth, card, category, settings, statistic } = useMobxStore();

    if (
        settings.isLoading ||
        card.isLoading ||
        statistic.isLoading ||
        category.isLoading
    ) {
        return <Skeleton className="w-full h-card" />;
    }

    /**
     * TODO:
     * ЕСТЬ ПРОБЛЕМА!
     *
     * Не выполняется условие if dailyCardLimitToLearn === statistic,
     * пока не перезагрузишь страницу (не обновляется состояние компонента)
     *
     * ИСПРАВИТЬ!
     */

    if (!statistic.statisticToday) {
        statistic.createUserStatisticToday(auth.user.id);
    }

    const dailyCardLimitToLearn =
        settings.userSettings?.[0].settings.dailyCards;

    const categoryName = category.userCategories.filter(
        (cat) => cat.id === card.card?.categoryId,
    )[0].name;

    if (
        dailyCardLimitToLearn !== undefined &&
        statistic.statisticToday?.newCards !== undefined &&
        statistic.statisticToday.newCards >= dailyCardLimitToLearn
    ) {
        return <CongratsWindow dailyCardLimitToLearn={dailyCardLimitToLearn} />;
    }

    return (
        <Card
            category={categoryName}
            question={card.card!.question}
            shortAnswer={card.card!.shortAnswer}
            detailedAnswer={card.card!.detailedAnswer}
            options={card.card!.options}
            acceptButtonLabel="Я уже знаю эту карточку"
            declineButtonLabel="Начать учить карточку"
            onAccept={() => card.onEndLearn(auth.user.id, card.card!.id)}
            onDecline={() => card.onStartLearn(auth.user.id, card.card!.id)}
        />
    );
});
