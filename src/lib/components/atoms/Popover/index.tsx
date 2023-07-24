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
        opacity: 0,
        left: 0,
    });

    useEffect(() => {
        if (open) {
            const element = ref.current?.getBoundingClientRect() || {
                top: 0,
                height: 0,
                left: 0,
                width: 0,
            };
            const clientWidth = ref.current?.clientWidth ?? 25;
            const clientHeight = ref.current?.clientHeight ?? 25;
            const objPos = {
                top: element.top + clientHeight / 4,
                opacity: 1,
                left: clientWidth + element.left,
            };
            if (objPos.left < 0) {
                objPos.left = 5;
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
                                "bg-white",
                                "ease-in-out",
                                "before:content-[' ']",
                                "before:absolute",
                                "before:top-4",
                                "before:-left-0.5",
                                "before:transform",
                                "before:-translate-x-1",
                                "before:-translate-y-2",
                                "before:rotate-45",
                                "before:w-4",
                                "before:h-4",
                                "before:bg-white",
                                "before:border-l",
                                "before:border-t",
                                "before:rounded",
                                "before:border-white"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            style={{
                                top: position.top,
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
