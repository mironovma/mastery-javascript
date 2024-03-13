import { memo } from "react";
import { useParams } from "react-router-dom";

import { SingleCardTaskList } from "@/features/get-cards";
import { TaskCategory } from "@/shared/types/tasks";
import { CategoryToHeader } from "@/shared/const/categories";

const CardsCategoryPage = () => {
    let { id } = useParams<{ id: string }>();

    return (
        <div className="my-4">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-balance">
                    {CategoryToHeader[id as TaskCategory]}
                </h1>
                <h2 className="mt-4 text-lg font-semibold break-words text-muted-foreground">
                    Проверь свои знания с рандомными карточками
                </h2>
            </div>

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
