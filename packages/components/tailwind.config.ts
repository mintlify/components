import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import svgToDataUri from 'mini-svg-data-uri';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      red: {
        50: 'rgb(254 242 242 / <alpha-value>)',
        100: 'rgb(254 226 226 / <alpha-value>)',
        200: 'rgb(254 202 202 / <alpha-value>)',
        300: 'rgb(252 165 165 / <alpha-value>)',
        400: 'rgb(248 113 113 / <alpha-value>)',
        500: 'rgb(239 68 68 / <alpha-value>)',
        600: 'rgb(220 38 38 / <alpha-value>)',
        700: 'rgb(185 28 28 / <alpha-value>)',
        800: 'rgb(153 27 27 / <alpha-value>)',
        900: 'rgb(127 29 29 / <alpha-value>)',
        950: 'rgb(69 10 10 / <alpha-value>)',
      },
      orange: {
        50: 'rgb(255 247 237 / <alpha-value>)',
        100: 'rgb(255 237 213 / <alpha-value>)',
        200: 'rgb(254 215 170 / <alpha-value>)',
        300: 'rgb(253 186 116 / <alpha-value>)',
        400: 'rgb(251 146 60 / <alpha-value>)',
        500: 'rgb(249 115 22 / <alpha-value>)',
        600: 'rgb(234 88 12 / <alpha-value>)',
        700: 'rgb(194 65 12 / <alpha-value>)',
        800: 'rgb(154 52 18 / <alpha-value>)',
        900: 'rgb(124 45 18 / <alpha-value>)',
        950: 'rgb(67 20 7 / <alpha-value>)',
      },
      green: {
        50: 'rgb(240 253 244 / <alpha-value>)',
        100: 'rgb(220 252 231 / <alpha-value>)',
        200: 'rgb(187 247 208 / <alpha-value>)',
        300: 'rgb(134 239 172 / <alpha-value>)',
        400: 'rgb(74 222 128 / <alpha-value>)',
        500: 'rgb(34 197 94 / <alpha-value>)',
        600: 'rgb(22 163 74 / <alpha-value>)',
        700: 'rgb(21 128 61 / <alpha-value>)',
        800: 'rgb(22 101 52 / <alpha-value>)',
        900: 'rgb(20 83 45 / <alpha-value>)',
        950: 'rgb(5 46 22 / <alpha-value>)',
      },
      blue: {
        50: 'rgb(239 246 255 / <alpha-value>)',
        100: 'rgb(219 234 254 / <alpha-value>)',
        200: 'rgb(191 219 254 / <alpha-value>)',
        300: 'rgb(147 197 253 / <alpha-value>)',
        400: 'rgb(96 165 250 / <alpha-value>)',
        500: 'rgb(59 130 246 / <alpha-value>)',
        600: 'rgb(37 99 235 / <alpha-value>)',
        700: 'rgb(29 78 216 / <alpha-value>)',
        800: 'rgb(30 64 175 / <alpha-value>)',
        900: 'rgb(30 58 138 / <alpha-value>)',
        950: 'rgb(23 37 84 / <alpha-value>)',
      },
      neutral: {
        50: 'rgb(250 250 250 / <alpha-value>)',
        100: 'rgb(245 245 245 / <alpha-value>)',
        200: 'rgb(229 229 229 / <alpha-value>)',
        300: 'rgb(212 212 212 / <alpha-value>)',
        400: 'rgb(163 163 163 / <alpha-value>)',
        500: 'rgb(115 115 115 / <alpha-value>)',
        600: 'rgb(82 82 82 / <alpha-value>)',
        700: 'rgb(64 64 64 / <alpha-value>)',
        800: 'rgb(38 38 38 / <alpha-value>)',
        900: 'rgb(23 23 23 / <alpha-value>)',
        950: 'rgb(10 10 10 / <alpha-value>)',
      },
      yellow: {
        50: 'rgb(254 252 232 / <alpha-value>)',
        100: 'rgb(254 249 195 / <alpha-value>)',
        200: 'rgb(254 240 138 / <alpha-value>)',
        300: 'rgb(253 224 71 / <alpha-value>)',
        400: 'rgb(250 204 21 / <alpha-value>)',
        500: 'rgb(234 179 8 / <alpha-value>)',
        600: 'rgb(202 138 4 / <alpha-value>)',
        700: 'rgb(161 98 7 / <alpha-value>)',
        800: 'rgb(133 77 14 / <alpha-value>)',
        900: 'rgb(113 63 18 / <alpha-value>)',
        950: 'rgb(66 32 6 / <alpha-value>)',
      },
      purple: {
        50: 'rgb(250 245 255 / <alpha-value>)',
        100: 'rgb(243 232 255 / <alpha-value>)',
        200: 'rgb(233 213 255 / <alpha-value>)',
        300: 'rgb(216 180 254 / <alpha-value>)',
        400: 'rgb(192 132 252 / <alpha-value>)',
        500: 'rgb(168 85 247 / <alpha-value>)',
        600: 'rgb(147 51 234 / <alpha-value>)',
        700: 'rgb(126 34 206 / <alpha-value>)',
        800: 'rgb(107 33 168 / <alpha-value>)',
        900: 'rgb(88 28 135 / <alpha-value>)',
        950: 'rgb(59 7 100 / <alpha-value>)',
      },
    },
  },
  plugins: [
    typography,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'bg-grid': (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    }),
  ],
} satisfies Config;

