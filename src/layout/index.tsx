import { Header, Sidebar } from "@/components";
import { CONSTANT_PATH } from "@/constants";
import { IItem, useMenu } from "@/context";
import { useDragInDrop } from "@/hooks";
import { Accordion, Icon, Input, List, Popover } from "@/lib";
import { postApi } from "@/services";
import { joinClassName } from "@/utils";
import React, {
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export interface ContextLayout {
    hasPin: boolean;
    togglePin: () => void;
}

interface IRenderSidebarProps {
    items: IItem[];
    open: boolean;
    isFav?: boolean;
    search?: string;
    searchItems?: IItem[];
    loading?: boolean;
    onClick: (event: MouseEvent, item: IItem) => void;
}

const RenderSidebar = ({
    items,
    open,
    search,
    isFav = false,
    searchItems,
    loading = false,
    onClick,
}: IRenderSidebarProps) => {
    const { contextFav, refreshMenu } = useMenu();
    const { itemsDragInDrop, dragAndDrop, addItemsDragInDrop, ...restDrop } =
        useDragInDrop({
            defaultItems: items,
        });

    const [openPopover, setOpenPopover] = useState<IItem>({} as IItem);
    const arrPath = location.pathname.split("/").filter((f) => !!f);

    const getSidebarSubItems = useCallback(
        (path: string) => {
            const subIt = searchItems?.filter((s) => s?.parent === path) ?? [];
            if (search) {
                return subIt.filter((f) => f.path.includes(search));
            }
            return subIt;
        },
        [search, searchItems]
    );

    const getFilterItems = useCallback(() => {
        if (search) {
            const filItems = searchItems
                ?.filter((f) => !!f.parent.length)
                ?.filter((f) => f?.path?.includes(search));
            return filItems ?? [];
        }
        return items;
    }, [items, search, searchItems]);

    const handlePopover = useCallback(
        (event: MouseEvent<HTMLButtonElement>, item: IItem) => {
            if (item.path === "star") {
                setOpenPopover(item);
            } else if (getSidebarSubItems(item.path).length) {
                setOpenPopover(item);
            } else {
                onClick(event, item);
            }
        },
        [getSidebarSubItems, onClick]
    );

    const handleClick = useCallback(
        async (event: MouseEvent, item: IItem, fav?: boolean) => {
            if (fav) {
                event.preventDefault();
                event.stopPropagation();
                setOpenPopover({} as IItem);
                const isFav = contextFav.find((f) => f.path === item.path);
                const newFav = contextFav;
                let fav = [];
                if (isFav) {
                    fav = newFav
                        .filter((f) => f.path !== item.path)
                        .map((f) => f.path);
                } else {
                    newFav.push(item);
                    fav = newFav.map((f) => f.path);
                }
                await postApi({
                    // url: "/safe/engine/fav",
                    url: "/safe/data",
                    body: {
                        self: {
                            tagId: "",
                            module: "",
                            route: "fav",
                            action: "edit",
                            formData: fav,
                        },
                    },
                    config: {
                        params: {
                            v: 2,
                        },
                    },
                });

                await refreshMenu();
            } else {
                setOpenPopover({} as IItem);
                onClick(event, item);
            }
        },
        [contextFav, onClick, refreshMenu]
    );

    useEffect(() => {
        addItemsDragInDrop(items);
    }, [items]);

    if (isFav) {
        return (
            <React.Fragment>
                {items.map((mod, ind) =>
                    ind <= 2 ? (
                        <Sidebar.Btn
                            title={mod.title}
                            key={mod?.title ?? ind}
                            onClick={(e) => handleClick(e, mod)}
                            open={open}
                            active={!!arrPath.find((a) => a === mod.path)}
                            iconLeft={mod.icon}
                        />
                    ) : ind === 3 ? (
                        <Popover
                            key={mod?.title ?? ind}
                            open={openPopover?.title === "star"}
                            onClose={() => setOpenPopover({} as IItem)}
                            content={
                                <List.Container className="p-2">
                                    <List.Nav>
                                        {itemsDragInDrop?.map(
                                            (v: IItem, i: number) => (
                                                <React.Fragment
                                                    key={v?.title ?? i}
                                                >
                                                    <List.Item
                                                        id={v.title}
                                                        onClick={(
                                                            e: MouseEvent
                                                        ) => handleClick(e, v)}
                                                        data-position={i}
                                                        draggable
                                                        {...restDrop}
                                                        className={
                                                            dragAndDrop &&
                                                            dragAndDrop.draggedTo ===
                                                                Number(i)
                                                                ? "allims-drop-area"
                                                                : ""
                                                        }
                                                    >
                                                        <List.ItemPrefix>
                                                            <Icon
                                                                name={v.icon}
                                                            />
                                                        </List.ItemPrefix>
                                                        <label
                                                            htmlFor={v.title}
                                                            className="cursor-pointer"
                                                        >
                                                            {v.title}
                                                        </label>
                                                    </List.Item>
                                                    {i === 2 ? (
                                                        <List.Divider />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </List.Nav>
                                </List.Container>
                            }
                        >
                            <Sidebar.Btn
                                key={ind}
                                title="Todos os favoritos"
                                open={open}
                                iconLeft="AiFillStar"
                                onClick={(e) =>
                                    handlePopover(e, {
                                        path: "star",
                                        route: "",
                                        title: "star",
                                        icon: "",
                                        group: "",
                                        parent: "",
                                    })
                                }
                            />
                        </Popover>
                    ) : (
                        <React.Fragment key={mod.title}></React.Fragment>
                    )
                )}
            </React.Fragment>
        );
    }

    return (
        <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden py-1 gap-0.5">
            {loading ? (
                <>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Sidebar.Skeleton key={i} />
                    ))}
                </>
            ) : (
                getFilterItems().map((mod: IItem, ind) => {
                    let firstGroup = "";
                    if (search)
                        return (
                            <Sidebar.Btn
                                key={mod?.title ?? ind}
                                title={mod.title}
                                subTitle={mod?.parent}
                                onClick={(e) => handleClick(e, mod)}
                                open
                                active={
                                    !!arrPath.find(
                                        (a) =>
                                            a === mod.path &&
                                            !!mod.parent.length
                                    )
                                }
                                iconLeft={mod.icon}
                                iconStar={
                                    mod?.parent
                                        ? mod?.fav
                                            ? "AiFillStar"
                                            : "FiStar"
                                        : ""
                                }
                                onClickFav={(e) => handleClick(e, mod, true)}
                            />
                        );
                    if (open) {
                        return (
                            <Accordion
                                id={mod.path}
                                key={mod?.title ?? ind}
                                icon
                                content={
                                    <>
                                        {getSidebarSubItems(mod.path)?.map(
                                            (v: IItem, i: number) => {
                                                const isGroup =
                                                    firstGroup !== v.group &&
                                                    v.group !== "" &&
                                                    v.group !== mod.title;
                                                if (isGroup) {
                                                    firstGroup = v.group;
                                                }
                                                return (
                                                    <React.Fragment
                                                        key={v?.title ?? i}
                                                    >
                                                        {isGroup ? (
                                                            <div className="w-full">
                                                                <Sidebar.Btn
                                                                    title={
                                                                        v.group
                                                                    }
                                                                    open
                                                                    disabled
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <div className="w-full">
                                                            <Sidebar.Btn
                                                                title={v.title}
                                                                onClick={(e) =>
                                                                    handleClick(
                                                                        e,
                                                                        v
                                                                    )
                                                                }
                                                                open
                                                                active={
                                                                    !!arrPath.find(
                                                                        (a) =>
                                                                            a ===
                                                                            v.path
                                                                    )
                                                                }
                                                                iconLeft={
                                                                    v.icon
                                                                }
                                                                iconStar={
                                                                    v.fav
                                                                        ? "AiFillStar"
                                                                        : "FiStar"
                                                                }
                                                                onClickFav={(
                                                                    e
                                                                ) =>
                                                                    handleClick(
                                                                        e,
                                                                        v,
                                                                        true
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            }
                                        )}
                                    </>
                                }
                            >
                                <Sidebar.Btn
                                    title={mod.title}
                                    onClick={(e) => handleClick(e, mod)}
                                    open={open}
                                    active={
                                        !!arrPath.find(
                                            (a) =>
                                                a === mod.path &&
                                                !!mod.parent.length
                                        )
                                    }
                                    iconLeft={mod.icon}
                                    iconRight={
                                        getSidebarSubItems(mod.path)?.length
                                            ? "FiChevronDown"
                                            : ""
                                    }
                                />
                            </Accordion>
                        );
                    }
                    return (
                        <Popover
                            key={mod?.title ?? ind}
                            open={openPopover?.title === mod.title}
                            onClose={() => setOpenPopover({} as IItem)}
                            content={
                                <List.Container className="p-2">
                                    <List.Nav>
                                        {getSidebarSubItems(
                                            openPopover?.path
                                        )?.map((v: IItem, i: number) => {
                                            const isGroup =
                                                firstGroup !== v.group &&
                                                v.group !== "" &&
                                                v.group !== mod.title;
                                            if (isGroup) {
                                                firstGroup = v.group;
                                            }
                                            return (
                                                <>
                                                    {isGroup ? (
                                                        <div
                                                            className="w-full"
                                                            key={v?.group ?? i}
                                                        >
                                                            <Sidebar.Btn
                                                                title={v.group}
                                                                open
                                                                disabled
                                                            />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}

                                                    <List.Item
                                                        key={v?.title ?? i}
                                                        id={v.title}
                                                        onClick={(
                                                            e: MouseEvent
                                                        ) => handleClick(e, v)}
                                                    >
                                                        <List.ItemPrefix>
                                                            <Icon
                                                                name={v.icon}
                                                            />
                                                        </List.ItemPrefix>
                                                        <label
                                                            htmlFor={v.title}
                                                            className="cursor-pointer"
                                                        >
                                                            {v.title}
                                                        </label>
                                                    </List.Item>
                                                </>
                                            );
                                        })}
                                    </List.Nav>
                                </List.Container>
                            }
                        >
                            <Sidebar.Btn
                                title={mod.title}
                                onClick={(e) => handlePopover(e, mod)}
                                open={open}
                                active={
                                    !!arrPath.find(
                                        (a) =>
                                            a === mod.path &&
                                            !!mod.parent.length
                                    )
                                }
                                iconLeft={mod.icon}
                            />
                        </Popover>
                    );
                })
            )}
        </div>
    );
};

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { loadingMenu, contextMenu, contextFav, contextSearch } = useMenu();

    const refInputSearch = useRef<HTMLInputElement>(null);
    const [isSidebarOpen, setSidebarOpen] = useState("");
    const [isToolbarOpen, setToolbarOpen] = useState("");
    const [search, setSearch] = useState("");

    const arrPath = location.pathname.split("/").filter((f) => !!f);
    const lastForm = arrPath[arrPath.length - 1];

    const handleSidebarItem = useCallback(
        (_: MouseEvent, item: IItem) => {
            setSidebarOpen("");
            navigate(item.route);
            setSearch("");
            window.sessionStorage.setItem(CONSTANT_PATH, item.route);
        },
        [navigate]
    );

    const toggleToolbar = useCallback(
        (r?: string) => {
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
        setSearch("");

        setTimeout(() => {
            refInputSearch.current?.focus();
        }, 500);
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
                "bg-gray-300",
                "dark:bg-slate-900"
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
                    <Sidebar.Btn
                        title="Menu"
                        iconLeft="FiMenu"
                        open={openSidebarLeft}
                        onClick={() => toggleSidebar()}
                    />

                    <RenderSidebar
                        items={contextFav}
                        open={openSidebarLeft}
                        onClick={handleSidebarItem}
                        isFav
                    />

                    {openSidebarLeft ? (
                        <div
                            className={joinClassName(
                                "relative",
                                "flex",
                                "items-center",
                                "gap-2",
                                "transition",
                                "transition-width",
                                "h-12",
                                "min-h-[3rem]",
                                "w-full",
                                "rounded-lg",
                                "justify-start",
                                "pl-6"
                            )}
                        >
                            <Icon name="FiSearch" />
                            <Input
                                ref={refInputSearch}
                                placeholder="Pesquisar opções de menu..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                variant="text"
                            />
                        </div>
                    ) : (
                        <Sidebar.Btn
                            title="Pesquisar"
                            iconLeft="FiSearch"
                            open={openSidebarLeft}
                            onClick={() => toggleSidebar()}
                        />
                    )}

                    <RenderSidebar
                        items={contextMenu}
                        open={openSidebarLeft}
                        onClick={handleSidebarItem}
                        search={search}
                        searchItems={contextSearch}
                        loading={loadingMenu}
                    />
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
