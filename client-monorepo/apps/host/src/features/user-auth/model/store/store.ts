import { makeAutoObservable } from "mobx";
import axios from "axios";

import { User } from "@/features/user-auth";
import $api, { API_URL } from "@/shared/api/api";

import { AuthResponse } from "../types";

type ResetPasswordState = "idle" | "confirmCode" | "awaitingNewPassword";

export class AuthUserStore {
    user = {} as User;
    isAuth = false;
    isLoading = false;
    successMessage: string | null = null;
    error: any | null = null;

    // Восстановление пароля
    resetPasswordEmail = "";
    resetPasswordState: ResetPasswordState = "idle";

    constructor() {
        makeAutoObservable(this);
    }

    // Синхронный action
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: User) {
        this.user = user;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setSuccessMessage(message: string | null) {
        this.successMessage = message;
    }

    setError(error: unknown) {
        this.error = error;
    }

    // Восстановление пароля
    setResetPasswordEmail(email: string) {
        this.resetPasswordEmail = email;
    }

    setResetPasswordState(state: ResetPasswordState) {
        this.resetPasswordState = state;
    }

    // Асинхронный action на авторизацию
    async login(email: string, password: string) {
        this.setIsLoading(true);
        this.setError(null);
        try {
            const response = await $api.post<AuthResponse>("/login", {
                email,
                password,
            });
            // В localStorage записываем access токен.
            // Далее в инстансе при запросах будет цеплять этот токен в Headers
            // См. $api
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
        } catch (error) {
            this.setError(error);
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
        this.setError(null);
        try {
            const response = await $api.post<AuthResponse>("/registration", {
                email,
                password,
                username,
            });

            // В localStorage записываем access токен. Далее в инстансе при запросах будет цеплять этот токен в Headers
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
        } catch (error) {
            this.setError(error);
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
                `${API_URL}/refresh`,
                // Используем withCredetials, чтобы сразу отправлять куки с запросом
                { withCredentials: true },
            );

            // В localStorage записываем access токен. Далее в инстансе при запросах будет цеплять этот токен в Headers
            localStorage.setItem("token", response.data.accessToken);

            // Ставим флажок, что пользователь авторизован
            this.setAuth(true);

            // Передаем данные о пользователе в стор
            this.setUser(response.data.user);
        } catch (error) {
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Отправляем код для восстановления пароля
    // Сохраняем email в стейт
    async forgotPasswordSendCode(email: string) {
        this.setIsLoading(true);
        this.setError(null);
        this.setSuccessMessage(null);
        try {
            this.setResetPasswordEmail(email);
            const response = await $api.post("/forgot-password/send-code", {
                email,
            });

            this.setSuccessMessage(response.data.message as string);
            this.setResetPasswordState("confirmCode");
            return response.data;
        } catch (error) {
            this.setError(error);
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Отправляем код на проверку
    async forgotPasswordConfirmCode(email: string, code: string) {
        this.setIsLoading(true);
        this.setError(null);
        this.setSuccessMessage(null);
        try {
            const response = await $api.post("/forgot-password/check-code", {
                email,
                code,
            });

            this.setSuccessMessage(response.data.message as string);
            this.setResetPasswordState("awaitingNewPassword");
            return response.data;
        } catch (error) {
            this.setError(error);
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }

    // Устанавливаем новый пароль
    async forgotPasswordSetPassword(email: string, password: string) {
        this.setIsLoading(true);
        this.setError(null);
        this.setSuccessMessage(null);
        try {
            const response = await $api.post(
                "/forgot-password/set-new-password",
                {
                    email,
                    password,
                },
            );

            this.setSuccessMessage(response.data.message as string);
        } catch (error) {
            this.setError(error);
            return {
                error,
            };
        } finally {
            this.setIsLoading(false);
        }
    }
}
