import axios from "axios";

export const __API_URL__ = "http://localhost:5000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: __API_URL__,
});

export default $api;
