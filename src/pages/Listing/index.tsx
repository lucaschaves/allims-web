import { getApi } from "@/services";
import { useCallback, useEffect, useState } from "react";

const dataMenuRight = {
    success: true,
    data: [
        {
            group: "main",
            title: "Filtros",
            icon: "FiBriefcase",
            route: "/analitico/gerenciamentoDeAmostras/filtros",
        },
        {
            group: "main",
            title: "Detalhes",
            icon: "FiBriefcase",
            route: "/analitico/gerenciamentoDeAmostras/detalhes",
        },
    ],
};

export function Listing() {
    // const { hasPin, togglePin } = useOutletContext<ContextLayout>();

    const [open, setOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [moduleItems, setModuleItems] = useState<any[]>([]);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [menuActive, setMenuActive] = useState<any>({});
    const [moduleActive, setModuleActive] = useState({
        title: "Home",
        icon: "FiHome",
    });

    const getMenu = useCallback(async () => {
        const { success, data } = await getApi({
            url: "/safe/engine/menu?v=2",
        });
        if (success) {
            const moduleItemsFilter = data
                .filter((it: { route?: string }) => !!it?.route)
                .filter((it: { group: string }) => it.group === "main");
            setModuleItems(moduleItemsFilter);
        }
        setLoadingScreen(false);
    }, []);

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

    useEffect(() => {
        setLoadingScreen(true);
        getMenu();
    }, [getMenu]);

    return <div>Liasting</div>;

    // return (
    //     <Split.Container open={open} hasPin={false}>
    //         <Split.PanelLeft>
    //             <Sidebar.Container
    //                 open={openSidebar}
    //                 toggle={() => setOpenSidebar(!openSidebar)}
    //             >
    //                 <Sidebar.ContainerNav>
    //                     {loadingScreen && <Sidebar.LoadingItems />}
    //                     {moduleItems.map((mod, ind) => (
    //                         <Sidebar.Button
    //                             key={ind}
    //                             title={mod.title}
    //                             onClick={(i) => setMenuActive(i)}
    //                             open={false}
    //                             active={!!menuActive?.title === mod.title}
    //                             iconLeft={mod.icon}
    //                             openRight
    //                         />
    //                     ))}
    //                 </Sidebar.ContainerNav>
    //             </Sidebar.Container>
    //             <div className="flex gap-5 h-full w-full ">
    //                 <button
    //                     onClick={() => setOpen(!open)}
    //                     className="h-10 w-32 bg-red-400"
    //                 >
    //                     open
    //                 </button>
    //             </div>
    //         </Split.PanelLeft>
    //         <Split.PanelRight>
    //             <Sidebar.Container
    //                 open={openSidebar}
    //                 toggle={() => setOpenSidebar(!openSidebar)}
    //                 // direction={false ? "left" : "right"}
    //             >
    //                 <Sidebar.ContainerNav>
    //                     {loadingScreen && <Sidebar.LoadingItems />}
    //                     {moduleItems.map((mod, ind) => (
    //                         <Sidebar.Button
    //                             key={ind}
    //                             title={mod.title}
    //                             onClick={(i) => setMenuActive(i)}
    //                             open={false}
    //                             active={!!menuActive?.title === mod.title}
    //                             iconLeft={mod.icon}
    //                             openRight
    //                         />
    //                     ))}
    //                 </Sidebar.ContainerNav>
    //             </Sidebar.Container>
    //             {open ? (
    //                 <button
    //                     // onClick={togglePin}
    //                     className="h-10 w-32 bg-blue-400"
    //                 >
    //                     pin
    //                 </button>
    //             ) : (
    //                 <></>
    //             )}
    //         </Split.PanelRight>
    //     </Split.Container>
    // );
}
