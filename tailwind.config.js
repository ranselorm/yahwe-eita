/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#000000",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
