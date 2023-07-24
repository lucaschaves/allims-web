/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "blue-main": "#14335b",
                main: {
                    100: "var(--main-color-100)",
                    200: "var(--main-color-200)",
                    300: "var(--main-color-300)",
                    400: "var(--main-color-400)",
                    500: "var(--main-color-500)",
                    600: "var(--main-color-600)",
                    700: "var(--main-color-700)",
                    800: "var(--main-color-800)",
                    900: "var(--main-color-900)",
                },
            },
            transitionProperty: {
                width: "width",
                height: "height",
                maxHeight: "max-height",
            },
            boxShadow: {
                select: "inset rgb(49 139 225 / 51%) 0px 0px 1px 1px",
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-out": {
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                },
                "wiggle-open": {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(180deg)" },
                },
                "wiggle-close": {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(180deg)" },
                },
            },
            animation: {
                "fade-in": "fade-in 300ms ease-in",
                "fade-out": "fade-out 300ms ease-out",
                "wiggle-open": "wiggle-open 1s linear",
                "wiggle-close": "wiggle-close 1+++++++++s linear",
            },
        },
    },
    plugins: [],
};
