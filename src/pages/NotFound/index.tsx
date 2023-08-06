import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    const handleReload = useCallback(() => {
        navigate("/", { replace: true });
    }, [navigate]);

    return (
        <main className="h-screen w-screen bg-slate-200 p-10 flex flex-col gap-2">
            <h1>Nada foi encontrado</h1>
            <button type="button" onClick={handleReload}>
                Voltar
            </button>
        </main>
    );
}
