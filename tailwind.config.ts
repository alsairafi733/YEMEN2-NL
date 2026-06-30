import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CE1126", // Yemeni red
        secondary: "#000000", // Black
        accent: "#F5A623", // Orange accent
      },
    },
  },
  plugins: [],
};

export default config;
