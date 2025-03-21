import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#1ED760",
              foreground: "#000000",
            },
            focus: "#1ED760",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#1ED760",
              foreground: "#FFFFFF",
            },
            focus: "#1ED760",
          },
        },
      },
    }),
  ],
};

module.exports = config;
