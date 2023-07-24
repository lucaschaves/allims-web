import { forwardRef } from "react";
import { ISkeletonProps, TColor } from "../../../types";
import { joinClassName } from "../../../utils";
import { filled, outlined, text } from "../Button";
import { IIconButtonProps } from "./types.d";

const defaultSizeCss = {
    sm: "text-xs w-8 max-w-[32px] h-8 max-h-[32px] sm:text-xs sm:w-9 sm:max-w-[34px] sm:h-9 sm:max-h-[34px] md:text-xs md:w-10 md:max-w-[36px] md:h-10 md:max-h-[36px]",
    md: "text-xs w-10 max-w-[40px] h-10 max-h-[40px] sm:text-sm sm:w-11 sm:max-w-[42px] sm:h-11 sm:max-h-[42px] md:text-sm md:w-12 md:max-w-[44px] md:h-12 md:max-h-[44px]",
    lg: "text-lg w-12 max-w-[48px] h-12 max-h-[48px] sm:text-sm sm:w-13 sm:max-w-[50px] sm:h-13 sm:max-h-[50px] md:text-lg md:w-14 md:max-w-[52px] md:h-14 md:max-w-[52px]",
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

const IconButtonSkeleton = (props: ISkeletonProps) => {
    const { fullWidth = false, size = "md", ...rest } = props;

    return (
        <div
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
                "bg-gray-200",
                "animate-pulse",
                "text-transparent",
                "rounded-lg",
                defaultSizeCss[size],
                fullWidth ? "w-full" : ""
            )}
            {...rest}
        >
            -
        </div>
    );
};

const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
    (
        {
            children,
            type = "button",
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
                    "disabled:opacity-50",
                    "disabled:shadow-none",
                    "disabled:pointer-events-none",
                    "rounded-lg",
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

IconButton.displayName = "Button";

export { IconButton, IconButtonSkeleton };
