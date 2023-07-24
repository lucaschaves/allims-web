import { useAuth } from "@/context";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const handleSignin = useCallback(() => {
        signin(
            {
                login: "analista",
                password: "123456",
            },
            () => {
                navigate("/module", { replace: true });
            }
        );
    }, [navigate, signin]);

    return (
        <main className="h-screen w-screen bg-slate-200 p-10 flex gap-2">
            Screen Login
            <button type="button" onClick={handleSignin}>
                Login
            </button>
        </main>
    );
}
