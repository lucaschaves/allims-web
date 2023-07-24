import { TColor, TSize, TVariant } from "@/types";
import { ComponentProps, ReactNode } from "react";

export interface IIconButtonProps extends ComponentProps<"button"> {
    children: ReactNode;
    fullWidth?: boolean;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
}
