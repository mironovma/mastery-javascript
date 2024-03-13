import $api from "@/shared/api/api";
import { Category } from "../mode/types";

export const fetchTaskCategories = async () => {
    const response = await $api.get<Category[]>("/tasks-category");
    return response.data;
};
