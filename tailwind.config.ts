import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        qsc: {
          yellow: {
            DEFAULT: "#FDFD00",
            hover: "#E8E800",
            active: "#D4D400",
            light: "#FFFFCC",
            tint: "#FEFEF0",
          },
          gold: {
            DEFAULT: "#D4AF37",
            light: "#FFDF73",
            dark: "#A68019",
          },
          dark: {
            DEFAULT: "#0A0A0A",
            surface: "#141414",
            card: "#1A1A1A",
            border: "#262626",
            muted: "#2E2E2E",
          },
          bg: "#F7F7F4",
          surface: "#FFFFFF",
          text: {
            primary: "#171717",
            secondary: "#666666",
            muted: "#8E8E93",
          },
          border: {
            subtle: "#E8E8E3",
            strong: "#D1D1C7",
          },
          success: {
            DEFAULT: "#16834A",
            light: "#E8F5E9",
            dark: "#0F5A32",
          },
          warning: {
            DEFAULT: "#C58A16",
            light: "#FEF7E6",
            dark: "#8D620D",
          },
          danger: {
            DEFAULT: "#C43B35",
            light: "#FDECEC",
            dark: "#8E2924",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-ibm-plex-arabic)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        elevation: "0 10px 30px -10px rgba(0,0,0,0.08)",
        goldGlow: "0 0 25px rgba(253, 253, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
