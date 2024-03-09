import axios from "axios";

export const __API_URL__ = "http://localhost:5000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: __API_URL__,
});

// TODO: Убрать искусственную задержку при запросе перед продом.

$api.interceptors.request.use((config) => {
    console.log("Запрос отправлен.");

    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(config);
        }, 1000)
    );
});

export default $api;
