import type { Preview } from "@storybook/react-vite";
import "./tailwind.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import { ThemeSync } from "./ThemeSync";

const inter = {
  style: { fontFamily: "Inter, system-ui, sans-serif" },
  variable: "--font-inter",
};
const jetbrainsMono = {
  style: { fontFamily: '"JetBrains Mono", monospace' },
  variable: "--font-jetbrains-mono",
};

type Theme = "light" | "dark" | "system";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as Theme;
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSync theme={theme}>
            <div className={isDark ? "dark" : ""}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
              />
              <style>
                {`
                  html {
                    font-family: ${inter.style.fontFamily};
                  }
                  :root {
                    --font-inter: ${inter.style.fontFamily};
                    --font-jetbrains-mono: ${jetbrainsMono.style.fontFamily};
                  }
                  body {
                    background-color: white;
                  }
                  body:has(.dark) {
                    background-color: #09090b;
                  }
                `}
              </style>
              <div
                className={`relative antialiased text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-950 min-h-screen p-8 ${inter.variable} ${jetbrainsMono.variable}`}
              >
                <Story />
              </div>
            </div>
          </ThemeSync>
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", right: "☀️" },
          { value: "dark", title: "Dark", right: "🌙" },
          { value: "system", title: "System", right: "💻" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
