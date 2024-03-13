import { memo } from "react";
import { useParams } from "react-router-dom";

import { SingleCardTaskList } from "@/features/get-cards";
import { TaskCategory } from "@/shared/types/tasks";
import { CategoryToHeader } from "@/shared/const/categories";
import { PageHeader } from "@/shared/ui/custom/page-header";

const CardsCategoryPage = () => {
    let { id } = useParams<{ id: string }>();

    return (
        <div className="my-4">
            <PageHeader
                className="mb-4"
                header={CategoryToHeader[id as TaskCategory]}
                description="Проверь свои знания с рандомными карточками"
            />

            <div className="flex justify-center items-center">
                <SingleCardTaskList
                    className="w-full"
                    category={id as TaskCategory}
                    type="SingleAnswer"
                    limit={10}
                />
            </div>

            <h2 className="mt-4 text-lg font-semibold break-words text-muted-foreground">
                Или выбери карточки по категориям
            </h2>

            <div className="mt-4">{/* <CategoryButton  /> */}</div>
        </div>
    );
};

export default memo(CardsCategoryPage);
