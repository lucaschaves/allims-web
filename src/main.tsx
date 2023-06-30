import { AuthProvider } from "@/context";
import { AppRoutes } from "@/routes";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <MemoryRouter>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </MemoryRouter>
);
