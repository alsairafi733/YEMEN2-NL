import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CE1126",
        secondary: "#000000",
        accent: "#F5A623",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        arabic: ["Cairo", "Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
