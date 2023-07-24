import { IDateRange } from "@/components";
import { TColor, TSize, TTypeElement, TVariant } from "@/types";
import { ComponentProps } from "react";

export interface ICalendarRangeProps extends ComponentProps<"input"> {
    typeElement?: TTypeElement;
    label: string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    value?: IDateRange;
    onChange?: (props: IDateRange) => void;
}
