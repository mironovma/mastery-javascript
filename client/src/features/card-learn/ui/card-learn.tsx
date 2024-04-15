import { observer } from "mobx-react-lite";

import { CongratsWindow } from "@/widgets/congrats-window";
import { Card } from "@/entities/card";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Skeleton } from "@/shared/ui/skeleton";

export const CardLearn = observer(() => {
    const { auth, card, category, settings, statistic } = useMobxStore();

    const isLoading =
        settings.isLoading ||
        card.isLoading ||
        statistic.isLoading ||
        category.isLoading;

    if (isLoading) {
        return <Skeleton className="w-full h-card" />;
    }

    const { dailyCards } = settings.userSettings?.[0].settings ?? {};

    if (
        dailyCards !== undefined &&
        statistic.statisticToday?.newCards !== undefined &&
        statistic.statisticToday.newCards >= dailyCards
    ) {
        return (
            <CongratsWindow
                description="выучили"
                cardsAmount={statistic.statisticToday.newCards}
            />
        );
    }

    if (!card.card) {
        return (
            <Skeleton className="w-full h-card flex justify-center items-center">
                <p className="text-center w-4/5">
                    Все карточки для изучения закончились 😞 Ожидайте, когда
                    комьюнити добавит новые карточки. А сейчас попробуйте
                    повторить уже изученные 😃
                </p>
            </Skeleton>
        );
    }

    const categoryItem = category.userCategories.find(
        (cat) => cat.id === card.card?.categoryId,
    );

    if (!categoryItem) {
        return (
            <Skeleton className="w-full h-card">
                <p className="text-center w-4/5">
                    Категория не была найдена или нет выбранных категорий для
                    изучения 😞
                </p>
            </Skeleton>
        );
    }

    const categoryName = categoryItem.name;

    return (
        <Card
            category={categoryName}
            question={card.card.question}
            shortAnswer={card.card.shortAnswer}
            detailedAnswer={card.card.detailedAnswer}
            options={card.card.options}
            acceptButtonLabel="Я уже знаю эту карточку"
            declineButtonLabel="Начать учить карточку"
            onAccept={() => card.onEndLearn(auth.user.id, card.card!.id)}
            onDecline={() => card.onStartLearn(auth.user.id, card.card!.id)}
        />
    );
});
