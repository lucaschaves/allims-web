import { RequireAuth } from "@/hooks";
import { Layout } from "@/layout";
import { Listing, Login } from "@/pages";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            >
                <Route path="/" element={<Listing />} />
            </Route>
        </Routes>
    );
}
