import { logger } from "@/hooks";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
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

const formatError = (message: string) => {
    try {
        console.error("error post message: ", message);
        toast.error(message);
        logger({ type: "error", message });
    } catch (err) {
        console.error("formatError: ", err);
    }
    return {
        message,
        data: null,
        success: false,
    };
};

export const getApi = async <T>(props: IGetProps) => {
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
            data: data as T,
            status,
            success,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return formatError(err.message);
        } else {
            const message = JSON.stringify(err);
            return formatError(message);
        }
    }
};

export const postApi = async <T>(props: IPostProps) => {
    const { url, body = {}, config = {} } = props;
    try {
        const {
            data: { data, success },
            status,
        } = await api.post<IResponse>(url, body, {
            ...headersDefault,
            ...config,
        });
        return {
            data: data as T,
            status,
            success,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return formatError(err.message);
        } else {
            const message = JSON.stringify(err);
            return formatError(message);
        }
    }
};
