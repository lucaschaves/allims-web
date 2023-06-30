/* eslint-disable no-prototype-builtins */
import { joinClassName } from "@/utils";
import { ReactNode, createContext, useState } from "react";
import { FiChevronLeft, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { Icon } from "../../../../allims-library/src";
import "./styles.css";

interface IButtonProps {
    title: string;
    open: boolean;
    active?: boolean;
    disabled?: boolean;
    iconLeft?: string;
    iconRight?: string;
    openRight?: boolean;
    className?: string;
    onClick: (e: any) => void;
    onDoubleClick?: (e: any) => void;
}

type TDirection = "left" | "right";

interface IItem {
    title: string;
    icon: string;
}

interface IKeyOfAny {
    [key: string]: any;
}

const SidebarContext = createContext({} as ISidebarContext);

interface ISidebarContext {
    direction: TDirection;
    itemActive: IItem;
    openExpandActive: IKeyOfAny;
    disabled: boolean;
    open: boolean;
    toggle: () => void;
    handleExpandActive: (id: string) => void;
    handleItemActive: (item: IItem) => void;
    openItem: IKeyOfAny;
    handleOpenItem: (id: string) => void;
}

interface IContainer {
    children: ReactNode;
    direction?: "right" | "left";
    open: boolean;
    disabled?: boolean;
    toggle: () => void;
}

interface IContainerExpandProps {
    id: string;
    itemActive: IItem;
    items: Omit<IItem, "group">[];
    onClick: (item: IItem) => void;
}

interface IContainerExpandItemProps {
    id: string;
    loading: boolean;
    item: IItem;
    subItem: IItem;
    items: Omit<IItem, "group">[];
    onClick: (item: IItem) => void;
    onOpen: () => void;
}

interface IContainerButtonsProps {
    items: Omit<IItem, "group">[];
    loading?: boolean;
    onClick: (item: IItem) => void;
    onDoubleClick?: (item: IItem) => void;
}

interface IButtonThemeProps {
    handleItem: (title: string) => void;
}

interface IButtonUserProps {
    handleUser: () => void;
    handleLogout: () => void;
}

interface IButtonExpandProps {
    id: string;
    item: IItem;
}

const Divider = () => (
    <div
        className={joinClassName(
            "h-0.5",
            "w-full",
            "bg-blue-900",
            "rounded",
            "text-base"
        )}
    />
);

const Button = ({
    title,
    open,
    iconLeft,
    iconRight,
    active = false,
    disabled = false,
    openRight = false,
    onClick,
    onDoubleClick,
}: IButtonProps) => {
    return (
        // <Tooltip tooltip={title}>
        <button
            type="button"
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={joinClassName(
                "p-2",
                "w-full",
                "flex",
                "gap-3",
                "items-center",
                "rounded",
                "transition",
                "duration-300",
                "hover:bg-blue-900",
                "hover:ring-1",
                "cursor-pointer",
                "active:bg-blue-950",
                "text-base",
                open ? "justify-between" : "justify-center",
                active
                    ? joinClassName(
                          "bg-blue-900",
                          "ring-1",
                          "ring-blue-800",
                          "hover:bg-blue-950"
                      )
                    : "",
                disabled
                    ? joinClassName(
                          "bg-transparent",
                          "text-transparent",
                          "hover:bg-transparent"
                      )
                    : ""
            )}
            disabled={disabled}
        >
            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-start",
                    "text-base",
                    "gap-3"
                )}
            >
                {iconLeft ? (
                    <Icon
                        name={iconLeft}
                        // size={20}
                    />
                ) : (
                    <></>
                )}

                <span
                    className={joinClassName(
                        "origin-left",
                        "whitespace-nowrap",
                        "duration-300",
                        "overflow-hidden",
                        "text-base",
                        open ? "" : "hidden"
                    )}
                >
                    {title}
                </span>
            </div>

            {iconRight && open ? (
                <Icon
                    name={iconRight}
                    // size={15}
                    // className={openRight ? "rotate-180" : ""}
                />
            ) : (
                <></>
            )}
        </button>
        // </Tooltip>
    );
};

const getTitleIcon = (title: string) => {
    const joinTitle = title.split(" ").filter((v) => v.toLowerCase() !== "de");
    try {
        let titleConcat = joinTitle[0].charAt(0) + joinTitle[0].charAt(1);
        if (joinTitle.length > 1) {
            titleConcat = joinTitle[0].charAt(0) + joinTitle[1].charAt(0);
        }
        return titleConcat.toUpperCase();
    } catch (err) {
        return title.length ? title.charAt(0).toUpperCase() : "A";
    }
};

const SubButton = ({
    title,
    open,
    iconLeft,
    iconRight,
    active = false,
    disabled = false,
    openRight = false,
    onClick,
    onDoubleClick,
    className = "",
}: IButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={joinClassName(
                "p-2",
                "w-full",
                "flex",
                "gap-3",
                "items-center",
                "rounded",
                "transition",
                "duration-300",
                "hover:bg-blue-900",
                "hover:ring-1",
                "cursor-pointer",
                "text-blue-100",
                "active:bg-blue-950",
                "text-base",
                open ? "justify-between" : "justify-center",
                active
                    ? joinClassName(
                          "ring-1",
                          "text-white",
                          "hover:text-blue-200"
                      )
                    : "",
                disabled
                    ? joinClassName(
                          "bg-transparent",
                          "text-transparent",
                          "hover:bg-transparent"
                      )
                    : "",

                className
            )}
            disabled={disabled}
        >
            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-start",
                    "text-base",
                    "gap-3"
                )}
            >
                {iconLeft ? (
                    <Icon
                        name={iconLeft}
                        // size={25}
                    />
                ) : (
                    <></>
                )}

                <span
                    className={joinClassName(
                        "origin-left",
                        "whitespace-nowrap",
                        "duration-300",
                        "text-base",
                        "overflow-hidden"

                        // open ? "" : "hidden"
                    )}
                >
                    {open ? title : getTitleIcon(title)}
                </span>
            </div>

            {iconRight && open ? (
                <Icon
                    name={iconRight}
                    // size={15}
                    // className={openRight ? "rotate-180" : ""}
                />
            ) : (
                <></>
            )}
        </button>
    );
};

const ButtonMenu = () => {
    return (
        <SidebarContext.Consumer>
            {({ direction, open, disabled, toggle }) => (
                <div
                    className={joinClassName(
                        "flex",
                        "items-center",
                        "gap-2",
                        direction === "right" ? "flex-row-reverse" : "",
                        "sticky",
                        "top-0",
                        "text-base",
                        "bg-blue-main"
                    )}
                >
                    <a
                        href=""
                        className={joinClassName(
                            "p-2",
                            "w-full",
                            "flex",
                            "items-center",
                            "rounded",
                            "transition",
                            "duration-300",
                            "hover:bg-blue-900",
                            "cursor-pointer",
                            "hover:ring-1",
                            "text-base",
                            direction === "right"
                                ? open
                                    ? ""
                                    : "hidden"
                                : open
                                ? ""
                                : "hidden"
                        )}
                    >
                        {/* <img
                            src="https://cetal.com.br/site/wp-content/themes/CETAL/img/logo.png"
                            alt="logomarca"
                            width={60}
                            height={45}
                        /> */}
                        <Icon name="FiMenu" />
                    </a>

                    <button
                        disabled={disabled}
                        className={joinClassName(
                            "p-2",
                            "flex",
                            "gap-3",
                            "items-center",
                            "transition",
                            "duration-300",
                            "cursor-pointer",
                            open ? "" : "h-10",
                            "rounded",
                            "transition",
                            "duration-300",
                            "hover:bg-blue-900",
                            "hover:ring-1",
                            "text-base",
                            direction === "right"
                                ? open
                                    ? joinClassName(
                                          "bg-white",
                                          "text-black",
                                          "rounded-full",
                                          "border",
                                          "border-blue-950",
                                          "hover:bg-blue-100",
                                          "hover:text-white"
                                      )
                                    : joinClassName(
                                          "w-full",
                                          "text-white",
                                          "justify-center",
                                          "rounded",
                                          "hover:bg-blue-900",
                                          "hover:text-white"
                                      )
                                : open
                                ? joinClassName(
                                      "bg-white",
                                      "text-black",
                                      "rounded-full",
                                      "border",
                                      "border-blue-950",
                                      "hover:bg-blue-100",
                                      "hover:text-white"
                                  )
                                : joinClassName(
                                      "w-full",
                                      "text-white",
                                      "justify-center",
                                      "rounded",
                                      "hover:bg-blue-900",
                                      "hover:text-white"
                                  ),
                            disabled ? "hover:bg-transparent" : ""
                        )}
                        type="button"
                        onClick={toggle}
                    >
                        {open ? (
                            <FiChevronLeft
                                size={open ? 15 : 25}
                                className={
                                    direction === "right"
                                        ? open
                                            ? "rotate-180"
                                            : ""
                                        : open
                                        ? ""
                                        : "rotate-180"
                                }
                            />
                        ) : (
                            <Icon name="FiMenu" />
                            // <img
                            //     src={
                            //         "https://allims-files.s3.sa-east-1.amazonaws.com/front/cetal_icon.ico"
                            //     }
                            //     alt="logomarca"
                            //     width={60}
                            //     height={65}
                            // />
                        )}
                    </button>
                </div>
            )}
        </SidebarContext.Consumer>
    );
};

const ButtonTheme = ({ handleItem }: IButtonThemeProps) => {
    return (
        <SidebarContext.Consumer>
            {({ open, disabled }) => (
                <div
                    className={joinClassName(
                        "w-full",
                        "flex",
                        "items-center",
                        "text-base",
                        "justify-between"
                    )}
                >
                    {open ? (
                        <>
                            <button
                                className={joinClassName(
                                    "cursor-pointer",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "gap-2",
                                    "p-2",
                                    "w-full",
                                    "rounded-l",
                                    "text-base",
                                    "bg-blue-900",
                                    "hover:bg-blue-800",
                                    disabled ? "hover:bg-transparent" : ""
                                )}
                                type="button"
                                onClick={() => handleItem("light")}
                                disabled={disabled}
                            >
                                <FiSun />
                                Light
                            </button>
                            <button
                                className={joinClassName(
                                    "cursor-pointer",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "gap-2",
                                    "p-2",
                                    "text-base",
                                    "w-full",
                                    "rounded-r",
                                    "bg-blue-950",
                                    "hover:bg-blue-800",
                                    disabled ? "hover:bg-transparent" : ""
                                )}
                                type="button"
                                onClick={() => handleItem("dark")}
                                disabled={disabled}
                            >
                                <FiMoon />
                                Dark
                            </button>
                        </>
                    ) : (
                        <button
                            className={joinClassName(
                                "cursor-pointer",
                                "flex",
                                "items-center",
                                "justify-center",
                                "gap-2",
                                "text-base",
                                "p-2",
                                "w-full",
                                "rounded",
                                "bg-blue-900",
                                "hover:bg-blue-800",
                                disabled ? "hover:bg-transparent" : ""
                            )}
                            type="button"
                            onClick={() => handleItem("light")}
                            disabled={disabled}
                        >
                            <FiSun />
                        </button>
                    )}
                </div>
            )}
        </SidebarContext.Consumer>
    );
};

const ButtonUser = ({ handleLogout, handleUser }: IButtonUserProps) => {
    return (
        <SidebarContext.Consumer>
            {({ open, disabled }) => (
                <>
                    {open ? (
                        <div className={joinClassName("flex")}>
                            <button
                                type="button"
                                className={joinClassName(
                                    "cursor-pointer",
                                    "p-2",
                                    "w-full",
                                    "flex",
                                    "gap-3",
                                    "text-base",
                                    "items-center",
                                    "rounded",
                                    "transition",
                                    "duration-300",
                                    "hover:bg-blue-900",
                                    open ? "" : "justify-center",
                                    disabled ? "hover:bg-transparent" : "",
                                    "hover:ring-1"
                                )}
                                onClick={handleUser}
                            >
                                <FiUser size={25} />{" "}
                                {open && (
                                    <div
                                        className={joinClassName(
                                            "flex",
                                            "flex-col"
                                        )}
                                    >
                                        <strong className="text-base">
                                            Lucas Chaves
                                        </strong>
                                        <span className="text-base">
                                            lucas.chaves@allims.com.br
                                        </span>
                                    </div>
                                )}
                            </button>

                            <Button
                                open={false}
                                title=""
                                iconLeft="FiPower"
                                onClick={handleLogout}
                                disabled={disabled}
                            />
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                className={joinClassName(
                                    "cursor-pointer",
                                    "p-2",
                                    "w-full",
                                    "flex",
                                    "gap-3",
                                    "items-center",
                                    "rounded",
                                    "transition",
                                    "text-base",
                                    "duration-300",
                                    "hover:bg-blue-900",
                                    open ? "" : "justify-center",
                                    disabled ? "hover:bg-transparent" : ""
                                )}
                                onClick={handleUser}
                            >
                                <FiUser size={25} />{" "}
                                {open && (
                                    <div
                                        className={joinClassName(
                                            "flex",
                                            "text-base",
                                            "flex-col"
                                        )}
                                    >
                                        <strong className="text-base">
                                            Lucas Chaves
                                        </strong>
                                        <span className="text-base">
                                            lucas.chaves@allims.com.br
                                        </span>
                                    </div>
                                )}
                            </button>
                        </>
                    )}
                </>
            )}
        </SidebarContext.Consumer>
    );
};

const ButtonExpand = ({ id, item }: IButtonExpandProps) => {
    return (
        <SidebarContext.Consumer>
            {({ handleExpandActive, open, disabled, openExpandActive }) => (
                <Button
                    open={open}
                    title={item.title}
                    iconLeft={item.icon}
                    onClick={() => handleExpandActive(id)}
                    disabled={disabled}
                    iconRight="FiChevronLeft"
                    openRight={!!openExpandActive[id]}
                />
            )}
        </SidebarContext.Consumer>
    );
};

const ContainerExpand = ({
    id,
    items,
    onClick,
    itemActive,
}: IContainerExpandProps) => {
    return (
        <SidebarContext.Consumer>
            {({ openExpandActive, handleExpandActive, open, disabled }) => (
                <div
                    className={joinClassName(
                        "flex",
                        "flex-col",
                        open ? "pl-4" : "",
                        "overflow-hidden",
                        "duration-300",
                        "text-base",
                        "ease-in-out",
                        "transition-height",
                        openExpandActive[id] ? "h-full" : "h-0"
                    )}
                >
                    {items
                        ?.filter((b) => b.title !== itemActive.title)
                        ?.map((b) => (
                            <Button
                                key={b.title}
                                open={open}
                                title={b.title}
                                iconLeft={b.icon}
                                onClick={() => {
                                    handleExpandActive(id);
                                    onClick(b);
                                }}
                                disabled={disabled}
                            />
                        ))}
                </div>
            )}
        </SidebarContext.Consumer>
    );
};

const ContainerButtons = ({
    items,
    loading = false,
    onClick,
    onDoubleClick = () => ({}),
}: IContainerButtonsProps) => {
    return (
        <SidebarContext.Consumer>
            {({ open, disabled, itemActive, handleItemActive }) => (
                <>
                    {loading ? (
                        <>
                            <div className=" rounded-md p-2 max-w-sm w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-blue-900 h-10 w-10"></div>
                                </div>
                            </div>
                            <div className=" rounded-md p-2 max-w-sm w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-blue-900 h-10 w-10"></div>
                                </div>
                            </div>
                            <div className=" rounded-md p-2 max-w-sm w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-blue-900 h-10 w-10"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        items?.map((btn) => (
                            <Button
                                key={btn.title}
                                open={open}
                                title={btn.title}
                                active={itemActive.title === btn.title}
                                iconLeft={btn.icon}
                                onClick={() => {
                                    handleItemActive(btn);
                                    onClick(btn);
                                }}
                                onDoubleClick={() => {
                                    onDoubleClick(btn);
                                }}
                                disabled={disabled}
                            />
                        ))
                    )}
                </>
            )}
        </SidebarContext.Consumer>
    );
};

const ContainerExpandItem = ({
    id,
    items,
    onClick,
    onOpen,
    item,
    subItem,
    loading = false,
}: IContainerExpandItemProps) => {
    return (
        <SidebarContext.Consumer>
            {({ open, disabled, openItem, handleOpenItem }) => (
                <>
                    <Button
                        open={open}
                        title={item.title}
                        iconLeft={item.icon}
                        onClick={() => {
                            handleOpenItem(id);
                            onOpen();
                        }}
                        disabled={disabled}
                        iconRight="FiChevronDown"
                        active={!!openItem[id]}
                        openRight={!!openItem[id]}
                    />

                    <ul
                        className={joinClassName(
                            "flex",
                            "flex-col",
                            open ? "pl-4" : "",
                            "overflow-hidden",
                            "duration-500",
                            "text-base",
                            "ease-in-out",
                            "transition-height",
                            openItem[id] ? "h-full" : "h-0",
                            "pb-1"
                        )}
                    >
                        {loading ? (
                            <>
                                <li
                                    className={joinClassName(
                                        "flex",
                                        "items-center",
                                        "w-full",
                                        "gap-4",
                                        open ? "pr-1" : "",
                                        "relative"
                                    )}
                                >
                                    {open ? (
                                        <div
                                            className={joinClassName(
                                                "absolute",
                                                "h-full",
                                                "w-[0.5px]",
                                                "bg-slate-600",
                                                "top-4"
                                            )}
                                        >
                                            <div
                                                className={joinClassName(
                                                    "w-[5px]",
                                                    "h-[5px]",
                                                    "rounded",
                                                    "bg-slate-600",
                                                    "absolute",
                                                    "-left-[2px]"
                                                )}
                                            ></div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div
                                        className={joinClassName(
                                            "animate-pulse",
                                            "w-full",
                                            "p-2",
                                            "rounded-sm",
                                            open ? "ml-4" : ""
                                        )}
                                    >
                                        <div
                                            className={joinClassName(
                                                "w-full",
                                                "h-8",
                                                "rounded",
                                                "bg-blue-900"
                                            )}
                                        ></div>
                                    </div>
                                </li>
                                <li
                                    className={joinClassName(
                                        "flex",
                                        "items-center",
                                        "w-full",
                                        "gap-4",
                                        open ? "pr-1" : "",
                                        "relative"
                                    )}
                                >
                                    {open ? (
                                        <div
                                            className={joinClassName(
                                                "relative",
                                                "h-full",
                                                "w-[0.5px]",
                                                "bg-slate-600"
                                            )}
                                        >
                                            <div
                                                className={joinClassName(
                                                    "w-[5px]",
                                                    "h-[5px]",
                                                    "rounded",
                                                    "bg-slate-600",
                                                    "absolute",
                                                    "top-4",
                                                    "-left-[2px]"
                                                )}
                                            ></div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div className="animate-pulse w-full p-2 rounded-sm">
                                        <div
                                            className={joinClassName(
                                                "w-full",
                                                "h-8",
                                                "rounded",
                                                "bg-blue-900"
                                            )}
                                        ></div>
                                    </div>
                                </li>
                            </>
                        ) : items.length === 0 ? (
                            <li
                                className={joinClassName(
                                    "flex",
                                    "items-center",
                                    "w-full",
                                    "gap-4",
                                    "pr-1",
                                    "relative"
                                )}
                            >
                                <div
                                    className={joinClassName(
                                        "w-full",
                                        "p-2",
                                        "rounded-sm",
                                        "flex",
                                        "items-center",
                                        "justify-center"
                                    )}
                                >
                                    <div
                                        className={joinClassName(
                                            "w-full",
                                            "h-8",
                                            "rounded",
                                            "flex",
                                            "items-center",
                                            "justify-center",
                                            "text-slate-400",
                                            "text-center"
                                        )}
                                    >
                                        Sem dados
                                    </div>
                                </div>
                            </li>
                        ) : (
                            items?.map((b, ind, c) => (
                                <li
                                    key={b.title}
                                    className={joinClassName(
                                        "flex",
                                        "items-center",
                                        "w-full",
                                        ind === 0 ? "mt-2" : "",
                                        "gap-4",
                                        "text-base",
                                        open ? "pr-1" : "p-1",
                                        "relative"
                                    )}
                                >
                                    {open ? (
                                        <div
                                            className={joinClassName(
                                                ind === 0 ||
                                                    ind === c.length - 1
                                                    ? "absolute"
                                                    : "relative",
                                                "h-full",
                                                "w-[0.5px]",
                                                "text-base",
                                                "bg-slate-600",
                                                ind === 0
                                                    ? "top-4"
                                                    : ind === c.length - 1
                                                    ? "bottom-4"
                                                    : ""
                                            )}
                                        >
                                            <div
                                                className={joinClassName(
                                                    "w-[5px]",
                                                    "h-[5px]",
                                                    "rounded",
                                                    "text-base",
                                                    subItem?.title === b.title
                                                        ? "bg-slate-100"
                                                        : "bg-slate-600",
                                                    "absolute",
                                                    ind === 0
                                                        ? ""
                                                        : ind === c.length - 1
                                                        ? "top-8"
                                                        : "top-4",
                                                    "-left-[2px]"
                                                )}
                                            ></div>
                                        </div>
                                    ) : (
                                        <></>
                                        // <div
                                        //     className={joinClassName(
                                        //         // ind === 0 ||
                                        //         //     ind === c.length - 1
                                        //         //     ? "absolute"
                                        //         // :
                                        //         "relative",
                                        //         "h-full",
                                        //         "w-[0.5px]",
                                        //         "text-base",
                                        //         "bg-slate-600",
                                        //         ind === 0
                                        //             ? "top-4"
                                        //             : ind === c.length - 1
                                        //             ? "bottom-4"
                                        //             : ""
                                        //     )}
                                        // >
                                        //     <div
                                        //         className={joinClassName(
                                        //             "w-[5px]",
                                        //             "h-[5px]",
                                        //             "rounded",
                                        //             "text-base",
                                        //             subItem?.title === b.title
                                        //                 ? "bg-slate-100"
                                        //                 : "bg-slate-600",
                                        //             "absolute",
                                        //             ind === 0
                                        //                 ? ""
                                        //                 : ind === c.length - 1
                                        //                 ? "top-8"
                                        //                 : "top-4",
                                        //             "-left-[2px]"
                                        //         )}
                                        //     ></div>
                                        // </div>
                                    )}

                                    <SubButton
                                        open={open}
                                        title={b.title}
                                        onClick={() => onClick(b)}
                                        active={subItem?.title === b.title}
                                        disabled={disabled}
                                        className={
                                            !open
                                                ? ""
                                                : ind == 0 ||
                                                  ind === c.length - 1
                                                ? joinClassName("ml-4")
                                                : ""
                                        }
                                    />
                                </li>
                            ))
                        )}
                    </ul>
                </>
            )}
        </SidebarContext.Consumer>
    );
};

const LoadingItems = () => {
    return (
        <>
            <div className="animate-pulse w-full p-2 rounded-sm">
                <div
                    className={joinClassName(
                        "w-full",
                        "h-8",
                        "rounded",
                        "bg-blue-900"
                    )}
                ></div>
            </div>
            <div className="animate-pulse w-full p-2 rounded-sm">
                <div
                    className={joinClassName(
                        "w-full",
                        "h-8",
                        "rounded",
                        "bg-blue-900"
                    )}
                ></div>
            </div>
            <div className="animate-pulse w-full p-2 rounded-sm">
                <div
                    className={joinClassName(
                        "w-full",
                        "h-8",
                        "rounded",
                        "bg-blue-900"
                    )}
                ></div>
            </div>
        </>
    );
};

interface IContainerNavProps {
    children: ReactNode;
    fixed?: "top" | "bottom";
}

const ContainerNav = ({ children, fixed }: IContainerNavProps) => (
    <nav
        className={joinClassName(
            "allims-sidebar-aside-nav",
            "flex",
            "flex-col",
            "gap-1",
            "w-full",
            "p-2",
            "text-base",
            "bg-blue-main",
            fixed === "top"
                ? "absolute top-0"
                : fixed === "bottom"
                ? "absolute bottom-0"
                : "relative",
            "overflow-x-hidden",
            "overflow-y-auto"
        )}
    >
        {children}
    </nav>
);

const Container = ({
    children,
    direction = "left",
    open = false,
    toggle,
    disabled = false,
}: IContainer) => {
    const [openExpandActive, setExpandActive] = useState<IKeyOfAny>({} as any);
    const [itemActive, setItemActive] = useState<IItem>({} as IItem);
    const [openItem, setOpenItem] = useState({});

    const handleExpandActive = (id: string) => {
        if (openExpandActive.hasOwnProperty(id)) {
            setExpandActive((prev) => {
                let newOpenExpand = {};
                Object.keys(prev).forEach((key) => {
                    if (key !== id) {
                        newOpenExpand = {
                            ...newOpenExpand,
                            [key]: prev[key],
                        };
                    }
                });
                return newOpenExpand;
            });
        } else {
            setExpandActive((prev) => ({ ...prev, [id]: true }));
        }
    };

    const handleItemActive = (item: IItem) => setItemActive(item);

    const handleOpenItem = (id: string) => {
        if (openItem.hasOwnProperty(id)) {
            setOpenItem({});
        } else {
            setOpenItem({ [id]: true });
        }
    };

    return (
        <SidebarContext.Provider
            value={{
                itemActive,
                openExpandActive,
                handleExpandActive,
                handleItemActive,
                open,
                toggle,
                disabled,
                direction,
                openItem,
                handleOpenItem,
            }}
        >
            <aside
                className={joinClassName(
                    "flex",
                    "h-full",
                    "flex-col",
                    "relative",
                    "overflow-hidden",
                    "justify-between",
                    "gap-2",
                    "bg-blue-main",
                    "text-white",
                    "text-base",
                    "absolute",
                    direction === "right" ? "rounded-tl" : "rounded-tr",
                    "duration-500",
                    "ease-in-out",
                    "transition-width",
                    direction === "left" ? "w-0" : "w-16",
                    "sm:w-16",
                    open ? "!w-96" : "",
                    disabled ? "w-4 blur-sm" : ""
                )}
            >
                {children}
            </aside>
        </SidebarContext.Provider>
    );
};

const Sidebar = {
    Button,
    ButtonExpand,
    ButtonMenu,
    ButtonUser,
    ButtonTheme,
    Container,
    ContainerButtons,
    ContainerExpand,
    ContainerNav,
    Divider,
    ContainerExpandItem,
    LoadingItems,
};

export { Sidebar };
