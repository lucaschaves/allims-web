import { forwardRef } from "react";
import { ISkeletonProps } from "../../../types";
import { joinClassName } from "../../../utils";
import { IBadgeProps } from "./types.d";

const defaultSizeCss = {
    sm: "py-0.5 px-1",
    md: "py-1 px-1.5",
    lg: "py-1.5 px-2",
} as any;

const badgeColor = {
    amber: "",
    black: "",
    blue: "bg-blue-500 text-white",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "bg-green-500 text-white",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "bg-main-500 text-white",
    orange: "",
    purple: "",
    pink: "",
    red: "bg-red-500 text-white",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const cssPlacement = {
    topStart: joinClassName(
        `-translate-x-2/4`,
        `-translate-y-2/4`,
        "top-[4%]",
        "left-[2%]"
    ),
    topEnd: joinClassName(
        `translate-x-2/4`,
        `-translate-y-2/4`,
        `top-[4%]`,
        `right-[2%]`
    ),
    bottomStart: joinClassName(
        `-translate-x-2/4`,
        `translate-y-2/4`,
        `bottom-[4%]`,
        `left-[2%]`
    ),
    bottomEnd: joinClassName(
        `translate-x-2/4`,
        `translate-y-2/4`,
        "bottom-[4%]",
        "right-[2%]"
    ),
} as any;

const BadgeSkeleton = forwardRef<HTMLDivElement, ISkeletonProps>(
    ({ size = "md", ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className="relative inline-flex w-max text-transparent"
                {...rest}
            >
                <span
                    ref={ref}
                    className={joinClassName(
                        "ripple",
                        "absolute",
                        "min-w-[14px]",
                        "min-h-[14px]",
                        "rounded-full",
                        // "py-1",
                        // "px-1.5",
                        "text-xs",
                        "font-medium",
                        "content-['']",
                        "leading-none",
                        "grid",
                        "place-items-center",
                        "bg-gray-200",
                        "animate-pulse",
                        "text-transparent",
                        defaultSizeCss[size]
                    )}
                    {...rest}
                ></span>
            </div>
        );
    }
);

const Badge = forwardRef<HTMLDivElement, IBadgeProps>(
    (
        {
            children,
            className = "",
            label,
            color = "blue",
            placement = "topStart",
            size = "md",
            ...rest
        },
        ref
    ) => {
        return (
            <div ref={ref} className="relative inline-flex w-max" {...rest}>
                {children}
                <span
                    ref={ref}
                    className={joinClassName(
                        "ripple",
                        "absolute",
                        "min-w-[14px]",
                        "min-h-[14px]",
                        "rounded-full",
                        // "py-1",
                        // "px-1.5",
                        "text-xs",
                        "font-medium",
                        "content-['']",
                        "leading-none",
                        "grid",
                        "place-items-center",
                        cssPlacement[placement],
                        badgeColor[color],
                        defaultSizeCss[size],
                        className
                    )}
                    {...rest}
                >
                    {label}
                </span>
            </div>
        );
    }
);

Badge.displayName = "Badge";

export { Badge, BadgeSkeleton };
