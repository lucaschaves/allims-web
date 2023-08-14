import { CONSTANT_LOGGER } from "@/constants";
import { lengthInUtf8Bytes } from "@/utils";

interface ILoggerProps {
    type?: "error" | "warn" | "info";
    message: string;
}

export interface ILogger {
    type: "error" | "warn" | "info";
    message: string;
    time: Date;
    id: number;
}

const logger = (props: ILoggerProps) => {
    const { type = "error", message } = props;
    let loggers: ILogger[] = [];
    const logLocal = window.localStorage.getItem(CONSTANT_LOGGER) ?? "[]";
    let id = 1;
    try {
        loggers = JSON.parse(logLocal);
        id = loggers[0].id + 1;
    } catch (err) {
        loggers = [];
    }
    const time = new Date();
    loggers.unshift({
        type,
        message,
        time,
        id,
    });
    const sizeMax = lengthInUtf8Bytes(logLocal);
    if (sizeMax.max) {
        const elemsToDelete = 20;
        loggers.splice(loggers.length - elemsToDelete, elemsToDelete);
    }
    window.localStorage.setItem(CONSTANT_LOGGER, JSON.stringify(loggers));
};

export { logger };
