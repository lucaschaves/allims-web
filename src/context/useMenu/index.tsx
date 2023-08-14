import { postApi } from "@/services";
import { formatModules } from "@/utils";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface IEvent {
    open?: string;
}

export interface IItem {
    title: string;
    icon: string;
    path: string;
    parent: string;
    route: string;
    group: string;
    fav?: boolean;
    events?: IEvent;
}

interface IResponse {
    menu: IItem[];
    fav: string[];
}

interface IGetResponse {
    menu: IItem[];
    fav: IItem[];
    search: IItem[];
    all: IItem[];
}

interface MenuContextType {
    contextMenu: IItem[];
    contextFav: IItem[];
    contextSearch: IItem[];
    contextMenuAll: IItem[];
    loadingMenu: boolean;
    refreshMenu: () => Promise<void>;
    addMenuItems: (items: IItem[]) => void;
    getItemsTool: (path: string) => IItem[];
}

const MenuContext = createContext<MenuContextType>(null!);

const getMenu = async (): Promise<IGetResponse> => {
    try {
        const { success, data } = await postApi<IResponse>({
            url: "/safe/data",
            body: {
                self: {
                    route: "menu",
                    action: "list",
                },
            },
            config: {
                params: {
                    r: "menu",
                },
            },
        });
        if (success) {
            const all = formatModules<IItem>({
                items: data?.menu ?? [],
            });
            const menu = all.filter((f) => f.parent === "");
            const fav = all.filter((f) => data?.fav.includes(f.path));
            const search = all.filter((f) => f.parent === "");
            all.forEach((m) => {
                all.forEach((f) => {
                    if (f.parent === m.path) {
                        search.push({
                            ...f,
                            fav: data?.fav?.includes(f.path) ?? false,
                        });
                    }
                });
            });
            return {
                menu,
                fav,
                search,
                all,
            };
        }
        return {
            menu: [],
            fav: [],
            search: [],
            all: [],
        };
    } catch (err) {
        console.error("getMenu", err);
        return {
            menu: [],
            fav: [],
            search: [],
            all: [],
        };
    }
};

function MenuProvider({ children }: { children: React.ReactNode }) {
    const [contextMenu, setMenu] = useState<IItem[]>([]);
    const [contextSearch, setSearch] = useState<IItem[]>([]);
    const [contextFav, setFav] = useState<IItem[]>([]);
    const [contextMenuAll, setMenuAll] = useState<IItem[]>([]);
    const [loadingMenu, setLoading] = useState(false);

    const refreshMenu = async (): Promise<void> => {
        try {
            setLoading(true);
            const items = await getMenu();
            setMenu(items.menu);
            setFav(items.fav);
            setSearch(items.search);
            setMenuAll(items.all);
        } catch (err) {
            console.error("RefreshMenu", err);
            setMenu([]);
            setFav([]);
            setSearch([]);
            setMenuAll([]);
        } finally {
            setLoading(false);
        }
    };

    const addMenuItems = useCallback(
        (items: IItem[]) => {
            const mergeAll: IItem[] = contextMenuAll.concat(items);
            if (contextMenuAll.length !== mergeAll.length) {
                setMenuAll(mergeAll);
            }
        },
        [contextMenuAll]
    );

    const getItemsTool = useCallback(
        (path: string) => {
            const tools = contextMenuAll.filter((f) => f.parent === path);
            return tools;
        },
        [contextMenuAll]
    );

    useEffect(() => {
        refreshMenu();
    }, []);

    return (
        <MenuContext.Provider
            value={{
                contextMenu,
                contextFav,
                contextSearch,
                contextMenuAll,
                refreshMenu,
                addMenuItems,
                getItemsTool,
                loadingMenu,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

function useMenu() {
    return useContext(MenuContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { MenuProvider, getMenu, useMenu };
