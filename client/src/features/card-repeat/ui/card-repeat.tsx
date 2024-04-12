import { useState } from "react";
import { observer } from "mobx-react-lite";

import { CongratsWindow } from "@/widgets/congrats-window";
import { Card } from "@/entities/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

export const CardRepeat = observer(() => {
    const { auth, category, cardsToRepeat, statistic } = useMobxStore();

    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    if (cardsToRepeat.isLoading || category.isLoading || auth.isLoading) {
        return <Skeleton className="w-full h-card" />;
    }

    if (
        !cardsToRepeat.cardsToRepeat ||
        cardsToRepeat.cardsToRepeat.length === 0 ||
        currentCardIndex >= cardsToRepeat.cardsToRepeat.length
    ) {
        return (
            <CongratsWindow
                description="повторили"
                cardsAmount={statistic.statisticToday!.repeatedCards}
            />
        );
    }

    let categoryItem;

    if (cardsToRepeat.cardsToRepeat.length) {
        categoryItem = category.userCategories.find(
            (cat) =>
                cat.id ===
                cardsToRepeat.cardsToRepeat?.[currentCardIndex].categoryId,
        );
    }

    if (!categoryItem) {
        return (
            <CongratsWindow
                description="повторили"
                cardsAmount={statistic.statisticToday!.repeatedCards}
            />
        );
    }

    const categoryName = categoryItem.name;

    /**
     * TODO: в ассепт и деклайн сетить новый индекс (проверять по условию с длиной массива)
     * и вызывать action mobx если понишь ответ и если не помнишь
     * Если помнишь, то просто идем далее по индексу массива и на сервер отправляем инфо когда след повторение + кол-во повторений (когда след повторение - зависит от количества уже выполненных повторений)
     * если не помнишь, то самое простое и топорное - пушим этот же элемент в сторе и сетим новый индекс, а в след раз, если помнишь ответ, то идем по пути см. выше
     */

    return (
        <Card
            category={categoryName}
            question={cardsToRepeat.cardsToRepeat[currentCardIndex].question}
            shortAnswer={
                cardsToRepeat.cardsToRepeat[currentCardIndex].shortAnswer
            }
            detailedAnswer={
                cardsToRepeat.cardsToRepeat[currentCardIndex].detailedAnswer
            }
            options={cardsToRepeat.cardsToRepeat[currentCardIndex].options}
            acceptButtonLabel="Запомнил"
            declineButtonLabel="Забыл ответ"
            onAccept={() => {
                setCurrentCardIndex((prev) => prev + 1);
                cardsToRepeat.onEndRepeat(
                    auth.user.id,
                    cardsToRepeat.cardsToRepeat![currentCardIndex].id,
                );
            }}
            onDecline={() => {
                setCurrentCardIndex((prev) => prev + 1);
                cardsToRepeat.onRepeat(
                    cardsToRepeat.cardsToRepeat![currentCardIndex],
                );
            }}
        />
    );
});
