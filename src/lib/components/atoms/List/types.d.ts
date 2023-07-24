import { TColor, TSize } from "@/types";
import { ComponentProps, ReactNode } from "react";

export interface IContainerProps extends ComponentProps<"div"> {
    children: ReactNode;
    size?: TSize;
    shadow?: boolean;
}

export interface IItemProps extends ComponentProps<"div"> {
    children: ReactNode;
    size?: TSize;
    color?: TColor;
    active?: boolean;
}
