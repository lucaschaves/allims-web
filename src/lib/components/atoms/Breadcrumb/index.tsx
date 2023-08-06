import { ComponentProps, ReactNode, forwardRef } from "react";
import { joinClassName } from "../../../utils";

interface IBreadcrumbContainerProps extends ComponentProps<"ol"> {
    children: ReactNode;
}

interface IBreadcrumbLinkProps extends ComponentProps<"li"> {
    children: ReactNode;
}

const Link = forwardRef<HTMLLIElement, IBreadcrumbLinkProps>(
    ({ children, ...rest }, ref) => {
        return (
            <li
                ref={ref}
                className={joinClassName(
                    "flex items-center gap-1 text-slate-400 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500"
                )}
                {...rest}
            >
                {children}

                {/* <FiChevronRight
                        className={joinClassName(
                            "stroke-slate-400",
                            "text-sm",
                            "mx-1",
                            "pointer-events-none",
                            "select-none"
                        )}
                    /> */}
            </li>
        );
    }
);

const Container = forwardRef<HTMLOListElement, IBreadcrumbContainerProps>(
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
                    {children}
                </ol>
            </nav>
        );
    }
);

const Breadcrumb = {
    Container,
    Link,
};

Breadcrumb.Container.displayName = "Breadcrumb.Container";
Breadcrumb.Container.displayName = "Breadcrumb.Link";

export { Breadcrumb };
