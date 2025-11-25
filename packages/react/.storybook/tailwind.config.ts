import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./preview.tsx",
    "./src/**/*.stories.{js,jsx,ts,tsx,mdx}",
    "./.storybook/**/*.stories.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
