import { Icon } from "@/lib";
import { joinClassName } from "@/utils";
import {
    ComponentProps,
    ReactNode,
    forwardRef,
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
    open?: boolean;
    active?: boolean;
    iconLeft?: string;
    iconRight?: string;
    invert?: boolean;
}

const Btn = forwardRef<HTMLButtonElement, IBtnProps>((props, ref) => {
    const {
        title = "AA",
        open,
        active,
        className = "",
        iconLeft,
        iconRight,
        disabled,
        invert,
        ...rest
    } = props;

    if (open) {
        return (
            <button
                ref={ref}
                type="button"
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
                    "w-full",
                    "rounded-lg",
                    "text-slate-100",
                    "hover:bg-blue-500/10",
                    "active:bg-blue-500/30",
                    "disabled:text-slate-500",
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
                <span>
                    {title.length > 3
                        ? title
                        : `${title.charAt(0)} ${title.charAt(1)}`}
                </span>
                {iconRight ? (
                    <Icon name={iconRight} className="absolute right-3" />
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
                "w-0 lg:w-12",
                "text-white",
                "hover:bg-blue-500/10",
                "active:bg-blue-500/30",
                active
                    ? invert
                        ? "text-blue-600 bg-blue-200 hover:bg-blue-200/50"
                        : "text-blue-500 bg-blue-900 hover:bg-blue-900/50"
                    : "",
                "disabled:text-slate-500",
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
            <Icon
                name={iconLeft ?? "FiPlay"}
                className="disabled:stroke-slate-500 disabled:fill-slate-500"
                disabled={disabled}
            />
        </button>
    );
});

const Container = (props: IContainerProps) => {
    const { id, open, toggle, children, direction = "left" } = props;

    const refMounted = useRef(false);
    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refMounted.current) {
            refDiv.current?.classList.remove("animate-show-open");
            refDiv.current?.classList.remove("animate-show-close");
            if (open) {
                refDiv.current?.classList.add("animate-show-open");
            } else {
                refDiv.current?.classList.add("animate-show-close");
            }
        }
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
                    "bg-gray-900/50",
                    "text-white",
                    "z-40",
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
                    open ? "fixed" : "",
                    "flex",
                    "flex-col",
                    "h-full",
                    "items-center",
                    "justify-start",
                    "overflow-hidden",
                    "bg-blue-main",
                    "text-white",
                    "p-0",
                    "lg:p-2",
                    "animate-show",
                    direction === "left"
                        ? joinClassName("rounded-tr-md", "left-0")
                        : joinClassName("rounded-tl-md", "right-0"),
                    open
                        ? joinClassName("w-96", "z-50")
                        : joinClassName("w-0", "lg:w-16", "lg:min-w-[4rem]")
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
};

export { Sidebar };
