import { Card } from "./card";

export interface Category {
    id: string;
    name: string;
    description?: string;
    cards: Card[];

    isSelected?: boolean;
}
