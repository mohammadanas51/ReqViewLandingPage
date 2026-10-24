import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#08090B",
          secondary: "#101216",
          card: "#12151B",
          elevated: "#181C24",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          light: "rgba(255, 255, 255, 0.12)",
          accent: "rgba(99, 102, 241, 0.3)",
        },
        accent: {
          DEFAULT: "#6366F1",
          violet: "#7C3AED",
          blue: "#38BDF8",
          glow: "rgba(99, 102, 241, 0.15)",
        },
        success: {
          DEFAULT: "#10B981",
          emerald: "#059669",
          light: "#34D399",
          subtle: "rgba(16, 185, 129, 0.15)",
        },
        danger: {
          DEFAULT: "#EF4444",
          subtle: "rgba(239, 68, 68, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.18)",
        "glow-lg": "0 0 60px -15px rgba(99, 102, 241, 0.22)",
        "card-subtle": "0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12)",
      },
      backgroundImage: {
        "radial-hero": "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(56, 189, 248, 0.04) 35%, transparent 70%)",
        "radial-accent": "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

