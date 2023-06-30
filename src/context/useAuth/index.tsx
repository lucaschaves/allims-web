import { CONSTANT_TOKEN, CONSTANT_USER } from "@/constants";
import { postApi } from "@/services";
import { removeProperties } from "@/utils";
import { createContext, useCallback, useContext, useState } from "react";

interface IUser {
    login: string;
    password?: string;
}

interface IUserAuth {
    token: string;
    user: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUserAuth | null;
    signin: (props: IUser, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUserAuth | null>(() => {
        const auth = window.sessionStorage.getItem(CONSTANT_TOKEN);
        if (auth) {
            const userAuth = window.sessionStorage.getItem(CONSTANT_USER) || "";
            return {
                token: auth,
                ...JSON.parse(userAuth),
            };
        }
        return null;
    });

    const signin = useCallback(async (props: IUser, callback: VoidFunction) => {
        const { success, data } = await postApi({
            url: "/auth/login",
            body: {
                appName: "allims-web",
                dialect: "pt-BR",
                ...props,
            },
        });
        if (success) {
            setUser(data);
            window.sessionStorage.setItem(CONSTANT_TOKEN, data.token);
            window.sessionStorage.setItem(
                CONSTANT_USER,
                JSON.stringify(removeProperties(data, "token"))
            );
            callback();
        }
    }, []);

    const signout = useCallback((callback: VoidFunction) => {
        setUser(null);
        window.sessionStorage.clear();
        callback();
    }, []);

    const value = { user, signin, signout, isAuthenticated: !!user?.token };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
