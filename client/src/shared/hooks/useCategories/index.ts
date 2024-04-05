import { useState, useEffect } from "react";

import type { Category } from "@/shared/types/user-data";

import { useMobxStore } from "../useMobxStore";

export const useUserData = () => {
    const { auth, settings, category } = useMobxStore();

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [userCategories, setUserCategories] = useState<Category[]>([]);
    const [dailyCards, setDailyCards] = useState<number | undefined>();

    useEffect(() => {
        category.getUserCategories(auth.user.id);
        settings.getUserSettings(auth.user.id);
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

        setUserCategories(category.userCategories);
        setDailyCards(settings.userSettings?.[0].settings.dailyCards);
    }, [category.categories, category.userCategories]);

    return {
        userData: { email: auth.user.email, username: auth.user.username },
        dailyCards,
        categoryList,
        userCategories,
        setCategoryList,
    };
};
