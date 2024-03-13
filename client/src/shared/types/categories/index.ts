import { TaskType, TaskCategory } from "../tasks";

export interface CategoryList {
    description: string;
    taskType: TaskType;
    taskCategory: TaskCategory;
}
