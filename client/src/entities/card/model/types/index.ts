export interface Card {
    id: string;
    question: string;
    shortAnswer: string;
    detailedAnswer: string;
    options: string[];
    categoryId: string;
    // category:
    // userCards: []
}
