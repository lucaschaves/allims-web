import { Form } from "@/components";
import {
    CONSTANT_PATH,
    CONSTANT_THEME,
    CONSTANT_TYPE_ROUTER,
} from "@/constants";
import { RequireAuth } from "@/hooks";
import { Layout } from "@/layout";
import { Fallback, Logger, Login } from "@/pages";
import { MODULES_LOCAL } from "@/server";
import { Test } from "@/test";
import { createChildrensPath } from "@/utils";
import {
    RouteObject,
    createBrowserRouter,
    createMemoryRouter,
} from "react-router-dom";

async function loader(params?: any) {
    return {
        ...params,
    };
}

export function createPaths(arr: any[]): RouteObject[] {
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

export function appRoutes(mod: any[]) {
    const childrens = createChildrensPath(mod);
    const routesPath = createPaths(childrens);

    const theme = window.localStorage.getItem(CONSTANT_THEME) || "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    document.documentElement.dataset["theme"] = theme;

    const pathInit = window.sessionStorage.getItem(CONSTANT_PATH);
    const typeRouter =
        window.localStorage.getItem(CONSTANT_TYPE_ROUTER) || "memory";

    const childrensLocal = createChildrensPath(MODULES_LOCAL);
    const routesPathLocal = createPaths(childrensLocal);

    const arrRoutes = [
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
            children: [
                ...routesPathLocal,
                {
                    path: "logger/:id?",
                    loader,
                    errorElement: <div>Error</div>,
                    element: <Logger />,
                },
            ],
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
                    <Fallback />
                </RequireAuth>
            ),
        },
    ];

    if (typeRouter === "browser") {
        return createBrowserRouter(arrRoutes);
    } else {
        const propsRouter = pathInit
            ? {
                  initialEntries: [pathInit],
              }
            : {};
        return createMemoryRouter(arrRoutes, propsRouter);
    }
}
