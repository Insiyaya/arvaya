import type { Config } from "tailwindcss";

// In Tailwind v4, theme configuration lives in globals.css via @theme.
// This file is kept for tooling compatibility only.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
