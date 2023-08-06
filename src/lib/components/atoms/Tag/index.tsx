import { ReactNode } from "react";
import { joinClassName } from "../../../utils";

interface ITagProps {
    color?: string;
    children: ReactNode;
}

const Tag = ({ children, color }: ITagProps) => {
    return (
        <div
            className={joinClassName(
                "inline-block rounded bg-green-500 px-2 py-0.5 text-white text-sm"
            )}
            style={{
                backgroundColor: color,
            }}
        >
            {children}
        </div>
    );
};

export { Tag };
