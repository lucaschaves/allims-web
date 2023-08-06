import { Header, Sidebar } from "@/components";
import { Accordion, Icon, List, Popover } from "@/lib";
import { FAKER_MODULES } from "@/server";
import { joinClassName } from "@/utils";
import { MouseEvent, useCallback, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export interface ContextLayout {
    hasPin: boolean;
    togglePin: () => void;
}

interface IItem {
    title: string;
    path: string;
    icon?: string;
    module?: string;
    route: string;
}

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const [openPopover, setOpenPopover] = useState<IItem>({} as IItem);
    const [isSidebarOpen, setSidebarOpen] = useState("");
    const [sidebarItems] = useState<IItem[]>(() =>
        FAKER_MODULES.filter((v) => v.parent === "")
    );
    const [isToolbarOpen, setToolbarOpen] = useState("");

    const arrPath = location.pathname.split("/").filter((f) => !!f);
    const lastForm = arrPath[arrPath.length - 1];

    const getSidebarSubItems = useCallback((path: string) => {
        return FAKER_MODULES.filter((v) => v.parent === path);
    }, []);

    const handleSidebarItem = useCallback(
        (_: MouseEvent<HTMLButtonElement>, item: IItem) => {
            setOpenPopover({} as IItem);
            setSidebarOpen("");
            navigate(item.route);
        },
        [navigate]
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

    const toggleToolbar = useCallback(
        (r?: string) => {
            console.log("tool", r, lastForm);
            if (r) {
                setToolbarOpen((prev) => (prev === r ? "" : r));
            } else {
                setToolbarOpen((prev) => (prev === lastForm ? "" : lastForm));
            }
        },
        [lastForm]
    );

    const toggleSidebar = useCallback((_?: string) => {
        setSidebarOpen((prev) => (prev.length ? "" : "true"));
    }, []);

    const openSidebarLeft = !!isSidebarOpen;

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
                openRight={isToolbarOpen === lastForm}
                openLeft={openSidebarLeft}
                toggleSidebar={toggleSidebar}
                toggleToolbar={toggleToolbar}
            />
            <div className="w-full h-full flex relative">
                <Sidebar.Container
                    open={openSidebarLeft}
                    toggle={() => toggleSidebar()}
                >
                    {sidebarItems.map((mod, ind) =>
                        openSidebarLeft ? (
                            <Accordion
                                key={mod?.title ?? ind}
                                icon
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
                                                        open
                                                        active={
                                                            !!arrPath.find(
                                                                (a) =>
                                                                    a === v.path
                                                            )
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
                                    active={
                                        !!arrPath.find((a) => a === mod.path)
                                    }
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
                                    <List.Container className="p-2">
                                        <List.Nav>
                                            {getSidebarSubItems(
                                                openPopover?.path
                                            )?.map((v: IItem, i: number) => (
                                                <List.Item
                                                    key={v?.title ?? i}
                                                    id={v.title}
                                                    onClick={(e: any) =>
                                                        handleSidebarItem(e, v)
                                                    }
                                                >
                                                    <List.ItemPrefix>
                                                        <Icon name={v.icon} />
                                                    </List.ItemPrefix>
                                                    <label
                                                        htmlFor={v.title}
                                                        className="cursor-pointer"
                                                    >
                                                        {v.title}
                                                    </label>
                                                </List.Item>
                                            ))}
                                        </List.Nav>
                                    </List.Container>
                                }
                            >
                                <Sidebar.Btn
                                    title={mod.title}
                                    onClick={(e) => handlePopover(e, mod)}
                                    open={openSidebarLeft}
                                    active={
                                        !!arrPath.find((a) => a === mod.path)
                                    }
                                    iconLeft={mod.icon}
                                />
                            </Popover>
                        )
                    )}
                </Sidebar.Container>
                <Outlet
                    context={{
                        openToolbar: isToolbarOpen,
                        toggleToolbar,
                        openSidebar: isSidebarOpen,
                        toggleSidebar,
                    }}
                />
            </div>
        </div>
    );
}
