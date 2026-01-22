import { useTheme } from "next-themes";
import type React from "react";
import { useEffect } from "react";

type Theme = "light" | "dark" | "system";

type ThemeSyncProps = {
  theme: Theme;
  children: React.ReactNode;
};

const ThemeSync = ({ theme, children }: ThemeSyncProps) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
};

export { ThemeSync };
export type { Theme as StorybookThemeType };
