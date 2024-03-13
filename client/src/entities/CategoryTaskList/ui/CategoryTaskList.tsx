import { memo } from "react";

import type { CategoryList } from "@/shared/types/categories";
import { CategoryButton } from "@/shared/ui/custom/category-button";
import { CategoryToHeader, TypeToHref } from "@/shared/const/categories";

export const CategoryTaskList = memo(
    ({
        className,
        description,
        taskType,
        taskCategory,
    }: CategoryList & { className?: string }) => {
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
