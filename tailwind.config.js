import { colors } from "../allims-library";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                ...colors,
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
            gridTemplateColumns: {
                sidebar: "300px auto",
                "sidebar-collapsed": "64px auto",
            },
            transitionProperty: {
                width: "width",
                height: "height",
            },
            boxShadow: {
                select: "inset rgb(49 139 225 / 51%) 0px 0px 1px 1px",
            },
        },
    },
    plugins: [],
};
