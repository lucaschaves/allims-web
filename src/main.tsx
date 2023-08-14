import ReactDOM from "react-dom/client";
import { Theme, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { CONSTANT_THEME } from "./constants";
import { AuthProvider, MenuProvider } from "./context";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const theme = (window.localStorage.getItem(CONSTANT_THEME) as Theme) ?? "light";

root.render(
    <AuthProvider>
        <MenuProvider>
            <App />
        </MenuProvider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme={theme}
        />
    </AuthProvider>
);
