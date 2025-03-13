/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#dc6115",
        secondary: {
          100: "#000000",
          200: "#888883",
        },
        grey: "#D3D3D3",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
