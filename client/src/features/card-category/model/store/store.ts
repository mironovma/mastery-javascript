import { makeAutoObservable } from "mobx";

import $api from "@/shared/api/api";
import type { Category } from "@/shared/types/user-data";

export class CardCategoryStore {
    categories = [] as Category[];
    userCategories = [] as Category[];
    isLoading = false;
    successMessage: string | null = null;

    constructor() {
        makeAutoObservable(this);

        (async () => {
            await this.getCategories();
        })();
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setSuccessMessage(message: string | null) {
        this.successMessage = message;
    }

    setCategory(categories: Category[]) {
        this.categories = categories;
    }

    setUserCategory(userCategories: Category[]) {
        this.userCategories = userCategories;
    }

    async getCategories() {
        this.setIsLoading(true);
        try {
            const response = await $api.get<Category[]>("/categories");

            this.setCategory(response.data);
        } catch (error) {
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    async getUserCategories(userId: string) {
        this.setIsLoading(true);
        try {
            const response = await $api.get<Category[]>(
                `/categories/${userId}`,
            );

            this.setUserCategory(response.data);
        } catch (error) {
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    async setUserCategories(userId: string, categories: Category[]) {
        this.setIsLoading(true);
        this.setSuccessMessage(null);
        try {
            const response = await $api.post(`/categories/${userId}`, {
                categories,
            });

            this.setSuccessMessage(response.data.message as string);
        } catch (error) {
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }
}
