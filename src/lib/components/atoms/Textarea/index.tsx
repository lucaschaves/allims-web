//tamanho responsivo - o site só tem os tamanhos md e lg

import { forwardRef } from "react";
import { ISkeletonProps } from "../../../types";
import { joinClassName } from "../../../utils";
import { ITextareaProps } from "./types";

const defaultSizeCssTextArea = {
    sm: "min-h-[30px] sm:min-h-[15px] md:min-h-[30px] lg:min-h-[45px]",
    md: "min-h-[70px] sm:min-h-[30px] md:min-h-[45px] lg:min-h-[60px]",
    lg: "min-h-[100px] sm:min-h-[50px] md:min-h-[65px] lg:min-h-[80px]",
} as any;

const defaultSizeCssLabel = {
    sm: "peer-placeholder-shown:leading-[3.75]",
    md: "peer-placeholder-shown:leading-[4]",
    lg: "peer-placeholder-shown:leading-[4.25]",
} as any;

const textAreaColor = {
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
    blue: "peer-focus:text-blue-500 peer-focus:before:!border-blue-500 peer-focus:after:!border-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "peer-focus:text-green-500 peer-focus:before:!border-green-500 peer-focus:after:!border-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "peer-focus:text-main-500 peer-focus:before:!border-main-500 peer-focus:after:!border-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "peer-focus:text-red-500 peer-focus:before:!border-red-500 peer-focus:after:!border-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const TextareaSkeleton = (props: ISkeletonProps) => {
    const { size = "md", ...rest } = props;

    return (
        <div className={joinClassName("relative", "w-full", "min-w-[200px]")}>
            <div
                className={joinClassName(
                    "peer",
                    "w-full",
                    "h-full",
                    "font-sans",
                    "font-normal",
                    "outline",
                    "outline-0",
                    "resize-y",
                    "transition-all",
                    "border",
                    "text-sm",
                    "px-3",
                    "py-2.5",
                    "rounded-[7px]",
                    "!resize-none",
                    "bg-gray-200",
                    "animate-pulse",
                    defaultSizeCssTextArea[size]
                )}
                {...rest}
            />
        </div>
    );
};

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
    (
        {
            label,
            children,
            className = "",
            error,
            success,
            disabled = false,
            variant = "",
            size = "md",
            color = "blue",
            icon,
            ...rest
        },
        ref
    ) => {
        return (
            <div
                className={joinClassName("relative", "w-full", "min-w-[200px]")}
            >
                <textarea
                    ref={ref}
                    className={joinClassName(
                        "peer",
                        "w-full",
                        "h-full",
                        // "min-h-[100px]",
                        "bg-transparent",
                        "text-gray-700",
                        "font-sans",
                        "font-normal",
                        "outline",
                        "outline-0",
                        "focus:outline-0",
                        "resize-y",
                        "disabled:bg-gray-50",
                        "disabled:border-0",
                        "disabled:resize-none",
                        "transition-all",
                        "placeholder-shown:border",
                        "placeholder-shown:border-gray-200",
                        "placeholder-shown:border-t-gray-200",
                        "border",
                        "focus:border-2",
                        "border-t-transparent",
                        "focus:border-t-transparent",
                        "text-sm",
                        "px-3",
                        "py-2.5",
                        "rounded-[7px]",
                        "border-gray-200",
                        "focus:border-blue-500",
                        "!resize-none",
                        defaultSizeCssTextArea[size],
                        textAreaColor[color]
                    )}
                    {...rest}
                >
                    {children}
                </textarea>
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
                        "peer-focus:text-[11px]",
                        "before:content[' ']",
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
                        "after:content[' ']",
                        "after:block",
                        "after:flex-grow",
                        "after:box-border",
                        "after:w-2.5",
                        "after:h-1.5",
                        "after:mt-[6.5px]",
                        "after:ml-1",
                        "peer-placeholder-shown:after:border-transparent",
                        "after:rounded-tr-md",
                        "after:border-t",
                        "peer-focus:after:border-t-2 after:border-r",
                        "peer-focus:after:border-r-2",
                        "after:pointer-events-none",
                        "after:transition-all",
                        "peer-disabled:after:border-transparent",
                        // "peer-placeholder-shown:leading-[3.75]",
                        "text-gray-400",
                        // "peer-focus:text-blue-500",
                        "before:border-gray-200",
                        // "peer-focus:before:!border-blue-500",
                        "after:border-gray-200",
                        // "peer-focus:after:!border-blue-500",
                        defaultSizeCssLabel[size],
                        labelColor[color]
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea, TextareaSkeleton };
