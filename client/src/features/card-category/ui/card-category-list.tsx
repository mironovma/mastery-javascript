import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { CardCategory } from "@/entities/card-category";

import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { SectionMenuHeader } from "@/shared/ui/custom/section-menu";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export const CardCategoryList = observer(() => {
    const { category, auth } = useMobxStore();
    const navigate = useNavigate();

    const onChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
        category.updateCategorySelection(id, e.target.checked);
    };

    const onSaveUserCategories = () => {
        category.saveUserCategories(auth.user.id);
        navigate("/app");
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

            {category.categories.map((cat) => (
                <CardCategory
                    className="mb-[2px]"
                    key={cat.id}
                    name={cat.name}
                    isChecked={category.userCategories.some(
                        (userCat) => userCat.id === cat.id,
                    )}
                    description={cat.description}
                    onChange={onChange(cat.id)}
                />
            ))}

            <div className="flex justify-center">
                <Button
                    className="fixed bottom-4 w-1/2"
                    onClick={onSaveUserCategories}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
});
