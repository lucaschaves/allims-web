import {
    Children,
    ComponentProps,
    ReactNode,
    forwardRef,
    isValidElement,
} from "react";
import { FiChevronRight } from "react-icons/fi";
import { joinClassName } from "../../../utils";

interface IBreadcrumbProps extends ComponentProps<"ol"> {
    children: ReactNode;
}

const Breadcrumb = forwardRef<HTMLOListElement, IBreadcrumbProps>(
    ({ children, ...rest }, ref) => {
        return (
            <nav
                aria-label="breadcrumb"
                className={joinClassName(
                    "w-max",
                    "flex",
                    "items-center",
                    "flex-wrap"
                )}
            >
                <ol
                    {...rest}
                    ref={ref}
                    className={joinClassName(
                        "flex flex-wrap items-center w-full py-2 px-4 rounded-md gap-1 "
                    )}
                >
                    {Children.map(children, (child, index) => {
                        if (isValidElement(child)) {
                            return (
                                <li
                                    className={joinClassName(
                                        "flex items-center gap-1 text-slate-400 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500",
                                        index === Children.count(children) - 1
                                            ? ""
                                            : ""
                                    )}
                                >
                                    {child}
                                    {index !== Children.count(children) - 1 && (
                                        <FiChevronRight
                                            className={joinClassName(
                                                "stroke-slate-400",
                                                "text-sm",
                                                "mx-1",
                                                "pointer-events-none",
                                                "select-none"
                                            )}
                                        />
                                    )}
                                </li>
                            );
                        }
                        return null;
                    })}
                </ol>
            </nav>
        );
    }
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
