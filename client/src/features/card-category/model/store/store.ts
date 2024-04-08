import { makeAutoObservable, runInAction } from "mobx";

import $api from "@/shared/api/api";
import type { Category } from "@/shared/types/user-data";

export class CardCategoryStore {
    categories = [] as Category[];
    userCategories = [] as Category[];

    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getCategories();
    }

    async getCategories() {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await $api.get<Category[]>("/categories");

            runInAction(() => {
                this.categories = response.data;
            });
        } catch (error) {
            runInAction(() => {
                this.error = "Не удалось загрузить категории";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async getUserCategories(userId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await $api.get<Category[]>(
                `/categories/${userId}`,
            );

            runInAction(() => {
                this.userCategories = response.data;
            });
        } catch (error) {
            runInAction(() => {
                this.error = "Не удалось загрузить ваши категории";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    updateCategorySelection(categoryId: string, isSelected: boolean) {
        const categoryIndex = this.userCategories.findIndex(
            (cat) => cat.id === categoryId,
        );

        if (isSelected && categoryIndex === -1) {
            const category = this.categories.find(
                (cat) => cat.id === categoryId,
            );

            if (category) {
                this.userCategories.push(category);
            }
        }

        if (!isSelected && categoryIndex !== -1) {
            this.userCategories.splice(categoryIndex, 1);
        }
    }

    async saveUserCategories(userId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const categoriesToSave = this.categories.map((cat) => ({
                id: cat.id,
                isSelected: this.userCategories.some(
                    (userCat) => userCat.id === cat.id,
                ),
            }));

            await $api.post(`/categories/${userId}`, {
                categories: categoriesToSave,
            });
        } catch (error) {
            runInAction(() => {
                this.error = "Не удалось сохранить категории пользователя";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async initializeUserCategories(userId: string) {
        await this.getCategories();
        await this.getUserCategories(userId);
    }
}
