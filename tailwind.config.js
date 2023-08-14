/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                xsm: "0.7rem",
            },
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
                // width: "width",
                height: "height",
                maxHeight: "max-height",
                // maxWidth: "max-width",
                minHeight: "min-height",
                // minWidth: "min-width",
            },
            boxShadow: {
                select: "inset rgb(49 139 225 / 51%) 0px 0px 1px 1px",
            },
            keyframes: {
                show: {
                    from: {
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                open: {
                    from: {
                        "min-width": "4rem",
                        width: "4rem",
                    },
                    to: {
                        "min-width": "24rem",
                        width: "24rem",
                    },
                },
                close: {
                    from: {
                        "min-width": "24rem",
                        width: "24rem",
                    },
                    to: {
                        "min-width": "4rem",
                        width: "4rem",
                    },
                },
                "close-full": {
                    from: {
                        right: "100%",
                    },
                    to: { right: "0px" },
                },
            },
            animation: {
                show: "show 300ms linear",
                "show-open": "open 300ms linear",
                "show-close": "close 300ms linear",
                "show-close-full": "close-full 300ms linear",
            },
        },
    },
    plugins: [],
};
