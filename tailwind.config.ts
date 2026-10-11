import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface-rgb) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated-rgb) / <alpha-value>)",
          card: "var(--surface-card)",
          border: "var(--surface-border)",
        },
        primary: {
          DEFAULT: "#3b82f6", // Electric blue
          foreground: "#ffffff",
          glow: "#00d2ff",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Electric violet
          foreground: "#ffffff",
        },
        accent: {
          cyan: "#06b6d4",
          violet: "#a855f7",
          pink: "#ec4899",
        },
        muted: {
          DEFAULT: "rgb(var(--muted-rgb) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground-rgb) / <alpha-value>)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #00d2ff 0%, #3b82f6 50%, #8b5cf6 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.3)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
