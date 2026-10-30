import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
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
        // Blueprint Noir design system palette
        navy: {
          950: "#070C1A",
          900: "#0B172E",
          800: "#102244",
        },
        carbon: "#0F1217",
        paper: "#F6F7F9",
        ink: "#0A0D14",
        cobalt: {
          DEFAULT: "#1F5BFF",
          hover: "#1547D4",
          light: "#4E7EFF",
          muted: "rgba(31, 91, 255, 0.15)",
        },
        cyan: {
          hairline: "#5CE1FF",
          DEFAULT: "#5CE1FF",
          muted: "rgba(92, 225, 255, 0.15)",
        },
        volt: {
          DEFAULT: "#D4FF3A",
          lime: "#D4FF3A",
          glow: "rgba(212, 255, 58, 0.35)",
        },
        // Semantic system tokens mapped to CSS variables
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        surface: {
          DEFAULT: "var(--surface-bg)",
          elevated: "var(--surface-elevated)",
          card: "var(--surface-card)",
          border: "var(--surface-border)",
        },
        primary: {
          DEFAULT: "#1F5BFF",
          foreground: "#ffffff",
          glow: "#5CE1FF",
        },
        muted: {
          DEFAULT: "var(--muted-bg)",
          foreground: "var(--muted-foreground)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "'Bricolage Grotesque'", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "'Inter'", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-sans)", "'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
      },
      boxShadow: {
        cobalt: "0 0 20px -3px rgba(31, 91, 255, 0.4)",
        "cobalt-lg": "0 10px 30px -5px rgba(31, 91, 255, 0.35)",
        "volt-glow": "0 0 15px 0px rgba(212, 255, 58, 0.4)",
        blueprint: "8px 8px 0px 0px #1F5BFF",
        "blueprint-lime": "8px 8px 0px 0px #D4FF3A",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "marquee-left": "marqueeLeft 35s linear infinite",
        "marquee-right": "marqueeRight 35s linear infinite",
        "blink-cursor": "blink 1s step-end infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
