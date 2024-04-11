export interface Card {
    id: string;
    categoryId: string;
    question: string;
    shortAnswer: string;
    detailedAnswer?: string;
    options?: Array<{ answer: string; isTrue: boolean }>;
}
