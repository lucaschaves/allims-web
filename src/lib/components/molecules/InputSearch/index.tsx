import { IconButton, TColor, TSize, TVariant } from "@/lib";
import { joinClassName } from "@/utils";
import { forwardRef, useCallback, useState } from "react";
import { BsEraser } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

interface IInputSearchProps {
    error?: boolean | string;
    success?: boolean | string;
    variant?: TVariant;
    size?: TSize;
    color?: TColor;
    icon?: string;
    className?: string;
    value: string;
    onChange: (props: string) => void;
}

const InputSearch = forwardRef<HTMLInputElement, IInputSearchProps>(
    (
        {
            className = "",
            error,
            success,
            variant = "outlined",
            size = "md",
            color = "blue",
            icon,
            value,
            onChange,
            ...rest
        },
        ref
    ) => {
        const [search, setSearch] = useState("");

        const handleSearch = useCallback(() => {
            onChange(search);
        }, [onChange, search]);

        const handleClear = useCallback(() => {
            setSearch("");
            onChange("");
        }, [onChange]);

        return (
            <div className="relative flex w-full">
                <input
                    ref={ref}
                    type="text"
                    placeholder="buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleSearch();
                        }
                    }}
                    className={joinClassName(
                        "outline-none",
                        "border-none",
                        "p-4",
                        "w-full",
                        "bg-blue-main",
                        "text-white"
                    )}
                    {...rest}
                />
                <IconButton
                    color="white"
                    variant="text"
                    className="!absolute right-10 top-0.5 rounded text-gray-400"
                    onClick={handleSearch}
                >
                    <FiSearch />
                </IconButton>
                <IconButton
                    color="white"
                    variant="text"
                    className="!absolute right-0 top-0.5 rounded text-gray-400"
                    onClick={handleClear}
                >
                    <BsEraser />
                </IconButton>
            </div>
        );
    }
);

InputSearch.displayName = "InputSearch";

export { InputSearch };
