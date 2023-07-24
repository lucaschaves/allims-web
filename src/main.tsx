import { appRoutes } from "@/routes";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
        <RouterProvider router={appRoutes()} />
    </AuthProvider>
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//     <MemoryRouter>
//         <AuthProvider>
//             <AppRoutes />
//         </AuthProvider>
//     </MemoryRouter>
// );
