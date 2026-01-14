import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--primary-light) / <alpha-value>)',
        'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;

