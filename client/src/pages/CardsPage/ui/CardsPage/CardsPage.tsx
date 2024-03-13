import { memo } from "react";
import { useQuery } from "react-query";
import { InfoIcon } from "lucide-react";

import { CategoryTaskList } from "@/entities/CategoryTaskList";
import { fetchTaskCategories } from "@/entities/CategoryTaskList/api";

import { Card, CardContent, CardDescription } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

const CardsPage = () => {
    const { data: categories, isLoading } = useQuery(
        "categories",
        fetchTaskCategories
    );

    return (
        <div className="my-4">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-balance">
                    Карточки Q/A
                </h1>
                <h2 className="mt-4 text-lg font-semibold break-words text-muted-foreground">
                    Заимпрувь свой скилл в JavaScript, React, Computer Science и
                    не только, изучая и повторяя карточки с вопросами.
                </h2>
            </div>

            <Card>
                <CardContent className="p-3">
                    <CardDescription className="flex items-center gap-2">
                        <InfoIcon size={24} />
                        Новые вопросы и задания ежедневно пополняются благодаря
                        нашему сообществу. Стань частью нашего сообщества и
                        вноси свои предложения!
                    </CardDescription>
                </CardContent>
            </Card>

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
