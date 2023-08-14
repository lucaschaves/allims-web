import { forwardRef } from "react";
import { ISkeletonProps, TVariant } from "../../../types";
import { joinClassName } from "../../../utils";
import { Icon } from "../Icon";
import { IInputProps } from "./types";

const defaultSizeCssDiv = {
    sm: "h-10 md:h-12",
    md: "h-12 sm:14",
    lg: "h-14 md: 16",
} as any;

const defaultSizeCssInput = {
    sm: "py-2 rounded-[7.8px] text-xs md:py-3",
    md: "py-3 rounded-[8px] text-sm lg:py-4",
    lg: "py-4 rounded-[8px] text-md md:py-3",
} as any;

const defaultSizeCssLabel = {
    sm: "peer-placeholder-shown:leading-[3.75]",
    md: "peer-placeholder-shown:leading-[4.1]",
    lg: "peer-placeholder-shown:leading-[4.45]",
} as any;

const inputColor = {
    amber: "",
    black: "",
    blue: "focus:border-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "focus:border-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "focus:border-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "focus:border-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const labelColor = {
    amber: "",
    black: "",
    blue: "peer-focus:after:!border-blue-500 peer-focus:text-blue-500 peer-focus:before:!border-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "peer-focus:after:!border-green-500 peer-focus:text-green-500 peer-focus:before:!border-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "peer-focus:after:!border-main-500 peer-focus:text-main-500 peer-focus:before:!border-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "peer-focus:after:!border-red-500 peer-focus:text-red-500 peer-focus:before:!border-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const variantType = {
    filled: joinClassName(
        "placeholder-shown:border",
        "placeholder-shown:border-gray-200",
        "placeholder-shown:border-t-gray-200",
        "border",
        "focus:border-2",
        "border-gray-200"
    ),
    text: joinClassName(
        "placeholder-shown:border-b",
        "placeholder-shown:border-gray-200",
        // "placeholder-shown:border-t-gray-200",
        "border-b",
        "focus:border-b-2",
        "border-gray-200",
        "rounded-none"
    ),
    outlined: "",
};

const InputSkeleton = forwardRef<HTMLInputElement, ISkeletonProps>(
    ({ size = "md", ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={joinClassName(
                    "peer",
                    "w-full",
                    "h-full",
                    "font-sans",
                    "font-normal",
                    "outline",
                    "outline-0",
                    "transition-all",
                    "border",
                    "border-t-transparent",
                    "dark:border-none",
                    "px-3",
                    "bg-gray-200",
                    "dark:bg-gray-800",
                    "animate-pulse",
                    "text-transparent",
                    "rounded-lg",
                    defaultSizeCssInput[size]
                )}
                {...rest}
            />
        );
    }
);

const Input = forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            label,
            className = "",
            error,
            success,
            disabled = false,
            variant = "filled",
            size = "md",
            color = "blue",
            icon,
            containerProps,
            ...rest
        },
        ref
    ) => {
        const { className: classNameContainer, ...restContainer } =
            containerProps || { className: "" };

        return (
            <div
                className={joinClassName(
                    `relative w-full min-w-[200px] `,
                    classNameContainer || "",
                    defaultSizeCssDiv[size]
                )}
                {...restContainer}
            >
                {icon && <Icon name={icon} />}
                <input
                    ref={ref}
                    className={joinClassName(
                        "peer",
                        "w-full",
                        "h-full",
                        "bg-transparent",
                        "text-gray-700",
                        "dark:text-white",
                        "font-sans",
                        "font-normal",
                        "outline",
                        "outline-0",
                        "focus:outline-0",
                        "disabled:bg-gray-50",
                        "disabled:border-0",
                        "transition-all",
                        "px-3",
                        label
                            ? joinClassName(
                                  "border-t-transparent",
                                  "focus:border-t-transparent"
                              )
                            : "",
                        className,
                        defaultSizeCssInput[size],
                        inputColor[color],
                        variantType[variant as TVariant]
                    )}
                    disabled={disabled}
                    {...rest}
                />
                {label ? (
                    <label
                        className={joinClassName(
                            "flex",
                            "w-full",
                            "h-full",
                            "select-none",
                            "pointer-events-none",
                            "absolute",
                            "left-0",
                            "font-normal",
                            "peer-placeholder-shown:text-gray-500",
                            "leading-tight",
                            "peer-focus:leading-tight",
                            "peer-disabled:text-transparent",
                            "peer-disabled:peer-placeholder-shown:text-gray-500",
                            "transition-all",
                            "-top-1.5",
                            "peer-placeholder-shown:text-sm",
                            "text-[11px]",
                            "peer-focus:text-[11px]before:content[' ']",
                            "before:block",
                            "before:box-border",
                            "before:w-2.5",
                            "before:h-1.5",
                            "before:mt-[6.5px]",
                            "before:mr-1",
                            "peer-placeholder-shown:before:border-transparent",
                            "before:rounded-tl-md",
                            "before:border-t",
                            "peer-focus:before:border-t-2",
                            "before:border-l",
                            "peer-focus:before:border-l-2",
                            "before:pointer-events-none",
                            "before:transition-all",
                            "peer-disabled:before:border-transparent",
                            "after:content[ ]",
                            "after:block after:flex-grow",
                            "after:box-border",
                            "after:w-2.5",
                            "after:h-1.5",
                            "after:mt-[6.5px]",
                            "after:ml-1",
                            "peer-placeholder-shown:after:border-transparent",
                            "after:rounded-tr-md after:border-t",
                            "peer-focus:after:border-t-2",
                            "after:border-r",
                            "peer-focus:after:border-r-2",
                            "after:pointer-events-none",
                            "after:transition-all",
                            "peer-disabled:after:border-transparent",
                            // "peer-placeholder-shown:leading-[3.75]",
                            "text-gray-400",
                            // "peer-focus:text-blue-500",
                            "before:border-gray-200",
                            // "peer-focus:before:!border-blue-50",
                            "after:border-gray-200",
                            // "peer-focus:after:!border-blue-500",
                            defaultSizeCssLabel[size],
                            labelColor[color]
                        )}
                    >
                        {label}
                    </label>
                ) : (
                    <></>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, InputSkeleton };
