import { forwardRef, useEffect, useRef } from "react";
import { FiCheck, FiMinus } from "react-icons/fi";
import { ISkeletonProps } from "../../../types";
import { joinClassName } from "../../../utils";
import { ICheckboxProps } from "./types";

const CheckboxSkeleton = forwardRef<HTMLInputElement, ISkeletonProps>(
    ({ size = "md", ...rest }, ref) => {
        return (
            <div className={joinClassName("inline-flex", "items-center")}>
                <label
                    className={joinClassName(
                        "relative",
                        "flex",
                        "items-center",
                        "p-3",
                        "rounded-full",
                        "overflow-hidden"
                    )}
                >
                    <input
                        ref={ref}
                        type="checkbox"
                        className={joinClassName(
                            "ripple",
                            "peer",
                            "relative",
                            "appearance-none",
                            "w-5",
                            "h-5",
                            "border",
                            "rounded-md",
                            "border-gray-200",
                            "transition-all",
                            "bg-gray-200",
                            "animate-pulse",
                            "text-transparent"
                        )}
                        {...rest}
                    />
                </label>
            </div>
        );
    }
);

// const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
const Checkbox = (props: ICheckboxProps) => {
    const {
        id,
        className = "",
        color = "blue",
        size = "md",
        indeterminate = false,
        ...rest
    } = props;
    // ref

    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (refInput.current?.indeterminate) {
            refInput.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <div className={joinClassName("inline-flex", "items-center")}>
            <label
                htmlFor={id}
                className={joinClassName(
                    "relative",
                    "flex",
                    "items-center",
                    "cursor-pointer",
                    "p-3",
                    "rounded-full",
                    "overflow-hidden"
                )}
            >
                <input
                    id={id}
                    // ref={ref}
                    ref={refInput}
                    type="checkbox"
                    className={joinClassName(
                        "ripple",
                        "peer",
                        "relative",
                        "appearance-none",
                        "w-5",
                        "h-5",
                        "border",
                        "rounded-md",
                        "border-gray-200",
                        "cursor-pointer",
                        "transition-all",
                        "before:content['']",
                        "before:block",
                        "before:bg-gray-500",
                        "before:w-12",
                        "before:h-12",
                        "before:rounded-full",
                        "before:absolute",
                        "before:top-2/4",
                        "before:left-2/4",
                        "before:-translate-y-2/4",
                        "before:-translate-x-2/4",
                        "before:opacity-0",
                        "hover:before:opacity-10",
                        "before:transition-opacity",
                        indeterminate
                            ? "checked:bg-blue-50 checked:border-blue-500 checked:before:bg-blue-500"
                            : "checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500",
                        className
                    )}
                    {...rest}
                />
                <span
                    className={joinClassName(
                        "text-white",
                        "absolute",
                        "top-2/4",
                        "left-2/4",
                        "-translate-y-2/4",
                        "-translate-x-2/4",
                        "pointer-events-none",
                        "opacity-0",
                        "peer-checked:opacity-100",
                        "transition-opacit"
                    )}
                >
                    {indeterminate ? (
                        <FiMinus className="text-blue-500" />
                    ) : (
                        <FiCheck />
                    )}
                </span>
            </label>
        </div>
    );
};

Checkbox.displayName = "Checkbox";

export { Checkbox, CheckboxSkeleton };
