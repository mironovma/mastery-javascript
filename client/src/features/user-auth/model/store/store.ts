import { makeAutoObservable } from "mobx";
import axios from "axios";

import { User } from "@/features/user-auth";
import $api from "@/shared/api/api";

import { AuthResponse } from "../types";

export class AuthUserStore {
    user = {} as User;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Синхронный action
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    // Синхронный action
    setUser(user: User) {
        this.user = user;
    }

    // Синхронный action
    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    // Асинхронный action на авторизацию
    async login(email: string, password: string) {
        this.setIsLoading(true);
        try {
            const response = await $api.post<AuthResponse>("/login", {
                email,
                password,
            });
            console.log(response);
            // В localStorage записываем access токен.
            // Далее в инстансе при запросах будет цеплять этот токен в Headers
            // См. $api
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);

            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Асинхронный action на регистрацию
    async registration(email: string, password: string, username: string) {
        this.setIsLoading(true);
        try {
            const response = await $api.post<AuthResponse>("/registration", {
                email,
                password,
                username,
            });
            console.log(response);

            // В localStorage записываем access токен. Далее в инстансе при запросах будет цеплять этот токен в Headers
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);

            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Асинхронный action для деаутентификации
    async logout() {
        this.setIsLoading(true);
        try {
            await $api.post("/logout");

            // Удаляем токен
            localStorage.removeItem("token");

            // Ставим флажок, что пользователь НЕ авторизован
            this.setAuth(false);

            // Очищаем данные о пользователе из стора
            this.setUser({} as User);
        } catch (error) {
            console.log(error);

            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Проверяем: авторизован ли пользователь
    async checkAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(
                `${_API_URL_}/refresh`,
                // Используем withCredetials, чтобы сразу отправлять куки с запросом
                { withCredentials: true },
            );
            console.log(response);

            // В localStorage записываем access токен. Далее в инстансе при запросах будет цеплять этот токен в Headers
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
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
