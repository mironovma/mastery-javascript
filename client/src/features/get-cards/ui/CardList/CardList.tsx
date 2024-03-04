import { useState, useTransition } from "react";

import { Card } from "../../model/types";
import { fetchCards } from "../../api";
import { Button } from "@/shared/ui/button";

export const CardList = () => {
    const [cards, setCards] = useState<Card[]>([]);

    const [isLoading, startTransition] = useTransition();

    const getAllCards = async () => {
        try {
            const response = await fetchCards();

            startTransition(() => {
                setCards(response.data);
            });
        } catch (error) {
            // TODO: notification handler for errors w/ toaster
            console.log(error);
        }
    };

    const clearAllCards = () => {
        setCards([]);
    };

    if (isLoading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div className="w-2/4">
            <div className="flex justify-between">
                <Button onClick={getAllCards}>Загрузить все карточки</Button>
                <Button variant="destructive" onClick={clearAllCards}>
                    Очистить
                </Button>
            </div>

            {!!cards.length && (
                <div>
                    <ul>
                        {cards.map((card) => (
                            <li key={card.id}>
                                <h5>{card.title}</h5>
                                <p>{card.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
