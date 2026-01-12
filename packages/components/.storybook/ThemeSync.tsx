import React, { useEffect } from "react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

export function ThemeSync({
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
