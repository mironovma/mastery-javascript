import { TaskCategory, TaskType } from "../types/tasks";

export const TypeToHref: Record<TaskType, string> = {
    SingleAnswer: "cards",
    MultipleAnswer: "choose-one",
    TrueFalseAnswer: "true-or-false",
};

export const CategoryToHeader: Record<TaskCategory, string> = {
    JavaScript: "JavaScript",
    React: "React.js",
    General: "Общие вопросы",
    CssHtml: "HTML & CSS",
    TypeScript: "TypeScript",
};
