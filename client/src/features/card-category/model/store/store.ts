import { makeAutoObservable } from "mobx";

import { Category } from "../types";

import $api from "@/shared/api/api";

export class CardCategoryStore {
    categories = [] as Category[];
    userCategories = [] as Category[];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);

        (async () => {
            await this.getCategories();
        })();
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
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
            console.log(error);

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
            console.log(error);

            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }
}
