import { TColor, TSize, TVariant } from "@/types";
import { ComponentProps } from "react";

export interface ISwitchProps extends ComponentProps<"input"> {
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
}
