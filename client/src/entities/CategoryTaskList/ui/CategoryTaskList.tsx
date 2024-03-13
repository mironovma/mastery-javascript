import { memo } from "react";

import { CategoryButton } from "@/shared/ui/custom/category-button";
import { CategoryToHeader, TypeToHref } from "@/shared/const/categories";
import { TaskCategory, TaskType } from "@/shared/types/tasks";

interface CategoryTaskListProps {
    className?: string;
    description: string;
    taskType: TaskType;
    taskCategory: TaskCategory;
}

export const CategoryTaskList = memo(
    ({
        className,
        description,
        taskType,
        taskCategory,
    }: CategoryTaskListProps) => {
        return (
            <li className={className}>
                <CategoryButton
                    header={CategoryToHeader[taskCategory]}
                    description={description}
                    href={`/${TypeToHref[taskType]}/${taskCategory}`}
                />
            </li>
        );
    }
);
