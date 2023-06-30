import { Header, Sidebar } from "@/components";
import { getApi } from "@/services";
import { joinClassName } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const dataMenu = {
    success: true,
    data: [
        {
            tagId: "perfil",
            group: "footer",
            title: "Perfil",
            acronym: null,
            icon: "FiUser",
            route: "/app/perfil",
            disabled: false,
        },
        {
            tagId: "suporte",
            group: "footer",
            title: "Suporte",
            acronym: null,
            icon: "MdOutlineSupportAgent",
            route: "/app/suporte",
            disabled: false,
        },
        {
            tagId: "ajuda",
            group: "footer",
            title: "Ajuda",
            acronym: null,
            icon: "FiHelpCircle",
            route: "/app/ajuda",
            disabled: false,
        },
        {
            tagId: "configuracoes",
            group: "footer",
            title: "Configurações",
            acronym: "Config",
            icon: "FiSettings",
            route: "",
            disabled: true,
        },
        {
            tagId: "aPI",
            group: "footer",
            title: "API",
            acronym: null,
            icon: "FiBook",
            route: "",
            disabled: true,
        },
        {
            tagId: "comercial",
            group: "main",
            title: "Comercial",
            acronym: null,
            icon: "FiBriefcase",
            route: "",
            disabled: true,
        },
        {
            tagId: "agenda",
            group: "main",
            title: "Agenda",
            acronym: null,
            icon: "FiCalendar",
            route: "",
            disabled: true,
        },
        {
            tagId: "recepcao",
            group: "main",
            title: "Recepção",
            acronym: null,
            icon: "FiInbox",
            route: "/module/recepcao/ordensDeServico",
            disabled: false,
        },
        {
            tagId: "analitico",
            group: "main",
            title: "Analítico",
            acronym: null,
            icon: "ImLab",
            route: "/module/analitico/gerenciamentoDeAmostras",
            disabled: false,
        },
        {
            tagId: "publicacao",
            group: "main",
            title: "Publicação",
            acronym: null,
            icon: "FiPenTool",
            route: "",
            disabled: true,
        },
        {
            tagId: "almoxarifado",
            group: "main",
            title: "Almoxarifado",
            acronym: null,
            icon: "FiArchive",
            route: "/module/almoxarifado/lotes",
            disabled: false,
        },
        {
            tagId: "qualidade",
            group: "main",
            title: "Qualidade",
            acronym: null,
            icon: "FiAward",
            route: "",
            disabled: true,
        },
        {
            tagId: "faturamento",
            group: "main",
            title: "Faturamento",
            acronym: null,
            icon: "FiDollarSign",
            route: "",
            disabled: true,
        },
        {
            tagId: "labOnline",
            group: "main",
            title: "LabOnline",
            acronym: null,
            icon: "FiGlobe",
            route: "/module/labOnline/amostras",
            disabled: false,
        },
        {
            tagId: "gerencial",
            group: "main",
            title: "Gerencial",
            acronym: null,
            icon: "FiPieChart",
            route: "",
            disabled: true,
        },
    ],
};

export interface ContextLayout {
    hasPin: boolean;
    togglePin: () => void;
}

export function Layout() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [hasPin, setPin] = useState(false);
    const [moduleItems, setModuleItems] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [moduleActive, setModuleActive] = useState({
        title: "Home",
        icon: "FiHome",
    });
    const [menuActive, setMenuActive] = useState<any>({});

    const handleModule = useCallback(
        async (item: any) => {
            if (item.title !== moduleActive.title) {
                setLoadingItems(true);
            }
            const { success, data } = await getApi({
                url: `/safe/engine/menu?tagId=${item.tagId}&v=2`,
            });
            if (success) {
                setMenuItems(data);
                setModuleActive(item);
                setMenuActive({});
            }
            setLoadingItems(false);
        },
        [moduleActive.title]
    );

    const getMenu = useCallback(async () => {
        const { success, data } = await getApi({
            url: "/safe/engine/menu?v=2",
        });
        if (success) {
            const moduleItemsFilter = data;
            // .filter((it: { route?: string }) => !!it?.route)
            // .filter((it: { group: string }) => it.group === "main");
            setModuleItems(moduleItemsFilter);
        }
        setLoadingScreen(false);
    }, []);

    const togglePin = useCallback(() => {
        setOpenSidebar(false);
        setPin(!hasPin);
    }, [hasPin]);

    useEffect(() => {
        setLoadingScreen(true);
        getMenu();
    }, [getMenu]);

    return (
        <div
            className={joinClassName(
                "flex",
                "flex-col",
                "gap-1",
                "h-screen",
                "w-screen",
                "bg-gray-300"
            )}
        >
            <Header toggle={() => setOpenSidebar(!openSidebar)} />
            <div className={joinClassName("flex", "gap-1", "h-full", "w-full")}>
                <Sidebar.Container
                    open={openSidebar}
                    toggle={() => setOpenSidebar(!openSidebar)}
                    disabled={hasPin}
                >
                    <Sidebar.ContainerNav>
                        {loadingScreen && <Sidebar.LoadingItems />}
                        {moduleItems.map((mod, ind) => (
                            <Sidebar.ContainerExpandItem
                                key={ind}
                                items={menuItems}
                                onClick={(i) => setMenuActive(i)}
                                onOpen={() => handleModule(mod)}
                                item={mod}
                                subItem={menuActive}
                                id={String(ind)}
                                loading={loadingItems}
                            />
                        ))}
                    </Sidebar.ContainerNav>
                </Sidebar.Container>
                <Outlet
                    context={{
                        togglePin,
                        hasPin,
                    }}
                />
            </div>
        </div>
    );
}
