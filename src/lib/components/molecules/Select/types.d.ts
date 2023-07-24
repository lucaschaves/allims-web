import { TColor, TSize, TTypeElement, TVariant } from "@/types";
import { ComponentProps } from "react";

type TOperation = "inc" | "exc" | null;

interface IOnChange {
    value: string | string[];
    description?: string;
    operation?: TOperation;
}

export interface ISelectProps extends ComponentProps<"button"> {
    typeElement?: TTypeElement;
    label: string;
    error?: boolean | string;
    success?: boolean | string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    icon?: string;
    isMulti?: boolean;
    description?: string;
    value?: string | string[];
    onChange?: (props: IOnChange) => void;
}
