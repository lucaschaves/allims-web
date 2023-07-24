import { forwardRef, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "../../../components";
import { joinClassName } from "../../../utils";
import { IModalProps } from "./types";

const WRAPPER_ID = "allims-ui-modal";

const Modal = forwardRef<HTMLDivElement, IModalProps>(
    (
        {
            children,
            wrapperId,
            isOpen = false,
            block = false,
            toggle,
            className = "",
            ...rest
        },
        ref
    ) => {
        const ID_ELEMENT = wrapperId || WRAPPER_ID;

        const [wrapperElement, setWrapperElement] =
            useState<HTMLElement | null>(null);

        function handleClick() {
            if (!block) toggle();
        }

        function createWrapperAndAppendToBody() {
            const wrapperElementDiv = document.createElement("div");
            wrapperElementDiv.setAttribute("id", ID_ELEMENT);
            document.body.appendChild(wrapperElementDiv);
            return wrapperElementDiv;
        }

        useLayoutEffect(() => {
            let element = document.getElementById(ID_ELEMENT);
            if (!element) {
                element = createWrapperAndAppendToBody();
            }
            setWrapperElement(element);
            return () => {
                element?.parentNode?.removeChild(element);
            };
        }, [ID_ELEMENT]);

        if (!wrapperElement) return <></>;

        if (isOpen) {
            return createPortal(
                <>
                    <Backdrop />
                    <div
                        ref={ref}
                        className={joinClassName(
                            "fixed",
                            "top-0",
                            "left-0",
                            "w-full",
                            "h-full",
                            "flex",
                            "items-center",
                            "justify-center",
                            "z-30",
                            "overflow-hidden",
                            className
                        )}
                        onClick={handleClick}
                        {...rest}
                    >
                        {children}
                    </div>
                </>,
                wrapperElement
            );
        }

        return <></>;
    }
);

export { Modal };
