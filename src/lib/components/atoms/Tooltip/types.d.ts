import { TPlacement } from "@/types";
import { ComponentProps, ReactNode } from "react";

export interface ITooltipProps extends ComponentProps<"div"> {
    text: string;
    children: ReactNode;
    placement?: TPlacement;
}
