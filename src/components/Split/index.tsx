import { joinClassName } from "@/utils";
import { cloneElement, createContext, useRef } from "react";

let x = 0;
let y = 0;
let leftWidth = 0;

const hasTablet = false;

type TDirection = "row" | "row-reverse" | "col" | "col-reverse";

interface ISplitContext {
    open: boolean;
}

const SplitContext = createContext({} as ISplitContext);

interface IContainerProps {
    children: any;
    open?: boolean;
    hasPin?: boolean;
}

interface IPanelProps {
    children: any;
    direction?: TDirection;
}

const PanelRight = ({ children, direction = "row" }: IPanelProps) => (
    <SplitContext.Consumer>
        {({ open }) => (
            <div
                className={joinClassName(
                    "flex",
                    `flex-${direction}`,
                    open ? "w-full h-full" : "w-16"
                )}
            >
                {children}
            </div>
        )}
    </SplitContext.Consumer>
);

const PanelLeft = ({ children, direction = "row" }: IPanelProps) => (
    <SplitContext.Consumer>
        {() => (
            <div
                className={joinClassName(
                    "flex",
                    `flex-${direction}`,
                    "w-full h-full"
                )}
            >
                {children}
            </div>
        )}
    </SplitContext.Consumer>
);

const Container = ({
    children,
    open = false,
    hasPin = false,
}: IContainerProps) => {
    const refResize = useRef<any>(null);
    const refResizeLeft = useRef<any>(null);
    const refResizeRight = useRef<any>(null);

    const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - x;
        if (
            refResizeLeft.current &&
            refResize.current &&
            refResize.current.parentNode &&
            refResizeRight.current
        ) {
            const newLeftWidth =
                ((leftWidth + dx) * 100) /
                refResize.current.parentNode.getBoundingClientRect().width;
            if (refResizeLeft.current && refResize.current) {
                refResizeLeft.current.style.width = `${newLeftWidth}%`;
                refResize.current.style.cursor = "col-resize";
                refResizeLeft.current.style.userSelect = "none";
                refResizeLeft.current.style.pointerEvents = "none";
            }
            refResizeRight.current.style.userSelect = "none";
            refResizeRight.current.style.pointerEvents = "none";
        }
    };

    const mouseUpHandler = () => {
        if (
            refResizeLeft.current &&
            refResize.current &&
            refResizeRight.current
        ) {
            refResize.current.style.removeProperty("cursor");
            document.body.style.removeProperty("cursor");

            refResizeLeft.current.style.removeProperty("user-select");
            refResizeLeft.current.style.removeProperty("pointer-events");

            refResizeRight.current.style.removeProperty("user-select");
            refResizeRight.current.style.removeProperty("pointer-events");

            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }
    };

    const mouseDownHandler = (event: any) => {
        x = event.clientX;
        y = event.clientY;
        if (refResizeLeft.current) {
            leftWidth = refResizeLeft.current.getBoundingClientRect().width;

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
            document.body.style.cursor = "col-resize";
        }
    };

    return (
        <SplitContext.Provider
            value={{
                open,
            }}
        >
            <div className={joinClassName("flex", "w-full", "h-full")}>
                <div
                    ref={refResizeLeft}
                    className={joinClassName(
                        "bg-slate-300",
                        "h-full",
                        "flex",
                        "flex-col",
                        "gap-1",
                        "overflow-hidden",
                        hasPin ? "w-0 z-0" : "w-full"
                    )}
                    style={{
                        width: hasPin ? "0%" : open ? "" : "100%",
                    }}
                >
                    {children ? cloneElement(children[0]) : <></>}
                </div>

                <div
                    ref={refResize}
                    className={joinClassName(
                        hasPin ? "hidden" : "",
                        hasTablet
                            ? ""
                            : joinClassName(
                                  "w-2",
                                  "h-full",
                                  "bg-slate-400",
                                  "hover:bg-slate-500",
                                  "duration-300",
                                  "transition-width",
                                  "rounded",
                                  "hover:w-4",
                                  "cursor-ew-resize"
                              ),
                        open ? "" : "hidden",
                        "duration-300",
                        "ease-in-out",
                        "transition-width"
                    )}
                    onMouseDown={mouseDownHandler}
                ></div>
                <div
                    ref={refResizeRight}
                    className={joinClassName(
                        "flex",
                        "h-full",
                        "flex-1",
                        "duration-300",
                        "ease-in-out",
                        "transition-width",
                        hasPin ? "w-full" : "w-auto",
                        open ? "w-full min-w-[200px]" : "w-16"
                    )}
                >
                    {children ? cloneElement(children[1]) : <></>}
                </div>
            </div>
        </SplitContext.Provider>
    );
};

const Split = {
    Container,
    PanelLeft,
    PanelRight,
};

export { Split };
