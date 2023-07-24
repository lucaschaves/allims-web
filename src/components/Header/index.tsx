import { useAuth } from "@/context";
import { joinClassName } from "@/utils";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Icon, IconButton } from "../../lib";

interface IHeaderProps {
    openRight: boolean;
    openLeft: boolean;
    toggleSidebar: () => void;
    toggleToolbar: () => void;
}

const itemsData = [
    {
        title: "Suporte",
        icon: "MdOutlineSupportAgent",
        route: "/app/suporte",
        group: "profile",
    },
    {
        title: "Ajuda",
        icon: "FiHelpCircle",
        route: "/app/ajuda",
        group: "profile",
    },
    {
        title: "Politica de Privacidade",
        icon: "MdOutlinePrivacyTip",
        route: "/app/privacyPolicy",
        group: "geral",
    },
    {
        title: "Termos de uso",
        icon: "AiOutlineAudit",
        route: "/app/termsOfUse",
        group: "geral",
    },
];

const Header = (props: IHeaderProps) => {
    const { openLeft, openRight, toggleSidebar, toggleToolbar } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { signout } = useAuth();

    const [open, setOpen] = useState(false);

    const activeRoute = pathname.split("/").slice(-1)[0];

    const handleSidebar = useCallback(() => {
        toggleSidebar();
    }, [toggleSidebar]);

    const handleToolbar = useCallback(() => {
        toggleToolbar();
    }, [toggleToolbar]);

    const handleSingout = useCallback(() => {
        signout(() => {
            navigate("/");
        });
    }, [navigate, signout]);

    return (
        <header
            className={joinClassName(
                "w-full",
                "h-16",
                "bg-gray-200",
                "text-base",
                "flex",
                "items-center",
                "justify-between",
                "gap-3",
                "text-base",
                "px-3",
                "py-1"
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
                    onClick={handleSidebar}
                    color="gray"
                    variant="text"
                    className={
                        openLeft
                            ? "animate-wiggle-open"
                            : "animate-wiggle-close"
                    }
                >
                    <Avatar
                        alt="Allims"
                        src="https://allims-files.s3.sa-east-1.amazonaws.com/front/allims_logo_color.png"
                    />
                </IconButton>
                {/* <Breadcrumb>
                    {pathname
                        .split("/")
                        .filter((p) => p)
                        .map((p) => (
                            <Link
                                key={p}
                                to="module"
                                className={joinClassName(
                                    "text-gray-900 hover:text-blue-800",
                                    activeRoute === "module"
                                        ? "text-red-500"
                                        : ""
                                )}
                            >
                                <span>{p}</span>
                            </Link>
                        ))}
                </Breadcrumb> */}
            </div>

            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-end",
                    "gap-0.5",
                    "sm:gap-5"
                )}
            >
                {/* <IconButton onClick={handleSidebar} color="gray" variant="text">
                    <Icon name="FiBell" size="1.3rem" />
                </IconButton>

                <Popover
                    open={open}
                    onClose={() => setOpen(false)}
                    content={
                        <List.Container className="max-w-sm p-2">
                            <List.Nav>
                                <List.Group>
                                    <List.Item>
                                        <List.ItemPrefix>
                                            <Avatar src="sdfdsf" alt="lc" />
                                        </List.ItemPrefix>
                                        <div className="flex flex-col justify-start items-start max-w-[14rem]">
                                            <span className=" w-full truncate">
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
                                <List.Group>
                                    {itemsData
                                        .filter(
                                            (item) => item.group === "profile"
                                        )
                                        .map((item, ind) => (
                                            <List.Item key={item.title}>
                                                <List.ItemPrefix>
                                                    <Icon name={item.icon} />
                                                </List.ItemPrefix>
                                                {item.title}
                                            </List.Item>
                                        ))}
                                </List.Group>
                                <List.Group>
                                    {itemsData
                                        .filter(
                                            (item) => item.group === "geral"
                                        )
                                        .map((item) => (
                                            <List.Item key={item.title}>
                                                <List.ItemPrefix>
                                                    <Icon name={item.icon} />
                                                </List.ItemPrefix>
                                                {item.title}
                                            </List.Item>
                                        ))}
                                </List.Group>
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
                        onClick={() => setOpen(!open)}
                        color="gray"
                        variant="text"
                    >
                        <Icon name="FiUser" size="1.3rem" />
                    </IconButton>
                </Popover> */}

                <IconButton onClick={handleToolbar} color="gray" variant="text">
                    <Icon name="FiMoreVertical" size="1.3rem" />
                </IconButton>
            </div>
        </header>
    );
};

export { Header };
