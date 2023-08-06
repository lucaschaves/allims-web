import {
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import { Icon, IconButton, joinClassName } from "../../../";

let x = 0;
let y = 0;
let prev_height = 0;
let prev_width = 0;

interface IContainerProps {
    childrenLeft: ReactNode;
    childrenRight: ReactNode;
    hasButton?: boolean;
    direction?: "col" | "row";
    disabled?: boolean;
    handleResizeStart?: () => void;
}

export type ISplitRef = {
    reset(): void;
};

const Split = forwardRef<ISplitRef, IContainerProps>((props, ref) => {
    const {
        childrenLeft,
        childrenRight,
        direction = "row",
        hasButton = false,
        disabled = false,
        handleResizeStart = () => ({}),
    } = props;

    const refContainer = useRef<HTMLDivElement>(null);
    const refRight = useRef<HTMLDivElement>(null);
    const refLeft = useRef<HTMLDivElement>(null);
    const refResize = useRef<HTMLDivElement>(null);

    const mouseMoveHandler = function (e: any) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        if (
            refLeft.current &&
            refRight.current &&
            refResize.current &&
            refResize.current?.parentNode
        ) {
            switch (direction) {
                case "col":
                    // eslint-disable-next-line no-case-declarations
                    const h =
                        ((prev_height + dy) * 100) /
                        (
                            refResize.current.parentNode as HTMLDivElement
                        )?.getBoundingClientRect().height;
                    refLeft.current.style.height = `${h}%`;
                    break;
                case "row":
                default:
                    // eslint-disable-next-line no-case-declarations
                    const w =
                        ((prev_width + dx) * 100) /
                        (
                            refResize.current.parentNode as HTMLDivElement
                        )?.getBoundingClientRect().width;
                    refLeft.current.style.width = `${w}%`;
                    break;
            }

            const cursor = direction === "row" ? "col-resize" : "row-resize";

            refResize.current.style.cursor = cursor;
            document.body.style.cursor = cursor;

            refLeft.current.style.userSelect = "none";
            refLeft.current.style.pointerEvents = "none";

            refRight.current.style.userSelect = "none";
            refRight.current.style.pointerEvents = "none";
        }
    };

    const mouseDownHandler = function (e: any) {
        handleResizeStart();

        x = e.clientX;
        y = e.clientY;
        const rect = refLeft.current?.getBoundingClientRect() || {
            height: 0,
            width: 0,
        };
        prev_height = rect.height;
        prev_width = rect.width;

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseUpHandler = function () {
        refResize.current?.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");

        refLeft.current?.style.removeProperty("user-select");
        refLeft.current?.style.removeProperty("pointer-events");

        refRight.current?.style.removeProperty("user-select");
        refRight.current?.style.removeProperty("pointer-events");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    const touchMoveHandler = function (e: TouchEvent) {
        const dx = e.touches[0].clientX - x;
        const dy = e.touches[0].clientY - y;
        if (
            refLeft.current &&
            refRight.current &&
            refResize.current &&
            refResize.current?.parentNode
        ) {
            switch (direction) {
                case "col":
                    // eslint-disable-next-line no-case-declarations
                    const h =
                        ((prev_height + dy) * 100) /
                        (
                            refResize.current.parentNode as HTMLDivElement
                        )?.getBoundingClientRect().height;

                    refLeft.current.style.height = `${h}%`;
                    break;
                case "row":
                default:
                    // eslint-disable-next-line no-case-declarations
                    const w =
                        ((prev_width + dx) * 100) /
                        (
                            refResize.current.parentNode as HTMLDivElement
                        )?.getBoundingClientRect().width;

                    refLeft.current.style.width = `${w}%`;
                    break;
            }

            refLeft.current.style.userSelect = "none";
            refLeft.current.style.pointerEvents = "none";

            refRight.current.style.userSelect = "none";
            refRight.current.style.pointerEvents = "none";
        }
    };

    const touchStartHandler = function (e: any) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        const rect = refLeft.current?.getBoundingClientRect() || {
            height: 0,
            width: 0,
        };

        prev_height = rect.height;
        prev_width = rect.width;

        document.addEventListener("touchmove", touchMoveHandler);
        document.addEventListener("touchend", touchEndHandler);
    };

    const touchEndHandler = function () {
        refLeft.current?.style.removeProperty("user-select");
        refLeft.current?.style.removeProperty("pointer-events");

        refRight.current?.style.removeProperty("user-select");
        refRight.current?.style.removeProperty("pointer-events");

        document.removeEventListener("touchmove", touchMoveHandler);
        document.removeEventListener("touchend", touchEndHandler);
    };

    const reset = useCallback(() => {
        if (refLeft.current?.style) {
            refLeft.current.style.width = "100%";
        }
    }, [refLeft]);

    useImperativeHandle(
        ref,
        () => ({
            reset,
        }),
        [reset]
    );

    return (
        <div
            ref={refContainer}
            className={joinClassName(
                "w-full",
                "h-full",
                "transition-width",
                "duration-500",
                "overflow-hidden",
                "flex",
                `flex-${direction}`
            )}
        >
            <div
                ref={refLeft}
                className={joinClassName("transition-width", "w-full")}
            >
                {childrenLeft}
            </div>
            {hasButton ? (
                <div
                    className={joinClassName(
                        "relative",
                        "flex",
                        "items-end",
                        "justify-end",
                        "border-2",
                        "border-slate-100",
                        disabled ? "hidden" : ""
                    )}
                    ref={refResize}
                    onMouseDown={mouseDownHandler}
                    onTouchStart={touchStartHandler}
                >
                    <IconButton
                        size="sm"
                        className={joinClassName(
                            "!absolute",
                            direction === "col"
                                ? joinClassName(
                                      "right-3",
                                      "-top-4",
                                      "md:-top-5"
                                  )
                                : joinClassName(
                                      "bottom-24",
                                      "-right-3",
                                      "md:bottom-32",
                                      "md:-right-4"
                                  ),
                            disabled ? "hidden" : ""
                        )}
                    >
                        <Icon name="AiOutlineHolder" size="1.5rem" />
                    </IconButton>
                </div>
            ) : (
                <div
                    className={joinClassName(
                        "transition",
                        "delay-150",
                        "duration-300",
                        "border-2",
                        "border-slate-200",
                        "hover:scale-150",
                        "hover:border-slate-400",
                        direction === "col"
                            ? joinClassName(
                                  "cursor-ns-resize",
                                  "w-full",
                                  "hover:-translate-x-1"
                              )
                            : joinClassName(
                                  "cursor-ew-resize",
                                  "h-full",
                                  "hover:-translate-y-1"
                              ),
                        disabled ? "hidden" : ""
                    )}
                    ref={refResize}
                    onMouseDown={mouseDownHandler}
                    onTouchStart={touchStartHandler}
                />
            )}
            <div
                ref={refRight}
                className={joinClassName("flex-1", disabled ? "w-0" : "")}
            >
                {childrenRight}
            </div>
        </div>
    );
});

export { Split };
