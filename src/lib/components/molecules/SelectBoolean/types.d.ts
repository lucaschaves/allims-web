import { TColor, TSize, TTypeElement, TVariant } from "@/types";
import { ComponentProps } from "react";

interface IOnChange {
    value: boolean | null;
}

export interface ISelectBooleanProps extends ComponentProps<"button"> {
    typeElement?: TTypeElement;
    label: string;
    error?: boolean | string;
    success?: boolean | string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    icon?: string;
    value?: boolean | null;
    onChange?: (props: IOnChange) => void;
}
