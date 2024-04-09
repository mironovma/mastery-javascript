import { observer } from "mobx-react-lite";

import { CongratsWindow } from "@/widgets/congrats-window";
import { Card } from "@/entities/card";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Skeleton } from "@/shared/ui/skeleton";

export const CardLearn = observer(() => {
    const { card, category, settings, statistic } = useMobxStore();

    if (settings.isLoading || card.isLoading || statistic.isLoading) {
        return <Skeleton className="w-full h-card" />;
    }

    const dailyCardLimitToLearn =
        settings.userSettings?.[0].settings.dailyCards;

    const categoryName = category.userCategories.filter(
        (cat) => cat.id === card.card?.categoryId,
    )[0].name;

    if (
        dailyCardLimitToLearn &&
        statistic.statisticToday?.newCards &&
        dailyCardLimitToLearn >= statistic.statisticToday?.newCards
    ) {
        return <CongratsWindow dailyCardLimitToLearn={dailyCardLimitToLearn} />;
    }

    if (card.card) {
        return (
            <Card
                category={categoryName}
                question={card.card.question}
                shortAnswer={card.card.shortAnswer}
                detailedAnswer={card.card.detailedAnswer}
                options={card.card.options}
                acceptButtonLabel="Я уже знаю эту карточку"
                declineButtonLabel="Начать учить карточку"
                onAccept={() => {}}
                onDecline={() => {}}
            />
        );
    }

    return <div>error</div>;
});
