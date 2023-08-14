import { RouterProvider } from "react-router-dom";
import { useMenu } from "./context";
import { Fallback } from "./pages";
import { appRoutes } from "./routes";

const App = () => {
    const { contextMenuAll } = useMenu();

    const routerApp = appRoutes(contextMenuAll);

    return <RouterProvider router={routerApp} fallbackElement={<Fallback />} />;
};

export default App;
