import { Form } from "@/components";
import { RequireAuth } from "@/hooks";
import { Layout } from "@/layout";
import { Login, NotFound } from "@/pages";
import { FAKER_MODULES, MODULES_LOCAL } from "@/server";
import { Test } from "@/test";
import { createChildrensPath } from "@/utils";
import { RouteObject, createBrowserRouter } from "react-router-dom";

async function loader(params?: any) {
    return {
        ...params,
    };
}

function createPaths(arr: any[]): RouteObject[] {
    return arr.map((a) => {
        if (a.children) {
            return {
                ...a,
                path: `${a.path}/:id?`,
                loader,
                errorElement: <div>Error</div>,
                element:
                    a.parent === "" ? null : (
                        <Form name={a.title} route={a.path} />
                    ),
                children: createPaths(a.children),
            };
        }
        return {
            ...a,
            path: `${a.path}/:id?`,
            loader,
            errorElement: <div>Error</div>,
            element:
                a.parent === "" ? null : <Form name={a.title} route={a.path} />,
        };
    });
}

export function appRoutes() {
    const childrensFake = createChildrensPath(FAKER_MODULES);
    const routesPath = createPaths(childrensFake);

    const childrensLocal = createChildrensPath(MODULES_LOCAL);
    const routesPathLocal = createPaths(childrensLocal);

    // const routes = createMemoryRouter(
    const routes = createBrowserRouter(
        [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/test",
                element: <Test />,
            },
            {
                path: "/app",
                element: (
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                ),
                children: routesPathLocal,
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
                element: (
                    <RequireAuth>
                        <NotFound />
                    </RequireAuth>
                ),
            },
        ],
        {
            // initialEntries: ["/module/analitico/gerenciamentoDeAmostras"],
        }
    );

    return routes;
}
