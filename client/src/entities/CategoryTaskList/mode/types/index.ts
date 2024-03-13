import { TaskCategory } from "@/shared/types/tasks";

export interface Category {
    id: string;
    category: TaskCategory;
    description: string;
    href: TaskCategory;
}
