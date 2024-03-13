import { memo } from "react";
import { useQuery } from "react-query";

import { CategoryTaskList } from "@/entities/CategoryTaskList";
import { fetchTaskCategories } from "@/entities/CategoryTaskList/api";

import { CardInfo } from "@/shared/ui/custom/card-info";
import { PageHeader } from "@/shared/ui/custom/page-header";
import { Skeleton } from "@/shared/ui/skeleton";

const CardsPage = () => {
    const { data: categories, isLoading } = useQuery(
        "categories",
        fetchTaskCategories
    );

    return (
        <div className="my-4">
            <PageHeader
                className="my-4"
                header="Карточки Q/A"
                description="Заимпрувь свой скилл в JavaScript, React, Computer Science и
                не только, изучая и повторяя карточки с вопросами."
            />

            <CardInfo
                description="Новые вопросы и задания ежедневно пополняются благодаря
                нашему сообществу. Стань частью нашего сообщества и
                вноси свои предложения!"
            />

            <div className="my-4">
                <h3 className="text-2xl font-semibold text-balance">
                    Категории
                </h3>

                {isLoading && (
                    <div className="my-4">
                        <Skeleton className="w-full h-32 mt-3" />
                        <Skeleton className="w-full h-32 mt-3" />
                        <Skeleton className="w-full h-32 mt-3" />
                    </div>
                )}

                <ul className="my-4">
                    {categories && categories.length > 0 ? (
                        categories.map(({ category, description, id }) => (
                            <CategoryTaskList
                                key={id}
                                description={description}
                                taskCategory={category}
                                taskType="SingleAnswer"
                                className="mt-3"
                            />
                        ))
                    ) : (
                        <li>Категории не найдены</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default memo(CardsPage);
