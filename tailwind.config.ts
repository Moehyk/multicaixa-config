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
        100: "25rem",
        104: "26rem",
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
        border: "rgb(var(--border) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        "brand-accent": "rgb(var(--brand-accent) / <alpha-value>)",
        "mcx-bg": "rgb(var(--mcx-bg) / <alpha-value>)",
        "mcx-bg-accent": "rgb(var(--mcx-bg-accent) / <alpha-value>)",
        "mcx-btn-bg": "rgb(var(--mcx-btn-bg) / <alpha-value>)",
        "mcx-btn-bd": "rgb(var(--mcx-btn-bd) / <alpha-value>)",
        "mcx-btn-accent": "rgb(var(--mcx-btn-accent) / <alpha-value>)",
        "mcx-btn-focus": "rgb(var(--mcx-btn-focus) / <alpha-value>)",
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-in-out",
        "fade-out": "fadeOut 0.15s ease-in-out",
        "slide-down": "slideDown 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "mcx-from-left": "mcxFromLeft 0.3s ease-in-out",
        "mcx-from-right": "mcxFromRight 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        mcxFromLeft: {
          "0%": {
            transform: "translateX(-15%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
        mcxFromRight: {
          "0%": {
            transform: "translateX(15%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
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
