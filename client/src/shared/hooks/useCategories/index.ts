import { useState, useEffect } from "react";

import type { Category } from "@/shared/types/category";

import { useMobxStore } from "../useMobxStore";
import { toJS } from "mobx";

export const useCategories = () => {
    const { category, auth } = useMobxStore();

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [userCategories, setUserCategories] = useState<Category[]>([]);

    useEffect(() => {
        category.getUserCategories(auth.user.id);
    }, [auth.user.id]);

    useEffect(() => {
        setCategoryList(
            category.categories.map((cat) => ({
                ...cat,
                isSelected: category.userCategories.some(
                    (userCat) => userCat.id === cat.id,
                ),
            })),
        );

        setUserCategories(toJS(category.userCategories));
    }, [category.categories, category.userCategories]);

    return {
        categoryList,
        userCategories,
        setCategoryList,
    };
};
