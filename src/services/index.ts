import axios, { AxiosRequestConfig } from "axios";
import api from "./client";

interface IGetProps {
    url: string;
    config?: AxiosRequestConfig;
}

interface IPostProps {
    url: string;
    body?: object;
    config?: AxiosRequestConfig;
}

interface IResponse {
    success: boolean;
    data: any;
    message?: string;
}

const headersDefault = {
    headers: {
        Accept: "application/json",
    },
};

export const getApi = async (props: IGetProps) => {
    const { url, config = {} } = props;
    try {
        const {
            data: { data, success },
            status,
        } = await api.get<IResponse>(url, {
            ...headersDefault,
            ...config,
        });

        return {
            data,
            status,
            success,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("error message: ", err.message);
            return {
                message: err.message,
                success: false,
            };
        } else {
            console.error("unexpected get error: ", err);
            return {
                message: "An unexpected error occurred",
                success: false,
            };
        }
    }
};

export const postApi = async (props: IPostProps) => {
    const { url, body = {}, config = {} } = props;
    try {
        return {
            success: true,
            status: 200,
            data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTUxMTA2NDgtNzlmMC00MzE2LWI2NDUtMDczOTJkYWNhZmNkIiwiaWF0IjoxNjg3ODg1MTU2LCJleHAiOjE2ODc5NzE1NTZ9.7LNr6jgBae_aMlpJhezW3v7WSUDw3L60JAQPDQI7Xt8",
                route: "/",
            },
        };
        const {
            data: { data, success },
            status,
        } = await api.post(url, body, {
            ...headersDefault,
            ...config,
        });
        return {
            data,
            status,
            success,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("error post message: ", err.message);
            return {
                message: err.message,
                success: false,
            };
        } else {
            console.error("unexpected post error: ", err);
            return {
                message: "An unexpected error occurred",
                success: false,
            };
        }
    }
};
