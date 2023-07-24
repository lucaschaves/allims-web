import { joinClassName } from "@/utils";
import {
    ReactElement,
    ReactNode,
    cloneElement,
    forwardRef,
    useState,
} from "react";

interface IAccordionProps {
    children: ReactElement;
    content: ReactNode;
    icon?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, IAccordionProps>(
    ({ children, content, icon = true }, ref) => {
        const [expanded, setExpanded] = useState(false);

        const hasChildren = !!(content as any)?.props?.children?.length;

        const onClick = () => setExpanded((e) => !e);

        return (
            <div
                ref={ref}
                className={joinClassName("transition", icon ? "w-full" : "")}
            >
                {cloneElement(
                    children,
                    hasChildren
                        ? {
                              onClick,
                          }
                        : {}
                )}
                {icon ? (
                    <div
                        className={joinClassName(
                            "transition",
                            "transition-maxHeight",
                            "duration-300",
                            "ease-in-out",
                            "px-5",
                            "pt-0",
                            "overflow-hidden",
                            expanded ? "max-h-full" : "max-h-0"
                        )}
                    >
                        {content}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        );
    }
);

Accordion.displayName = "Accordion";

export { Accordion };
