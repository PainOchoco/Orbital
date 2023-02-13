/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            main: ["Orkney", "sans-serif"],
        },
        extend: {
            transitionProperty: {
                width: "width",
                height: "height",
            },
            colors: {
                payload: "#22c55e",
                debris: "#b91c1c",
                rocket_body: "#c026d3",
                tba: "#f59e0b",
                unknown: "#64748b",
            },
        },
    },
    plugins: [],
};
