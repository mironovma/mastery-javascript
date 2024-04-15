import { useState } from "react";
import { observer } from "mobx-react-lite";

import { CongratsWindow } from "@/widgets/congrats-window";
import { Card } from "@/entities/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

export const CardRepeat = observer(() => {
    const { auth, category, cardsToRepeat, statistic } = useMobxStore();
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    const isLoading =
        cardsToRepeat.isLoading || category.isLoading || auth.isLoading;
    const cards = cardsToRepeat.cardsToRepeat ?? [];

    if (isLoading) {
        return <Skeleton className="w-full h-card" />;
    }

    if (!cards.length || currentCardIndex >= cards.length) {
        return (
            <CongratsWindow
                description="повторили"
                cardsAmount={statistic.statisticToday?.repeatedCards ?? 0}
            />
        );
    }

    const currentCard = cards[currentCardIndex];
    const categoryItem = category.userCategories.find(
        (cat) =>
            cat.id ===
            cardsToRepeat.cardsToRepeat?.[currentCardIndex].categoryId,
    );
    const categoryName = categoryItem
        ? categoryItem.name
        : "Category not found";

    const handleCardAction = (remebered: boolean) => {
        setCurrentCardIndex((prev) => prev + 1);
        if (remebered) {
            cardsToRepeat.onEndRepeat(auth.user.id, currentCard.id);
        } else {
            cardsToRepeat.onRepeat(currentCard);
        }
    };

    if (!categoryItem) {
        return (
            <CongratsWindow
                description="повторили"
                cardsAmount={statistic.statisticToday!.repeatedCards}
            />
        );
    }

    return (
        <Card
            category={categoryName}
            question={currentCard.question}
            shortAnswer={currentCard.shortAnswer}
            detailedAnswer={currentCard.detailedAnswer}
            options={currentCard.options}
            acceptButtonLabel="Запомнил"
            declineButtonLabel="Забыл ответ"
            onAccept={() => handleCardAction(true)}
            onDecline={() => handleCardAction(false)}
        />
    );
});
