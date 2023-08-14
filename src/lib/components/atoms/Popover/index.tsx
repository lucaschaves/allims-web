import {
    ReactElement,
    ReactNode,
    cloneElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { joinClassName } from "../../../utils";

interface IPopoverProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
    content: ReactNode;
}

const Popover = (props: IPopoverProps) => {
    const { children, content, open, onClose } = props;

    const ref = useRef<HTMLElement>(null);
    const refContent = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({
        top: 0,
        bottom: -1,
        opacity: 0,
        left: 0,
        arrow: "left-top",
    });

    useEffect(() => {
        if (open) {
            const elementChildren = ref.current?.getBoundingClientRect() || {
                top: 0,
                height: 0,
                left: 0,
                width: 0,
                bottom: 0,
            };

            const elementContent =
                refContent.current?.getBoundingClientRect() || {
                    top: 0,
                    height: 0,
                    left: 0,
                    width: 0,
                    bottom: 0,
                };
            const clientWidth = ref.current?.clientWidth ?? 25;
            const clientHeight = ref.current?.clientHeight ?? 25;
            const objPos = {
                top: elementChildren.top + clientHeight / 4,
                opacity: 1,
                left: clientWidth + elementChildren.left,
                arrow: "left-top",
                bottom: 0,
            };
            if (objPos.left < 0) {
                objPos.left = 5;
            }
            const bodyWidth = document.body.getBoundingClientRect().width;
            const positionWidth = elementContent.width + objPos.left;
            if (bodyWidth <= positionWidth) {
                const newLeft = positionWidth - bodyWidth;
                objPos.left =
                    objPos.left - newLeft - elementChildren.width - 20;
                objPos.top = objPos.top + elementChildren.top + 20;
                objPos.arrow = "top-right";
            }
            const bodyHeight = document.body.getBoundingClientRect().height;
            const positionHeight = elementContent.height + objPos.top;

            if (bodyHeight <= positionHeight) {
                const newBottom = positionHeight - bodyHeight;
                const bottomPos =
                    objPos.bottom - newBottom - elementChildren.height - 20;

                objPos.top = -1;
                objPos.bottom = bottomPos >= 10 ? bottomPos : 10;
                objPos.arrow = "bottom-left";
            }

            setPosition(objPos);
        }
    }, [open]);

    return (
        <>
            {cloneElement(children, {
                ref,
            })}
            {open ? (
                createPortal(
                    <div
                        className={joinClassName(
                            "fixed",
                            "w-full",
                            "h-full",
                            "top-0",
                            "left-0",
                            "z-50"
                        )}
                        onClick={onClose}
                    >
                        <div
                            ref={refContent}
                            className={joinClassName(
                                "absolute",
                                "flex",
                                "items-center",
                                "justify-center",
                                "opacity-0",
                                "rounded",
                                "shadow-2xl",
                                "transition",
                                "duration-300",
                                "overflow-auto",
                                "bg-white",
                                "dark:bg-slate-800",
                                "before:content-[' ']",
                                "before:absolute",
                                "before:bg-white",
                                "before:border-white",
                                "dark:before:bg-slate-800",
                                "dark:before:border-slate-800",
                                "before:transform",
                                "before:w-4",
                                "before:h-4",
                                "before:rounded",
                                position.arrow === "left-top"
                                    ? joinClassName(
                                          "before:top-4",
                                          "before:-left-0.5",
                                          "before:-translate-x-1",
                                          "before:-translate-y-2",
                                          "before:rotate-45",
                                          "before:border-l",
                                          "before:border-t"
                                      )
                                    : position.arrow === "top-right"
                                    ? joinClassName(
                                          "before:top-0",
                                          "before:right-4",
                                          "before:-translate-x-2",
                                          "before:-translate-y-1.5",
                                          "before:rotate-45",
                                          "before:border-l",
                                          "before:border-r",
                                          "before:border-t"
                                      )
                                    : joinClassName("")
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            style={{
                                top: position.top > 0 ? position.top : "",
                                bottom:
                                    position.bottom > 0 ? position.bottom : "",
                                left: position.left,
                                opacity: position.opacity,
                                zIndex: 999,
                            }}
                        >
                            {content}
                        </div>
                    </div>,
                    document.body
                )
            ) : (
                <></>
            )}
        </>
    );
};

export { Popover };
