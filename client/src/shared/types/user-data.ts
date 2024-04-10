import { Card } from "./card";

export interface Category {
    id: string;
    name: string;
    description?: string;
    cards: Card[];

    isSelected?: boolean;
}

export interface Settings {
    dailyCards: number;
}

export interface UserSettings {
    id: string;
    settings: Settings;
    userId: string;
}
