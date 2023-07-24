import { TColor, TSize, TVariant } from "@/types";
import { ComponentProps, ReactNode } from "react";

export interface ITextareaProps extends ComponentProps<"textarea"> {
    label: string;
    children: ReactNode;
    error?: boolean | string;
    success?: boolean | string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    icon?: string;
}
