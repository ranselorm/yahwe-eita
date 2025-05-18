/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#dc6115",
        secondary: {
          100: "#000000",
          200: "#888883",
        },
        grey: "#e5e7eb",
        dark: {
          100: "#111111",
        },
        accent: "#004302",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
