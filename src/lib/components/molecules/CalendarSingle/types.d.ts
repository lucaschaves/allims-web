import { TColor, TSize, TTypeElement, TVariant } from "@/types";
import { ComponentProps } from "react";

export interface ICalendarSingleProps extends ComponentProps<"input"> {
    typeElement?: TTypeElement;
    label: string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    value?: Date | null;
    onChange?: (props: Date | null) => void;
}
