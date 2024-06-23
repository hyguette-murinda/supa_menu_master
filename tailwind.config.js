/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d4d",
        secondary: "#293968",
        third: "#b1b6c8",
        fourth: "#D8D8DA",
      },
    },
  },
  plugins: [],
};

