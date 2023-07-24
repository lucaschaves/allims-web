import { TColor, TSize, TVariant } from "@/types";
import { ComponentProps } from "react";

type TContainerProps = ComponentProps<"div">;
export interface IInputProps extends ComponentProps<"input"> {
    label: string;
    error?: boolean | string;
    success?: boolean | string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    icon?: string;
    containerProps?: TContainerProps;
}
