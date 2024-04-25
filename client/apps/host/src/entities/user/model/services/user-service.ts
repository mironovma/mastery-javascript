import { AxiosResponse } from "axios";

import $api from "@/shared/api/api";

interface User {
    id: string;
    email: string;
    isActivated: boolean;
}

/**
 * Сервис для получения данных о пользователе/пользователях
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserService {
    // Функция для получения списка всех пользователей
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return await $api.get<User[]>("/users");
    }
}
