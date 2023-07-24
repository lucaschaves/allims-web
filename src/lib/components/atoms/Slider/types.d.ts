import { TColor, TSize, TVariant } from "@/types";
import { ComponentProps } from "react";

export interface ISliderProps extends ComponentProps<"input"> {
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
}
