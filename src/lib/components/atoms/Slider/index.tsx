import { forwardRef, useState } from "react";
import { joinClassName } from "../../../utils";
import { ISliderProps } from "./types";

const defaultSizeCssDiv = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
} as any;

const defaultSizeCssInput = {
    sm: "&::-moz-range-thumb]:w-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-moz-range-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:-mt-[3px]",

    md: "&::-moz-range-thumb]:w-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-moz-range-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:-mt-[3px]",

    lg: "&::-moz-range-thumb]:w-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:-mt-1 [&::-webkit-slider-thumb]:-mt-1",
} as any;

const sliderColor = {
    amber: "",
    black: "",
    blue: "text-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "text-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "text-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "text-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const Slider = forwardRef<HTMLInputElement, ISliderProps>(
    ({ variant = "filled", color = "blue", size = "md", ...rest }, ref) => {
        const [value, setValue] = useState(20);
        return (
            <div
                className={joinClassName(
                    "relative",
                    "w-full",
                    "min-w-[200px]",
                    // "text-blue-500",
                    // "h-2",
                    defaultSizeCssDiv[size],
                    sliderColor[color]
                )}
            >
                <label
                    className={joinClassName(
                        "absolute",
                        "inset-0",
                        "z-10",
                        "rounded-l-full",
                        "h-full",
                        "pointer-events-none",
                        "bg-current"
                    )}
                    style={{
                        width: `${value}%`,
                    }}
                ></label>
                <input
                    ref={ref}
                    className={joinClassName(
                        "w-full",
                        "absolute",
                        "inset-0",
                        "bg-transparent",
                        "cursor-pointer",
                        "focus:outline-none",
                        "focus:outline-0",
                        "appearance-none",
                        "[-webkit-appearance:none]",
                        "[&::-webkit-slider-runnable-track]:h-full",
                        "[&::-moz-range-track]:h-full",
                        "[&::-webkit-slider-runnable-track]:rounded-full",
                        "[&::-moz-range-track]:rounded-full",
                        "[&::-webkit-slider-runnable-track]:bg-gray-100",
                        "[&::-moz-range-track]:bg-gray-100",
                        "[&::-moz-range-thumb]:appearance-none",
                        "[&::-moz-range-thumb]:[-webkit-appearance:none]",
                        "[&::-webkit-slider-thumb]:appearance-none",
                        "[&::-webkit-slider-thumb]:[-webkit-appearance:none]",
                        "[&::-moz-range-thumb]:rounded-full",
                        "[&::-webkit-slider-thumb]:rounded-full",
                        "[&::-moz-range-thumb]:border-0",
                        "[&::-webkit-slider-thumb]:border-0",
                        "[&::-moz-range-thumb]:ring-2",
                        "[&::-webkit-slider-thumb]:ring-2",
                        "[&::-moz-range-thumb]:ring-current",
                        "[&::-webkit-slider-thumb]:ring-current",
                        "[&::-moz-range-thumb]:bg-white",
                        "[&::-webkit-slider-thumb]:bg-white",
                        "[&::-moz-range-thumb]:relative",
                        "[&::-webkit-slider-thumb]:relative",
                        "[&::-moz-range-thumb]:z-20",
                        "[&::-webkit-slider-thumb]:z-20",
                        // "[&::-moz-range-thumb]:w-3.5",
                        // "[&::-webkit-slider-thumb]:w-3.5",
                        // "[&::-moz-range-thumb]:h-3.5",
                        // "[&::-webkit-slider-thumb]:h-3.5",
                        // "[&::-moz-range-thumb]:-mt-[3px]",
                        // "[&::-webkit-slider-thumb]:-mt-[3px]",
                        defaultSizeCssInput[size]
                    )}
                    type="range"
                    value={value}
                    onChange={(e) => setValue(e.target.valueAsNumber)}
                    {...rest}
                />
            </div>
        );
    }
);

Slider.displayName = "Slider";

export { Slider };
