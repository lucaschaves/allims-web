import { Form } from "@/components";
import { FAKER_MODULES } from "@/faker";
import { RequireAuth } from "@/hooks";
import { Layout } from "@/layout";
import { Login } from "@/pages";
import { createChildrensPath } from "@/utils";
import { createMemoryRouter } from "react-router-dom";

{
    /* <Route
        path={rot}
        loader={() => {
            console.log("loading");
            return "";
        }}
        errorElement={<div>Error</div>}
        id
        index
        action
        hasErrorBoundary
        shouldRevalidate
        children
        caseSensitive
        lazy
        handle
        element={<Form name={rot} />}
        Component
        ErrorBoundary
    /> */
}

async function loader({ params }: any) {
    console.log("loader", params);

    return {
        data: [{ id: 1 }],
        success: true,
    };
}

function createPaths(arr: any[]): any {
    return arr.map((a) => {
        if (a.children) {
            return {
                ...a,
                loader: loader,
                errorElement: <div>Error</div>,
                element: <Form name={a.title} />,
                children: createPaths(a.children),
            };
        }
        return {
            ...a,
            loader: loader,
            errorElement: <div>Error</div>,
            element: <Form name={a.title} />,
        };
    });
}

export function appRoutes() {
    const childrensFake = createChildrensPath(FAKER_MODULES);
    const routesPath = createPaths(childrensFake);
    const routes = createMemoryRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: (
                <RequireAuth>
                    <Layout />
                </RequireAuth>
            ),
            children: routesPath,
        },
        {
            path: "*",
            element: <div>Error</div>,
        },
    ]);

    return routes;
}
