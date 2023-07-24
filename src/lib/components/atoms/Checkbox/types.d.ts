import { TColor, TSize } from "@/types";
import { ComponentProps } from "react";

export interface ICheckboxProps extends ComponentProps<"input"> {
    color?: TColor;
    size?: TSize;
    indeterminate?: boolean;
}
