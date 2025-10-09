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
        "body-accent": "rgb(var(--bg-accent) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--brand-accent) / <alpha-value>)",
        "user-accent": "rgb(var(--user-accent) / <alpha-value>)",
        "brand-text": "rgb(var(--brand-text) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
        "slide-down": "slideDown 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
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
