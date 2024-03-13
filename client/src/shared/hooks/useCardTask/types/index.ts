export interface Task {
    id: string;
    question: string;
    answerText?: string;
    answerOptions?: string[];
    answerBoolean?: boolean;
    hint?: string;
    categoryId: string;
    typeId: string;
}
