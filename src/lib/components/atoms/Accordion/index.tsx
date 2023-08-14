import { joinClassName } from "@/utils";
import {
    ReactElement,
    ReactNode,
    cloneElement,
    forwardRef,
    useCallback,
    useState,
} from "react";

interface IAccordionProps {
    id?: string;
    children: ReactElement;
    content: ReactNode;
    icon?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, IAccordionProps>(
    ({ children, id, content, icon = true }, ref) => {
        const [expanded, setExpanded] = useState(false);

        const hasChildren = !!(content as any)?.props?.children?.length;

        const onClick = useCallback(() => setExpanded((e) => !e), []);

        return (
            <div
                ref={ref}
                className={joinClassName(
                    "transition-all",
                    "transition-width",
                    "duration-300",
                    icon ? "w-full" : "w-auto"
                )}
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
                        id={id}
                        className={joinClassName(
                            "transition",
                            "transition-maxHeight",
                            "duration-300",
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
