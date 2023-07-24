import { Header, Sidebar } from "@/components";
import { FAKER_MODULES } from "@/faker";
import { Accordion, Popover, Split } from "@/lib";
import { getDeviceType, joinClassName } from "@/utils";
import { MouseEvent, useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export interface ContextLayout {
    hasPin: boolean;
    togglePin: () => void;
}

interface IItem {
    title: string;
    path: string;
    icon?: string;
    module?: string;
}

export function Layout() {
    const isMobileAndPortrait =
        getDeviceType().device === "mobile" &&
        getDeviceType().orientation === "portrait";

    const navigate = useNavigate();

    const [openPopover, setOpenPopover] = useState<IItem>({} as IItem);
    const [openSplit, setOpenSplit] = useState(true);

    const [sidebarActive, setSidebarActive] = useState<IItem>({} as IItem);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarItems, setSidebarItems] = useState<IItem[]>(() =>
        FAKER_MODULES.filter((v) => v.module === "module")
    );

    const [toolbarActive, setToolbarActive] = useState<IItem>({} as IItem);
    const [isToolbarOpen, setToolbarOpen] = useState(false);
    const [toolbarItems, setToolbarItems] = useState<IItem[]>([]);

    const getToolbarItems = useCallback((path: string) => {
        const itemsTool = FAKER_MODULES.filter((v) => v.module === path);
        setToolbarItems(itemsTool);
    }, []);

    const getSidebarSubItems = useCallback((path: string) => {
        return FAKER_MODULES.filter((v) => v.module === path);
    }, []);

    const handleSidebarItem = useCallback(
        (event: MouseEvent<HTMLButtonElement>, item: IItem) => {
            setSidebarActive(item);
            getToolbarItems(item.path);
            setOpenPopover({} as IItem);
            setSidebarOpen(false);
            navigate(item.path);
        },
        [getToolbarItems, navigate]
    );

    const handleToolbarItem = useCallback(
        (event: MouseEvent<HTMLButtonElement>, item: IItem) => {
            setToolbarActive(item);
            setOpenSplit(!openSplit);
            setToolbarOpen(false);
        },
        [openSplit]
    );

    const handlePopover = useCallback(
        (event: MouseEvent<HTMLButtonElement>, item: IItem) => {
            if (getSidebarSubItems(item.path).length) {
                setOpenPopover(item);
            } else {
                handleSidebarItem(event, item);
            }
        },
        [getSidebarSubItems, handleSidebarItem]
    );

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
            <Header
                openRight={isToolbarOpen}
                openLeft={isSidebarOpen}
                toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                toggleToolbar={() => setToolbarOpen(!isToolbarOpen)}
            />
            <div className="w-full h-full flex relative">
                <Sidebar.Container
                    open={isSidebarOpen}
                    toggle={() => setSidebarOpen(!isSidebarOpen)}
                >
                    <Sidebar.Btn
                        title="Module"
                        disabled
                        onClick={(i) => ({})}
                        open={isSidebarOpen}
                        iconLeft="TbPointFilled"
                    />
                    {sidebarItems.map((mod, ind) =>
                        isSidebarOpen ? (
                            <Accordion
                                key={mod?.title ?? ind}
                                icon={isSidebarOpen}
                                content={
                                    <>
                                        {getSidebarSubItems(mod.path)?.map(
                                            (v: IItem, i: number) => (
                                                <div
                                                    className="w-full"
                                                    key={v?.title ?? i}
                                                >
                                                    <Sidebar.Btn
                                                        title={v.title}
                                                        onClick={(e) =>
                                                            handleSidebarItem(
                                                                e,
                                                                v
                                                            )
                                                        }
                                                        open={isSidebarOpen}
                                                        active={
                                                            sidebarActive?.title ===
                                                            v.title
                                                        }
                                                        iconLeft={v.icon}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </>
                                }
                            >
                                <Sidebar.Btn
                                    title={mod.title}
                                    onClick={(e) => handleSidebarItem(e, mod)}
                                    open
                                    active={sidebarActive?.title === mod.title}
                                    iconLeft={mod.icon}
                                    iconRight={
                                        getSidebarSubItems(mod.path)?.length
                                            ? "FiChevronDown"
                                            : ""
                                    }
                                />
                            </Accordion>
                        ) : (
                            <Popover
                                key={mod?.title ?? ind}
                                open={openPopover?.title === mod.title}
                                onClose={() => setOpenPopover({} as IItem)}
                                content={
                                    <div
                                        className={joinClassName(
                                            "flex-col",
                                            "w-80",
                                            "p-2",
                                            "rounded"
                                        )}
                                    >
                                        {getSidebarSubItems(
                                            openPopover?.path
                                        )?.map((v: IItem, i: number) => (
                                            <div
                                                className="w-full"
                                                key={v?.title ?? i}
                                            >
                                                <Sidebar.Btn
                                                    title={v.title}
                                                    onClick={(e) =>
                                                        handleSidebarItem(e, v)
                                                    }
                                                    open
                                                    active={
                                                        sidebarActive?.title ===
                                                        v.title
                                                    }
                                                    iconLeft={v.icon}
                                                    invert
                                                />
                                            </div>
                                        ))}
                                    </div>
                                }
                            >
                                <Sidebar.Btn
                                    title={mod.title}
                                    onClick={(e) => handlePopover(e, mod)}
                                    open={isSidebarOpen}
                                    active={sidebarActive?.title === mod.title}
                                    iconLeft={mod.icon}
                                />
                            </Popover>
                        )
                    )}
                </Sidebar.Container>
                <Split
                    direction={isMobileAndPortrait ? "col" : "row"}
                    hasButton={getDeviceType().device !== "desktop"}
                    childrenLeft={
                        <div className="w-full">
                            <Outlet />
                        </div>
                    }
                    disabled
                    childrenRight={<div>right</div>}
                />
                {toolbarItems.length ? (
                    <Sidebar.Container
                        open={isToolbarOpen}
                        toggle={() => setToolbarOpen(!isToolbarOpen)}
                        direction="right"
                    >
                        {toolbarItems.map((mod, ind) => (
                            <Sidebar.Btn
                                key={mod?.title ?? ind}
                                title={mod.title}
                                onClick={(e) => handleToolbarItem(e, mod)}
                                open={isToolbarOpen}
                                active={toolbarActive?.title === mod.title}
                                iconLeft={mod.icon}
                            />
                        ))}
                    </Sidebar.Container>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
