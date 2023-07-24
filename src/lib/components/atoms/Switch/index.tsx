import { forwardRef } from "react";
import { joinClassName } from "../../../utils";
import { ISwitchProps } from "./types";

const inputColor = {
    amber: "",
    black: "",
    blue: "checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "checked:bg-green-500 peer-checked:border-green-500 peer-checked:before:bg-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "checked:bg-main-500 peer-checked:border-main-500 peer-checked:before:bg-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const labelColor = {
    amber: "",
    black: "",
    blue: "peer-checked:border-blue-500 peer-checked:before:bg-blue-500",
    gray: "",
    brown: "",
    current: "",
    cyan: "",
    "deep-orange": "",
    "deep-purple": "",
    green: "peer-checked:border-green-500 peer-checked:before:bg-green-500",
    indigo: "",
    inherit: "",
    "light-blue": "",
    "light-green": "",
    lime: "",
    main: "peer-checked:border-main-500 peer-checked:before:bg-main-500",
    orange: "",
    purple: "",
    pink: "",
    red: "peer-checked:border-red-500 peer-checked:before:bg-red-500",
    teal: "",
    transparent: "",
    white: "",
    yellow: "",
} as any;

const Switch = forwardRef<HTMLInputElement, ISwitchProps>(
    ({ id, variant = "filled", color = "blue", size = "md", ...rest }, ref) => {
        return (
            <div className="relative inline-block w-8 h-4 cursor-pointer rounded-full ripple">
                <input
                    ref={ref}
                    id={id}
                    className={joinClassName(
                        "peer",
                        "appearance-none",
                        "w-8",
                        "h-4",
                        "absolute",
                        "bg-gray-100",
                        "rounded-full",
                        "cursor-pointer",
                        "transition-colors",
                        "duration-300",
                        inputColor[color]
                    )}
                    type="checkbox"
                    {...rest}
                />
                <label
                    className={joinClassName(
                        "ripple",
                        "bg-white",
                        "w-5",
                        "h-5",
                        "border",
                        "border-gray-100",
                        "rounded-full",
                        "shadow-md",
                        "absolute",
                        "top-2/4",
                        "-left-1",
                        "-translate-y-2/4",
                        "peer-checked:translate-x-full",
                        "transition-all",
                        "duration-300",
                        "cursor-pointer",
                        "before:content['']",
                        "before:block",
                        "before:bg-gray-500",
                        "before:w-10",
                        "before:h-10",
                        "before:rounded-full",
                        "before:absolute",
                        "before:top-2/4",
                        "before:left-2/4",
                        "before:-translate-y-2/4",
                        "before:-translate-x-2/4",
                        "before:transition-opacity",
                        "before:opacity-0",
                        "hover:before:opacity-10",
                        "peer-checked:border-blue-500",
                        "peer-checked:before:bg-blue-500",
                        labelColor[color]
                    )}
                    htmlFor={id}
                >
                    <div
                        className={joinClassName(
                            "inline-block",
                            "top-2/4",
                            "left-2/4",
                            "-translate-x-2/4",
                            "-translate-y-2/4",
                            "p-5",
                            "rounded-full",
                            "ripple"
                        )}
                    ></div>
                </label>
            </div>
        );
    }
);

Switch.displayName = "Switch";

export { Switch };
