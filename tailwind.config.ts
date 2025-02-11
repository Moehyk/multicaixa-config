import type { Config } from "tailwindcss";

export default {
  corePlugins: {
    preflight: false,
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
        transparent: "transparent",
        current: "currentColor",
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        body: "rgb(var(--bg-body) / <alpha-value>)",
        header: "rgb(var(--bg-header) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
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
          "@screen md": {
            padding: "0 1rem",
          },
          "@screen xl": {
            padding: "0 2rem",
          },
          "@screen 2xl": {
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
