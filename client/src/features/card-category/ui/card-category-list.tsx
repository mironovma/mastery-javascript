import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import { CardCategory } from "@/entities/card-category";

import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { SectionMenuHeader } from "@/shared/ui/custom/section-menu";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { useCategories } from "@/shared/hooks/useCategories";

export const CardCategoryList = observer(() => {
    const { category, auth } = useMobxStore();
    const { categoryList, setCategoryList } = useCategories();

    const onChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryList((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, isSelected: e.target.checked } : cat,
            ),
        );
    };

    const onSetUserCategories = () => {
        category.setUserCategories(auth.user.id, categoryList);
    };

    if (category.isLoading) {
        return (
            <>
                <Skeleton className="w-full h-16 mb-[2px]" />
                <Skeleton className="w-full h-16 mb-[2px]" />
                <Skeleton className="w-full h-16 mb-[2px]" />
            </>
        );
    }

    return (
        <>
            <SectionMenuHeader>
                Выберите категории для изучения
            </SectionMenuHeader>

            {categoryList.map((cat) => (
                <CardCategory
                    className="mb-[2px]"
                    key={cat.id}
                    name={cat.name}
                    isChecked={cat.isSelected ?? false}
                    description={cat.description}
                    onChange={onChange(cat.id)}
                />
            ))}

            <div className="flex justify-center">
                <Button
                    className="fixed bottom-4 w-1/2"
                    onClick={onSetUserCategories}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
});
