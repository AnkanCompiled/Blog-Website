/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        pattaya: ["Pattaya", "sans-serif"],
      },
      gridTemplateColumns: {
        "min-max-min": "minmax(0px, 1fr) minmax(200px, 2fr) minmax(0px, 1fr)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
