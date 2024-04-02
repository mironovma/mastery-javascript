import { useEffect } from "react";

import { CardCategory } from "@/entities/card-category";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { SectionMenuHeader } from "@/shared/ui/custom/section-menu";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

export const CardCategoriesList = observer(() => {
    const { category, auth } = useMobxStore();

    useEffect(() => {
        category.getUserCategories(auth.user.id);
    }, []);

    if (category.isLoading) {
        return <div>skeleton</div>;
    }

    return (
        <>
            <SectionMenuHeader
                onClick={() => {
                    // для теста
                    console.log(toJS(category.userCategories));
                }}
            >
                Выберите категории для изучения
            </SectionMenuHeader>

            {category.categories.map((cat) => (
                <CardCategory
                    className="mb-[2px]"
                    key={cat.id}
                    name={cat.name}
                    isSelected={category.userCategories.some(
                        (userCat) => userCat.id === cat.id,
                    )}
                    description={cat.description}
                    // TODO: реализовать хендлер для обработки сохранения выбранных категорий (по нажатию на кнопку Сохранить (фиксированная внизу), будет срабатывать хендлер для сохранения)
                    onSelect={() => {}}
                />
            ))}
        </>
    );
});
