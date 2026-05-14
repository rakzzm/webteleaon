import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020403",
        void: "#060908",
        panel: "rgba(8, 15, 12, 0.82)",
        cyan: "#28c7e8",
        electric: "#7dd3fc",
        violet: "#b7a4ff",
        silver: "#d7e4dd"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 70px rgba(132, 255, 181, 0.18)",
        violet: "0 0 70px rgba(183, 164, 255, 0.16)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 50% 0%, rgba(132, 255, 181, 0.16), transparent 34%), radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.12), transparent 28%), linear-gradient(180deg, #020403 0%, #050806 50%, #020403 100%)"
      }
    }
  },
  plugins: []
};

export default config;
