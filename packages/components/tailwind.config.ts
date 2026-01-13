import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
} satisfies Config;

