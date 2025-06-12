import type { Config } from "tailwindcss";
import { brand } from "./src/mantine/colors";

export default {
  corePlugins: {
    container: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      spacing: {
        66: "16.5rem",
        88: "22rem",
      },
      flex: {
        1: "1",
        "col-fluid": "1 0 auto",
        "row-fluid": "1 auto",
      },
      width: {
        "9/10": "90%",
        "4/5": "80%",
        "3/4": "75%",
      },
      maxWidth: {
        "9/10": "90%",
        "4/5": "80%",
        "3/4": "75%",
      },
      colors: {
        brand: {
          50: brand[0],
          100: brand[1],
          200: brand[2],
          300: brand[3],
          400: brand[4],
          500: brand[5],
          600: brand[6],
          700: brand[7],
          800: brand[8],
          900: brand[9],
        },
        transparent: "transparent",
        current: "currentColor",
        body: "rgb(var(--bg-body) / <alpha-value>)",
        header: "rgb(var(--bg-header) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "modal-footer": "rgb(var(--modal-footer) / <alpha-value>)",
        "modal-footer-b": "rgb(var(--modal-footer-border) / <alpha-value>)",
        toolbar: "rgb(var(--toolbar-bg) / <alpha-value>)",
      },
    },
  },
  plugins: [
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          padding: "0 1rem",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
            padding: "0 2rem",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1140px",
          },
          "@screen 2xl": {
            maxWidth: "1320px",
            padding: "0 4rem",
          },
        },
        ".flex-row-fluid": {
          flex: "1 auto",
          minWidth: 0,
        },
        ".flex-equal": {
          flex: "1",
          flexBasis: "0",
          flexShrink: "0",
        },
      });
    },
  ],
} satisfies Config;
