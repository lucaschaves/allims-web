import { cloneElement, forwardRef, isValidElement, useState } from "react";
import { createPortal } from "react-dom";
import { joinClassName } from "../../../utils";
import { ITooltipProps } from "./types.d";

const Tooltip = forwardRef<HTMLDivElement, ITooltipProps>(
    ({ text, children, placement = "top", ...rest }, ref) => {
        const [position, setPosition] = useState<{
            top: number;
            left: number;
        } | null>(null);

        const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            setPosition({
                left:
                    placement === "top"
                        ? bounds.width / 2 - bounds.x
                        : bounds.x,
                top:
                    placement === "top"
                        ? bounds.top - bounds.height
                        : bounds.y + bounds.height,
            });
        };

        const handleMouseOut = () => setPosition(null);

        const anchorProps = {
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
        };

        const anchor = isValidElement(children) ? (
            cloneElement(children, anchorProps)
        ) : (
            <span {...anchorProps}>{children}</span>
        );

        return (
            <>
                {anchor}
                {position &&
                    createPortal(
                        <div
                            className={joinClassName(
                                "flex",
                                "items-center",
                                "justify-center",
                                "fixed",
                                "z-10",
                                "pt-1"
                            )}
                            style={{
                                top: position.top,
                                left: position.left,
                            }}
                        >
                            <div
                                ref={ref}
                                className={joinClassName(
                                    "px-2",
                                    "py-1",
                                    "rounded-lg",
                                    "bg-slate-700",
                                    "text-white"
                                )}
                                {...rest}
                            >
                                {text}
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        );
    }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
