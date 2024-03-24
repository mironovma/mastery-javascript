import axios from "axios";

import { AuthResponse } from "@/features/user-auth";

const $api = axios.create({
    withCredentials: true,
    baseURL: _API_URL_,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get<AuthResponse>(
                    `${_API_URL_}/refresh`,
                    {
                        withCredentials: true,
                    },
                );

                localStorage.setItem("token", response.data.accessToken);

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return await $api.request(originalRequest);
            } catch (error) {
                // TODO: Все серверные ошибки выводить в нотификациях с помощью sooner
                console.log("Auth error ", error);
            }
        }

        throw error;
    },
);

export default $api;
