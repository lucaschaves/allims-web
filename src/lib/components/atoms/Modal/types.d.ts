import { ComponentProps, ReactNode } from "react";

export interface IModalProps extends ComponentProps<"div"> {
    children: ReactNode;
    isOpen: boolean;
    wrapperId?: string;
    block?: boolean;
    toggle: () => void;
}
