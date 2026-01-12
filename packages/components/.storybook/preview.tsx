import type { Preview } from "@storybook/react-vite";
import "./tailwind.css";
import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

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
      values: [
        { name: "Dark", value: "var(--color-background-dark)" },
        { name: "Light", value: "var(--color-background-light)" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as Theme;

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSync theme={theme}>
            <div>
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
                `}
              </style>
              <div
                className={`relative antialiased text-gray-500 dark:text-gray-400 ${inter.variable} ${jetbrainsMono.variable}`}
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

function ThemeSync({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
}

export default preview;
