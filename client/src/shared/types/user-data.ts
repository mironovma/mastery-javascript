import { Card } from "./card";

export interface Category {
    id: string;
    name: string;
    description?: string;
    cards: Card[];

    isSelected?: boolean;
}

export interface UserSettings {
    id: string;
    settings: {
        dailyCards: number;
    };
    userId: string;
}
