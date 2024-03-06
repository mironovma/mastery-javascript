import { TaskCategory, TaskType } from "@/shared/types/tasks";

export interface Task {
    id: string;
    question: string;
    answer: string;
    hint: string;

    category: TaskCategory;
    type: TaskType;
}
