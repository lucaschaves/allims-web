import { useAuth } from "@/context";
import { joinClassName } from "@/utils";
import { useCallback, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Breadcrumb,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListNav,
    Popover,
} from "../../../../allims-library/";

interface IHeaderProps {
    toggle: () => void;
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
    const { toggle } = props;

    const navigate = useNavigate();

    const { signout } = useAuth();

    const [open, setOpen] = useState(false);

    const handleMenu = useCallback(() => {
        toggle();
    }, [toggle]);

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
                <IconButton onClick={handleMenu} color="gray">
                    <Icon name="FiMenu" size="1.3rem" />
                </IconButton>

                <Breadcrumb>
                    <a
                        href="/"
                        className="text-gray-600 hover:text-blue-500 flex gap-2 items-center"
                    >
                        <AiFillHome />
                        Analitico
                    </a>
                    <a href="/" className="text-gray-600 hover:text-blue-500">
                        <span>Gerenciamento de Amostra</span>
                    </a>
                    <a href="/" className="text-gray-900 hover:text-blue-800">
                        <span>Filtros</span>
                    </a>
                </Breadcrumb>
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
                <IconButton onClick={handleMenu} color="gray">
                    <Icon name="FiBell" size="1.3rem" />
                </IconButton>

                <Popover
                    open={open}
                    onClose={() => setOpen(false)}
                    content={
                        <List className="p-2 rounded-xl max-w-sm">
                            <ListNav className="gap-2">
                                <ListItem className="h-16 hover:bg-slate-100 rounded px-2 gap-2">
                                    <ListItemPrefix>
                                        <Avatar src="sdfdsf" alt="lc" />
                                    </ListItemPrefix>
                                    <div className="flex flex-col justify-start items-start max-w-[14rem]">
                                        <span className=" w-full truncate">
                                            Lucas Mateus Chaves Chaves Chaves
                                            Lucas Mateus Chaves Chaves Chaves
                                        </span>
                                        <span className="truncate">
                                            lucas.chaves@gmail.com
                                        </span>
                                    </div>
                                </ListItem>
                                <div className="border-b w-full border-slate-300 h-0.5"></div>
                                <div className="flex flex-col gap-2">
                                    {itemsData
                                        .filter(
                                            (item) => item.group === "profile"
                                        )
                                        .map((item, ind) => (
                                            <ListItem
                                                key={item.title}
                                                className={joinClassName(
                                                    "h-10 hover:bg-slate-100 rounded px-2 gap-2"
                                                )}
                                            >
                                                <ListItemPrefix>
                                                    <Icon name={item.icon} />
                                                </ListItemPrefix>
                                                {item.title}
                                            </ListItem>
                                        ))}
                                </div>
                                <div className="border-b w-full border-slate-300 h-0.5"></div>
                                <div className="flex flex-col gap-2">
                                    {itemsData
                                        .filter(
                                            (item) => item.group === "geral"
                                        )
                                        .map((item) => (
                                            <ListItem
                                                key={item.title}
                                                className="h-10 hover:bg-slate-100 rounded px-2 gap-2"
                                            >
                                                <ListItemPrefix>
                                                    <Icon name={item.icon} />
                                                </ListItemPrefix>
                                                {item.title}
                                            </ListItem>
                                        ))}
                                </div>

                                <div className="border-b w-full border-slate-300 h-0.5"></div>
                                <ListItem
                                    className="h-10 hover:bg-slate-100 rounded px-2 gap-2"
                                    onClick={handleSingout}
                                >
                                    <ListItemPrefix>
                                        <Icon name="FiPower" />
                                    </ListItemPrefix>
                                    Sair
                                </ListItem>
                            </ListNav>
                        </List>
                    }
                >
                    <IconButton onClick={() => setOpen(!open)} color="gray">
                        <Icon name="FiUser" size="1.3rem" />
                        {/* <img src="https://allims-files.s3.sa-east-1.amazonaws.com/front/allims_logo_color.png" /> */}
                    </IconButton>
                </Popover>

                <IconButton onClick={handleMenu} color="gray">
                    <Icon name="FiMoreVertical" size="1.3rem" />
                </IconButton>
            </div>
        </header>
    );
};

export { Header };
