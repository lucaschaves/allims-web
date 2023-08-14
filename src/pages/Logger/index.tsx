import { CONSTANT_LOGGER } from "@/constants";
import { ILogger } from "@/hooks";
import { joinClassName } from "@/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export function Logger() {
    const [list, setList] = useState<ILogger[]>([]);

    const getLogger = async () => {
        let logs = [];
        try {
            const logger = window.localStorage.getItem(CONSTANT_LOGGER) ?? "[]";
            logs = JSON.parse(logger) ?? [];
        } catch (err) {
            logs = [];
        }
        setList(logs);
    };

    useEffect(() => {
        getLogger();
    }, []);

    return (
        <main
            className={joinClassName(
                "w-full",
                "px-2",
                "rounded",
                "bg-white",
                "dark:bg-slate-900",
                "dark:text-slate-200"
            )}
        >
            <ul
                className={joinClassName(
                    "w-full",
                    "h-full",
                    "px-1",
                    "flex",
                    "flex-col",
                    "gap-2",
                    "animate-show",
                    "bg-slate-200",
                    "dark:bg-slate-950",
                    "dark:text-slate-200",
                    "overflow-auto",
                    "max-h-[92vh]"
                )}
            >
                <li
                    className={joinClassName(
                        "w-full",
                        "grid",
                        "grid-cols-[50px_100px_150px_minmax(200px,_1fr)]",
                        "gap-3",
                        "sticky",
                        "top-0",
                        "bg-slate-200",
                        "dark:bg-slate-950"
                    )}
                >
                    <span className="text-center p-2">ID</span>
                    <span className="text-center p-2">Tipo</span>
                    <span className="text-center p-2">Data</span>
                    <p className="text-left p-2">Mensagem</p>
                </li>
                {list.map((item) => (
                    <li
                        key={item.id}
                        className={joinClassName(
                            "w-full",
                            "grid",
                            "grid-cols-[50px_100px_150px_minmax(200px,_1fr)]",
                            "gap-3"
                        )}
                    >
                        <span className="text-center p-2">{item.id}</span>
                        <span className="text-center p-2">{item.type}</span>
                        <span className="text-center p-2">
                            {format(new Date(item.time), "dd/MM/yyyy HH:mm:ss")}
                        </span>
                        <p className="text-left p-2">{item.message}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
