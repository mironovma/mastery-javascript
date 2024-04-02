import { Card } from "@/entities/card";

export interface Category {
    id: string;
    name: string;
    description?: string;
    cards: Card[];
}
