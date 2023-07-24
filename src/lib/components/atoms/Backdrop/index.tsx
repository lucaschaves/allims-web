import { forwardRef } from "react";
import { joinClassName } from "../../../utils";
import { IBackdropProps } from "./types.d";

const Backdrop = forwardRef<HTMLDivElement, IBackdropProps>(
    ({ ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={joinClassName(
                    "inset-0",
                    "flex",
                    "items-center",
                    "justify-center",
                    "overflow-hidden",
                    "transition-all",
                    "duration-300",
                    "ease-in-out",
                    "z-20",
                    "w-full",
                    "h-full",
                    "m-0",
                    "p-0",
                    "bg-black/30",
                    "blur-sm",
                    "fixed"
                )}
                {...rest}
            ></div>
        );
    }
);

Backdrop.displayName = "Backdrop";

export { Backdrop };
