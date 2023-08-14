import { joinClassName } from "@/utils";

interface ILoading {
    size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const sizes = {
    xs: "h-5 w-5",
    sm: "h-8 w-8",
    base: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
    "2xl": "h-32 w-32",
    "3xl": "h-40 w-40",
    "4xl": "h-48 w-48",
};

const Loading = ({ size = "base" }: ILoading) => {
    return (
        <svg
            className={joinClassName(
                "animate-spin",
                "-ml-1",
                "mr-3",
                "text-black",
                "dark:text-white",
                sizes[size]
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export { Loading };
