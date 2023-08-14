import { CONSTANT_THEME } from "@/constants";
import { useAuth, useMenu } from "@/context";
import {
    Avatar,
    Breadcrumb,
    Icon,
    IconButton,
    List,
    Popover,
    Tag,
    getMeta,
} from "@/lib";
import { MODULES_LOCAL } from "@/server";
import { joinClassName, removeDuplicateObjects } from "@/utils";
import { MouseEvent, useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface IHeaderProps {
    openRight: boolean;
    openLeft: boolean;
    toggleSidebar: () => void;
    toggleToolbar: () => void;
}

const Header = (props: IHeaderProps) => {
    const { contextMenuAll } = useMenu();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { signout } = useAuth();

    const theme = window.localStorage.getItem(CONSTANT_THEME) || "light";
    const metaEnvorimentTag = getMeta("envTag");
    const metaEnvorimentTagColor = getMeta("envColor") || "transparent";

    const [openNotify, setOpenNotify] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [openPopover, setOpenPopover] = useState<number>(-1);

    const activeRoute = pathname.split("/").slice(-1)[0];

    const breadcrumbPaths = useCallback(() => {
        const pathSplit = pathname.split("/").filter((f) => !!f);
        if (pathSplit.length && pathSplit[0] === "app") {
            const breads = pathSplit
                .filter((p) => !!MODULES_LOCAL.find((f) => f.path === p))
                .map((p) => MODULES_LOCAL.find((f) => f.path === p));
            return breads;
        }
        const breads = pathSplit
            .filter((p) => !!contextMenuAll.find((f) => f.path === p))
            .map((p) => {
                const findAll = contextMenuAll.find((f) => f.path === p) as any;
                if (findAll?.children) {
                    const newChild = removeDuplicateObjects(
                        findAll.children,
                        "path"
                    );
                    return {
                        ...findAll,
                        children: newChild,
                    };
                }
                return findAll;
            });
        return breads;
    }, [contextMenuAll, pathname]);

    // const handleSidebar = useCallback(() => {
    //     toggleSidebar();
    // }, [toggleSidebar]);

    // const handleToolbar = useCallback(() => {
    //     toggleToolbar();
    // }, [toggleToolbar]);

    const handleSingout = useCallback(() => {
        signout(() => {
            navigate("/");
        });
    }, [navigate, signout]);

    const handleSidebarItem = useCallback(
        (_: MouseEvent<HTMLButtonElement>, item: any) => {
            setOpenPopover(-1);
            navigate(item.route);
        },
        [navigate]
    );

    const toggleFullScreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement?.requestFullscreen();
        } else {
            document?.exitFullscreen();
        }
        setOpenUser(false);
    }, []);

    const toggleTheme = useCallback(() => {
        const theme = window.localStorage.getItem(CONSTANT_THEME);
        window.localStorage.setItem(
            CONSTANT_THEME,
            theme === "dark" ? "light" : "dark"
        );
        location.reload();
    }, []);

    const handleNavigate = useCallback(
        (path: string) => {
            navigate(path);
            setOpenUser(false);
        },
        [navigate]
    );

    return (
        <header
            className={joinClassName(
                "w-full",
                "h-16",
                "min-h-[4rem]",
                "bg-gray-200",
                "dark:text-white",
                "dark:bg-slate-950/20",
                "text-base",
                "flex",
                "items-center",
                "justify-between",
                "gap-3",
                "text-base",
                "px-1.5",
                "animate-show"
            )}
        >
            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-start",
                    "gap-3",
                    "sm:gap-5",
                    "truncate",
                    "max-w-[90%]"
                )}
            >
                <IconButton
                    // onClick={handleSidebar}
                    color="gray"
                    variant="text"
                    className={joinClassName(
                        "transition"
                        // openLeft ? "rotate-180" : "rotate-0"
                    )}
                >
                    {/* {openLeft ? (
                        <Icon name="FiX" size="1.3rem" />
                    ) : ( */}
                    <Avatar
                        alt="Allims"
                        src={
                            theme === "light"
                                ? "https://allims-files.s3.sa-east-1.amazonaws.com/front/allims_logo_color.png"
                                : "https://allims-files.s3.sa-east-1.amazonaws.com/front/allims_logo_white.png"
                        }
                    />
                    {/* )} */}
                </IconButton>
                <Breadcrumb.Container>
                    {breadcrumbPaths().map((p: any, i, arr) =>
                        i < arr.length - 1 ? (
                            <Breadcrumb.Link key={i}>
                                <Link
                                    key={p?.path}
                                    to={p?.route ?? "/"}
                                    className={joinClassName(
                                        "text-gray-900 hover:text-blue-800",
                                        "dark:text-white dark:hover:text-slate-300",
                                        activeRoute === "module"
                                            ? "text-red-500"
                                            : ""
                                    )}
                                >
                                    <span>{p?.title ?? p?.path}</span>
                                </Link>
                                <Popover
                                    onClose={() => setOpenPopover(-1)}
                                    open={openPopover === i}
                                    content={
                                        <List.Container>
                                            <List.Nav className="p-2">
                                                {p?.children?.map((f: any) => (
                                                    <List.Item
                                                        key={f.path}
                                                        onClick={(e: any) =>
                                                            handleSidebarItem(
                                                                e,
                                                                f
                                                            )
                                                        }
                                                    >
                                                        <List.ItemPrefix>
                                                            <Icon
                                                                name={f.icon}
                                                            />
                                                        </List.ItemPrefix>
                                                        <label
                                                            htmlFor={f.title}
                                                            className="cursor-pointer"
                                                        >
                                                            {f.title}
                                                        </label>
                                                    </List.Item>
                                                ))}
                                            </List.Nav>
                                        </List.Container>
                                    }
                                >
                                    <IconButton
                                        variant="text"
                                        size="sm"
                                        onClick={() => {
                                            if (p?.children?.length)
                                                setOpenPopover(i);
                                        }}
                                        disabled={!p?.children?.length}
                                    >
                                        <Icon
                                            name="FiChevronRight"
                                            className={joinClassName(
                                                "transition",
                                                "stroke-slate-400",
                                                "text-sm",
                                                "mx-1",
                                                "pointer-events-none",
                                                "select-none",
                                                openPopover === i
                                                    ? "rotate-90"
                                                    : "rotate-0"
                                            )}
                                        />
                                    </IconButton>
                                </Popover>
                            </Breadcrumb.Link>
                        ) : (
                            <Breadcrumb.Link key={i}>
                                <Link
                                    key={p?.path}
                                    to={p?.route ?? "/"}
                                    className={joinClassName(
                                        "text-gray-900 hover:text-blue-800",
                                        "dark:text-white dark:hover:text-slate-300",
                                        activeRoute === "module"
                                            ? "text-red-500"
                                            : ""
                                    )}
                                >
                                    <span>{p?.title ?? p?.path}</span>
                                </Link>
                            </Breadcrumb.Link>
                        )
                    )}
                </Breadcrumb.Container>
            </div>

            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-end",
                    "gap-0.5",
                    "sm:gap-3"
                )}
            >
                {metaEnvorimentTag ? (
                    <Tag color={metaEnvorimentTagColor}>
                        {metaEnvorimentTag}
                    </Tag>
                ) : (
                    <></>
                )}

                <Popover
                    open={openNotify}
                    onClose={() => setOpenNotify(false)}
                    content={
                        <List.Container className="max-w-sm p-2">
                            <List.Nav>
                                <List.Group>
                                    <List.Item>Notificação 1</List.Item>
                                    <List.Item>Notificação 2</List.Item>
                                </List.Group>
                            </List.Nav>
                        </List.Container>
                    }
                >
                    <IconButton
                        onClick={() => setOpenNotify(!openNotify)}
                        color="gray"
                        variant="text"
                    >
                        <Icon name="FiBell" size="1.3rem" />
                    </IconButton>
                </Popover>

                <Popover
                    open={openUser}
                    onClose={() => setOpenUser(false)}
                    content={
                        <List.Container className="max-w-sm p-2">
                            <List.Nav>
                                <List.Group>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/user")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Avatar src="sdfdsf" alt="lc" />
                                        </List.ItemPrefix>
                                        <div className="flex flex-col justify-start items-start max-w-[14rem]">
                                            <span className="w-full truncate">
                                                Lucas Mateus Chaves Chaves
                                                Chaves Lucas Mateus Chaves
                                                Chaves Chaves
                                            </span>
                                            <span className="truncate">
                                                lucas.chaves@gmail.com
                                            </span>
                                        </div>
                                    </List.Item>
                                </List.Group>
                                <List.Divider />
                                <List.Group>
                                    <List.Item onClick={toggleTheme}>
                                        <List.ItemPrefix>
                                            <Icon
                                                name={
                                                    theme === "light"
                                                        ? "FiMoon"
                                                        : "FiSun"
                                                }
                                            />
                                        </List.ItemPrefix>
                                        {theme === "light" ? "Dark" : "Light"}
                                    </List.Item>
                                    <List.Item onClick={toggleFullScreen}>
                                        <List.ItemPrefix>
                                            <Icon
                                                name={
                                                    document?.fullscreenElement
                                                        ? "FiMinimize"
                                                        : "FiMaximize"
                                                }
                                            />
                                        </List.ItemPrefix>
                                        Tela cheia
                                    </List.Item>
                                </List.Group>
                                <List.Divider />
                                <List.Group>
                                    <List.Item>
                                        <List.ItemPrefix>
                                            <Icon name="TbLanguage" />
                                        </List.ItemPrefix>
                                        Portugues
                                    </List.Item>
                                </List.Group>
                                <List.Divider />
                                <List.Group>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/logger")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Icon name="PiDevToLogo" />
                                        </List.ItemPrefix>
                                        Log
                                    </List.Item>
                                </List.Group>
                                <List.Divider />
                                <List.Group>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/suport")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Icon name="MdOutlineSupportAgent" />
                                        </List.ItemPrefix>
                                        Suporte
                                    </List.Item>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/help")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Icon name="FiHelpCircle" />
                                        </List.ItemPrefix>
                                        Ajuda
                                    </List.Item>
                                </List.Group>
                                <List.Group>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/privacypolicy")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Icon name="MdOutlinePrivacyTip" />
                                        </List.ItemPrefix>
                                        Politica de Privacidade
                                    </List.Item>
                                    <List.Item
                                        onClick={() =>
                                            handleNavigate("/app/termsofuse")
                                        }
                                    >
                                        <List.ItemPrefix>
                                            <Icon name="AiOutlineAudit" />
                                        </List.ItemPrefix>
                                        Termos de uso
                                    </List.Item>
                                </List.Group>
                                <List.Divider />
                                <List.Group>
                                    <List.Item onClick={handleSingout}>
                                        <List.ItemPrefix>
                                            <Icon name="FiPower" />
                                        </List.ItemPrefix>
                                        Sair
                                    </List.Item>
                                </List.Group>
                            </List.Nav>
                        </List.Container>
                    }
                >
                    <IconButton
                        onClick={() => setOpenUser(!openUser)}
                        color="gray"
                        variant="text"
                    >
                        <Icon name="FiMoreVertical" size="1.3rem" />
                    </IconButton>
                </Popover>

                {/* <IconButton onClick={handleToolbar} color="gray" variant="text">
                    <Icon
                        name="FiMenu"
                        size="1.3rem"
                        className={joinClassName(
                            "transition",
                            "duration-300",
                            openRight ? "rotate-90" : "rotate-0"
                        )}
                    />
                </IconButton> */}
            </div>
        </header>
    );
};

export { Header };
