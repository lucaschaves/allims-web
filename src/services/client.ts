import { CONSTANT_TOKEN } from "@/constants";
import { getAmbientURL } from "@/utils";
import axios from "axios";

const api = axios.create({
    baseURL: `${getAmbientURL()}/api`,
});

const TOKEN_TEST =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjhiYTU3Y2MtNjIxMy00YTA4LTk5OGUtNTNiNjk0YjgyMzA4IiwiaWF0IjoxNjg3OTU4NjI4LCJleHAiOjE2ODgwNDUwMjh9.DS3ag1AUyk3bAHqBGiBq2pX6wQS2I6C1cnCTozFiCpI";

api.interceptors.request.use(async (config) => {
    const token = TOKEN_TEST || window.sessionStorage.getItem(CONSTANT_TOKEN);
    if (token) {
        config.headers.Authorization = token;
        config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
});

export default api;
