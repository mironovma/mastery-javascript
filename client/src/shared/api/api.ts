import axios from "axios";

import { AuthResponse } from "@/features/user-auth";

// TODO: вынести в глобальную переменную env + в вебпаке + global d ts
export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    // Настройка, чтобы к каждому запросу куки цеплялись автоматически
    withCredentials: true,
    // Базовый url по которому будем обращаться при каждом запросе с помощью этого инстанса,
    // чтобы вручную каждый раз не писать полный путь http://localhost:5000/api
    baseURL: API_URL,
});

// Интерцептор на запрос
$api.interceptors.request.use((config) => {
    /**
     * Вешаем на каждый запрос заголовки Headers Authorization с access токеном.
     * access токен храним на клиенте в localStorage по ключу "token".
     */
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

// Интерцептор на ответ
$api.interceptors.response.use(
    /**
     * Функция response.use принимает 2 коллбека:
     * 1 - если запрос прошел успешно
     * 2 - если НЕ успешно
     */
    // 1- если успешно
    (config) => {
        return config;
    },
    // 2 - если НЕ успешно
    async (error) => {
        /**
         * Если запрос прошел НЕ успешно, ТО
         * 1 - сохраняем исходный запрос в переменную originalRequest
         * Она хранит в себе все данные для запроса (предыдущего)
         */
        const originalRequest = error.config;
        // 2 - убедились, что пришел 401 статус, что существует конфиг
        // и isRetry !== true, т.е. запрос повторно отправляется первый раз
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            // Поле о том, что запрос повторный уже делали, чтобы это все не зациклилось
            // Ставим в true. Если и повторный запрос будет с 401 статусом, то условие
            // !error.config._isRetry не выполнится и запросы перестанут отправляться (чтобы это все не зациклилось).
            originalRequest._isRetry = true;

            try {
                // Обновляем  пару токенов
                // Если пришел 401, то, скорее всего, умер access токен
                const response = await axios.get<AuthResponse>(
                    `${API_URL}/refresh`,
                    { withCredentials: true },
                );

                // Устанавливаем в localStorage access токен
                localStorage.setItem("token", response.data.accessToken);

                // 3 - снова пытаемся выполнить запрос повторно с исходными параметрами
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return await $api.request(originalRequest);
            } catch (error) {
                console.log("НЕ АВТОРИЗОВАН ", error);
            }
        }
        // Если if не отработал, то просто прокидываем ошибку.
        // Может быть ситуация, когда придет  не 401 статус
        throw error;
    },
);

export default $api;
