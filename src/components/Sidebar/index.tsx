import { Icon } from "@/lib";
import { joinClassName, sleep } from "@/utils";
import {
    ComponentProps,
    ReactNode,
    forwardRef,
    useCallback,
    useEffect,
    useRef,
} from "react";

interface IContainerProps {
    id?: string;
    open: boolean;
    toggle: () => void;
    children: ReactNode;
    direction?: "left" | "right";
}

interface IBtnProps extends ComponentProps<"button"> {
    title: string;
    subTitle?: string;
    open?: boolean;
    active?: boolean;
    iconLeft?: string;
    iconRight?: string;
    iconStar?: string;
    invert?: boolean;
    direction?: "left" | "right";
    onClickFav?: (e: any) => void;
}

const Skeleton = (props: ComponentProps<"button">) => {
    const { ...rest } = props;

    return (
        <button
            {...rest}
            className={joinClassName(
                "ripple",
                "flex",
                "relative",
                "align-middle",
                "justify-center",
                "items-center",
                "select-none",
                "font-sans",
                "font-medium",
                "text-center",
                "uppercase",
                "transition-all",
                "rounded-lg",
                "h-12",
                "min-h-[3rem]",
                "bg-slate-200",
                "dark:bg-slate-900",
                "animate-pulse",
                "text-white",
                "hover:bg-blue-500/10",
                "active:bg-blue-500/30",
                "disabled:text-slate-400",
                "disabled:hover:bg-none",
                "disabled:opacity-50",
                "disabled:shadow-none",
                "disabled:pointer-events-none"
            )}
        >
            <div className="w-full h-full"></div>
        </button>
    );
};

const Btn = forwardRef<HTMLButtonElement, IBtnProps>((props, ref) => {
    const {
        title = "AA",
        subTitle,
        open,
        active,
        className = "",
        iconLeft,
        iconRight,
        iconStar,
        disabled,
        invert,
        direction = "left",
        onClickFav = () => ({}),
        ...rest
    } = props;

    if (iconStar) {
        return (
            <div className={joinClassName("w-full flex gap-2")}>
                <button
                    ref={ref}
                    type="button"
                    title={title}
                    {...rest}
                    disabled={disabled}
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
                        "text-slate-100",
                        "hover:bg-blue-500/10",
                        "active:bg-blue-500/30",
                        "disabled:text-slate-400",
                        "disabled:hover:bg-blue-main",
                        "disabled:-ml-8",
                        active
                            ? invert
                                ? "text-blue-600 bg-blue-200 hover:bg-blue-200/50"
                                : "text-blue-500 bg-blue-900 hover:bg-blue-900/50"
                            : "",
                        open
                            ? joinClassName("justify-start", "pl-6")
                            : joinClassName("justify-center"),
                        className,
                        invert
                            ? joinClassName(
                                  "!text-blue-900",
                                  "!hover:bg-slate-100/10",
                                  "!active:bg-slate-200/30"
                              )
                            : ""
                    )}
                >
                    {iconLeft ? (
                        <Icon
                            name={iconLeft}
                            className="disabled:stroke-slate-500 disabled:fill-slate-500"
                            disabled={disabled}
                        />
                    ) : (
                        <></>
                    )}
                    <span className="w-full flex flex-col items-start">
                        {title.length > 3
                            ? title
                            : `${title.charAt(0)} ${title.charAt(1)}`}
                        <p className="text-xsm text-slate-300">{subTitle}</p>
                    </span>
                    {iconRight ? (
                        <Icon
                            name={iconRight}
                            className={joinClassName("absolute", "right-10")}
                        />
                    ) : (
                        <></>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onClickFav}
                    className={joinClassName(
                        "relative",
                        "flex",
                        "items-center",
                        "justify-center",
                        "transition",
                        "transition-width",
                        "h-12",
                        "min-h-[3rem]",
                        "w-12",
                        "rounded-lg",
                        "text-slate-100",
                        "hover:bg-blue-500/10",
                        "active:bg-blue-500/30",
                        "disabled:text-slate-400",
                        "disabled:hover:bg-blue-main",
                        "disabled:-ml-8",
                        active
                            ? invert
                                ? "text-blue-600 bg-blue-200 hover:bg-blue-200/50"
                                : "text-blue-500 bg-blue-900 hover:bg-blue-900/50"
                            : "",
                        className,
                        invert
                            ? joinClassName(
                                  "!text-blue-900",
                                  "!hover:bg-slate-100/10",
                                  "!active:bg-slate-200/30"
                              )
                            : ""
                    )}
                >
                    <Icon name={iconStar} className="absolute right-3" />
                </button>
            </div>
        );
    }

    if (open) {
        return (
            <button
                ref={ref}
                type="button"
                {...rest}
                title={title}
                disabled={disabled}
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
                    "text-slate-100",
                    "hover:bg-blue-500/10",
                    "active:bg-blue-500/30",
                    "disabled:text-slate-400",
                    "disabled:hover:bg-blue-main",
                    "disabled:-ml-2",
                    "disabled:hover:bg-inherit",
                    active
                        ? invert
                            ? "text-blue-600 bg-blue-200 hover:bg-blue-200/50"
                            : "text-blue-500 bg-blue-900 hover:bg-blue-900/50"
                        : "",
                    open
                        ? joinClassName("justify-start", "pl-6")
                        : joinClassName("justify-center"),
                    className,
                    invert
                        ? joinClassName(
                              "!text-blue-900",
                              "!hover:bg-slate-100/10",
                              "!active:bg-slate-200/30"
                          )
                        : ""
                )}
            >
                {iconLeft ? (
                    <Icon
                        name={iconLeft}
                        className="disabled:stroke-slate-500 disabled:fill-slate-500"
                        disabled={disabled}
                    />
                ) : (
                    <></>
                )}
                <span className="w-full flex flex-col items-start">
                    {title.length > 2
                        ? title
                        : `${title.charAt(0)} ${title.charAt(1)}`}
                    <p className="text-xsm text-slate-400">{subTitle}</p>
                </span>
                {iconRight ? (
                    <Icon
                        name={iconRight}
                        className={joinClassName("absolute", "right-3")}
                    />
                ) : (
                    <></>
                )}
            </button>
        );
    }

    return (
        <button
            ref={ref}
            type="button"
            {...rest}
            title={title}
            disabled={disabled}
            className={joinClassName(
                "ripple",
                "flex",
                "relative",
                "align-middle",
                "justify-center",
                "items-center",
                "select-none",
                "font-sans",
                "font-medium",
                "text-center",
                "uppercase",
                "transition-all",
                "rounded-lg",
                "h-12",
                "min-h-[3rem]",
                direction === "right" ? "w-12" : "w-0 lg:w-12",
                "text-white",
                "hover:bg-blue-500/10",
                "active:bg-blue-500/30",
                active
                    ? invert
                        ? "text-blue-600 bg-blue-200 hover:bg-blue-200/50"
                        : "text-blue-500 bg-blue-900 hover:bg-blue-900/50"
                    : "",
                "disabled:text-slate-400",
                "disabled:hover:bg-none",
                "disabled:opacity-50",
                "disabled:shadow-none",
                "disabled:pointer-events-none",
                invert
                    ? joinClassName(
                          "!text-blue-900",
                          "!bg-blue-200",
                          "!hover:bg-slate-100/10",
                          "!active:bg-slate-200/30"
                      )
                    : ""
            )}
        >
            {iconLeft ? (
                <Icon
                    name={iconLeft}
                    className="disabled:stroke-slate-500 disabled:fill-slate-500"
                    disabled={disabled}
                />
            ) : (
                <></>
            )}
        </button>
    );
});

const Container = (props: IContainerProps) => {
    const { id, open, toggle, children, direction = "left" } = props;

    const refMounted = useRef(false);
    const refDiv = useRef<HTMLDivElement>(null);

    const animateFade = useCallback(async () => {
        if (refMounted.current) {
            refDiv.current?.classList.remove("animate-show-open");
            refDiv.current?.classList.remove("animate-show-close");
            if (open) {
                refDiv.current?.classList.add(
                    "animate-show-open",
                    "z-50",
                    "fixed"
                );
            } else {
                refDiv.current?.classList.add(
                    "animate-show-close",
                    "z-50",
                    "fixed"
                );
                await sleep(300);
                refDiv.current?.classList.remove("fixed", "z-50");
            }
        }
    }, [open]);

    useEffect(() => {
        animateFade();
        refMounted.current = true;
    }, [open]);

    return (
        <>
            <div
                className={joinClassName(
                    "fixed",
                    "flex",
                    "flex-col",
                    "h-full",
                    "overflow-hidden",
                    "bg-gray-900/90",
                    "text-white",
                    "z-40",
                    "animate-show",
                    direction === "left"
                        ? joinClassName("rounded-tr-md", "left-0")
                        : joinClassName("rounded-tl-md", "right-0"),
                    open ? "w-full" : "w-0"
                )}
                onClick={toggle}
            />
            <div
                ref={refDiv}
                id={id}
                className={joinClassName(
                    "flex",
                    "flex-col",
                    "gap-1",
                    "h-full",
                    "items-center",
                    "justify-start",
                    "overflow-hidden",
                    "bg-blue-main",
                    "text-white",
                    "dark:bg-slate-950",
                    "p-1",
                    "lg:p-2",
                    "!pb-16",
                    "animate-show",
                    direction === "left"
                        ? joinClassName("rounded-tr-md", "left-0")
                        : joinClassName("rounded-tl-md", "right-0"),
                    open
                        ? joinClassName("w-96")
                        : joinClassName("w-0", "lg:w-16", "lg:min-w-[4rem]"),
                    direction === "right" ? "w-16" : ""
                )}
            >
                {children}
            </div>
        </>
    );
};

const Sidebar = {
    Container,
    Btn,
    Skeleton,
};

export { Sidebar };
