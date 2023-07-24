import { ComponentProps, ReactNode, forwardRef } from "react";
import { ISkeletonProps } from "../../../types";
import { joinClassName } from "../../../utils";
import { IContainerProps, IItemProps } from "./types.d";

const defaultSizeCss = {
    sm: "p-2 text-md",
    md: "p-3 text-md",
    lg: "p-4 text-lg",
} as any;

const ItemSkeleton = forwardRef<HTMLDivElement, ISkeletonProps>(
    ({ size = "md", ...rest }, ref) => {
        return (
            <div
                ref={ref}
                role="button"
                className={joinClassName(
                    "flex",
                    "items-center",
                    "w-full",
                    "rounded-lg",
                    "text-start",
                    "leading-tight",
                    "transition-all",
                    "outline-none",
                    "bg-gray-100",
                    "animate-pulse",
                    defaultSizeCss[size]
                )}
                {...rest}
            />
        );
    }
);

interface IItemPrefix extends ComponentProps<"div"> {
    children: ReactNode;
}

const ItemPrefix = forwardRef<HTMLDivElement, IItemPrefix>(
    ({ children, className = "", ...rest }, ref) => {
        return (
            <div
                {...rest}
                ref={ref}
                className={joinClassName(
                    "grid place-items-center mr-4",
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

interface IItemSuffix extends ComponentProps<"div"> {
    children: ReactNode;
}

const ItemSuffix = forwardRef<HTMLDivElement, IItemSuffix>(
    ({ children, className = "", ...rest }, ref) => {
        return (
            <div
                {...rest}
                ref={ref}
                className={joinClassName(
                    "grid place-items-center ml-auto justify-self-end",
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

const Item = forwardRef<HTMLDivElement, IItemProps>(
    (
        { children, active = false, size = "md", className = "", ...rest },
        ref
    ) => {
        return (
            <div
                ref={ref}
                role="button"
                className={joinClassName(
                    "flex",
                    "items-center",
                    "w-full",
                    "rounded-lg",
                    "px-2",
                    "gap-1",
                    "text-start",
                    "leading-tight",
                    "transition-all",
                    "outline-none",
                    "hover:bg-opacity-80",
                    "focus:bg-opacity-80",
                    "active:bg-opacity-80",
                    defaultSizeCss[size],
                    active
                        ? joinClassName(
                              "bg-blue-600",
                              "text-white",
                              "hover:bg-blue-600",
                              "focus:bg-blue-600",
                              "active:bg-blue-600",
                              "hover:text-white",
                              "focus:text-white",
                              "active:text-white"
                          )
                        : joinClassName(
                              "hover:bg-gray-100",
                              "focus:bg-gray-100",
                              "active:bg-gray-100",
                              "hover:text-gray-900",
                              "focus:text-gray-900",
                              "active:text-gray-900"
                          ),
                    className
                )}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

interface IGroupProps extends ComponentProps<"div"> {
    children: ReactNode;
}

const Group = forwardRef<HTMLDivElement, IGroupProps>(
    ({ children, className = "", ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={joinClassName(
                    "flex",
                    "flex-col",
                    "gap-1",
                    "min-w-[250px]",
                    "font-sans",
                    "text-base",
                    "font-normal",
                    "text-gray-700",
                    "overflow-hidden",
                    className
                )}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

interface INavProps extends ComponentProps<"nav"> {
    children: ReactNode;
}

const Nav = forwardRef<HTMLElement, INavProps>(
    ({ children, className = "", ...rest }, ref) => {
        return (
            <nav
                ref={ref}
                className={joinClassName(
                    "flex",
                    "flex-col",
                    "gap-1",
                    "min-w-[250px]",
                    "font-sans",
                    "text-base",
                    "font-normal",
                    "text-gray-700",
                    "overflow-hidden",
                    "divide-y",
                    className
                )}
                {...rest}
            >
                {children}
            </nav>
        );
    }
);

const Container = forwardRef<HTMLDivElement, IContainerProps>(
    (
        { children, shadow = false, className = "", size = "md", ...rest },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={joinClassName(
                    "relative",
                    "bg-clip-border",
                    "rounded-xl",
                    "bg-white",
                    "text-gray-700",
                    shadow ? "shadow-md" : "",
                    className
                )}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

ItemSkeleton.displayName = "ItemSkeleton";
ItemPrefix.displayName = "ItemPrefix";
ItemSuffix.displayName = "ItemSuffix";
Item.displayName = "Item";
Group.displayName = "Group";
Nav.displayName = "Nav";
Container.displayName = "Container";

const List = {
    Container,
    Group,
    Item,
    ItemPrefix,
    ItemSkeleton,
    ItemSuffix,
    Nav,
};

export { List };
