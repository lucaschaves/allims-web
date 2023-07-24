import { TColor, TPlacement, TSize, TVariant } from "@/types";
import { ComponentProps, ReactNode } from "react";
export interface IBadgeProps extends ComponentProps<"div"> {
    children: ReactNode;
    label?: string | number;
    placement?: TPlacement;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
}
