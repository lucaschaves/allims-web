import { Loading } from "@/lib";
import { joinClassName } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Fallback = () => {
    const navigate = useNavigate();

    const handleReload = useCallback(() => {
        navigate("/", { replace: true });
    }, [navigate]);

    return (
        <div
            className={joinClassName(
                "w-screen",
                "h-screen",
                "dark:text-white",
                "dark:bg-slate-950",
                "bg-gray-200",
                "text-black",
                "flex",
                "flex-col",
                "gap-2",
                "items-center",
                "justify-around"
            )}
        >
            <span className="animate-pulse">
                Estamos buscando as inforações...
            </span>

            <Loading size="xl" />

            <button
                type="button"
                onClick={handleReload}
                className="rounded text-white bg-slate-400 dark:bg-slate-800 px-5 py-3 hover:bg-slate-500 dark:hover:bg-slate-700"
            >
                Recarregar
            </button>
        </div>
    );
};
