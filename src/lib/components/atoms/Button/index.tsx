import { forwardRef } from "react";
import { ISkeletonProps, TColor } from "../../../types";
import { joinClassName } from "../../../utils";
import { IButtonProps } from "./types.d";

const defaultSizeCss = {
    sm: "text-xs py-2 px-3 md:text-xs md:py-3 md:px-4 lg:text-md lg:py-3 lg:px-5",
    md: "text-xs py-3 px-4 md:text-md md:py-4 md:px-6 lg:text-md lg:py-4 lg:px-8",
    lg: "text-sm py-4 px-5 md:text-sm md:px-2.5 md:py-5 lg:text-md lg:py-4 lg:px-8",
} as any;

export const filled = {
    amber: "",
    black: "",
    blue: "bg-blue-500 text-white shadow-gray-500/20 hover:shadow-blue-500/40",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "bg-green-500 text-white shadow-green-gray-500/20 hover:shadow-green-500/40",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "bg-main-500 text-white shadow-main-gray-500/20 hover:shadow-main-500/40",
    orange: "",
    purple: "",
    pink: "",
    red: "bg-red-500 text-white shadow-red-gray-500/20 hover:shadow-red-500/40",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
};

export const outlined = {
    amber: "",
    black: "",
    blue: "border-blue-500 text-blue-500 focus:ring-blue-200",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "border-green-500 text-green-500 focus:ring-green-200",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "border-main-500 text-main-500 focus:ring-main-200",
    orange: "",
    purple: "",
    pink: "",
    red: "border-red-500 text-red-500 focus:ring-red-200",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

export const text = {
    amber: "",
    black: "",
    blue: "text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    gray: "text-gray-700 hover:bg-gray-700/10 active:bg-gray-700/30",
    green: "text-green-500 hover:bg-green-500/10 active:bg-green-500/30",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "text-main-500 hover:bg-main-500/10 active:bg-main-500/30",
    orange: "",
    purple: "",
    pink: "",
    red: "text-red-500 hover:bg-red-500/10 active:bg-red-500/30",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const cssVariantAndColor = (color: TColor) =>
    ({
        filled: joinClassName(
            "shadow-md",
            "hover:shadow-lg",
            "focus:opacity-[0.85]",
            "focus:shadow-none",
            "active:opacity-[0.85]",
            "active:shadow-none",
            filled[color]
        ),
        outlined: joinClassName(
            "border",
            "hover:opacity-75",
            "focus:ring",
            "active:opacity-[0.85]",
            outlined[color]
        ),
        text: joinClassName(text[color]),
    } as any);

const ButtonSkeleton = forwardRef<HTMLDivElement, ISkeletonProps>(
    ({ fullWidth = false, size = "md", ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={joinClassName(
                    "bg-gray-200",
                    "animate-pulse",
                    "text-transparent",
                    "rounded-lg",
                    "shadow-md",
                    defaultSizeCss[size],
                    fullWidth ? "w-full" : ""
                )}
                {...rest}
            >
                -
            </div>
        );
    }
);

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {
            children,
            className = "",
            fullWidth = false,
            variant = "filled",
            size = "md",
            color = "blue",
            ...rest
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={joinClassName(
                    "ripple",
                    "align-middle",
                    "select-none",
                    "font-sans",
                    "font-bold",
                    "text-center",
                    "uppercase",
                    "flex",
                    "items-center",
                    "gap-2",
                    "transition-all",
                    "disabled:opacity-50",
                    "disabled:shadow-none",
                    "disabled:pointer-events-none",
                    "rounded-lg",
                    "hover:shadow-lg",
                    "focus:opacity-[0.85]",
                    "focus:shadow-none",
                    "active:opacity-[0.85]",
                    "active:shadow-none",
                    cssVariantAndColor(color)[variant],
                    defaultSizeCss[size],
                    fullWidth ? "w-full" : "",
                    className
                )}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, ButtonSkeleton };
