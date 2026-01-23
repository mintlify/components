import type { CodeStyling } from "@/utils/shiki/code-styling";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  type ShikiThemeType,
} from "@/utils/shiki/constants";

const codeStylingToThemeOrThemes = (
  codeStylingFromConfig: CodeStyling
): { themes: { light: ShikiThemeType; dark: ShikiThemeType } } => {
  if (
    typeof codeStylingFromConfig === "object" &&
    "theme" in codeStylingFromConfig &&
    typeof codeStylingFromConfig.theme === "object"
  ) {
    return {
      themes: codeStylingFromConfig.theme,
    };
  }
  if (
    typeof codeStylingFromConfig === "object" &&
    "theme" in codeStylingFromConfig &&
    typeof codeStylingFromConfig.theme === "string"
  ) {
    return {
      themes: {
        light: codeStylingFromConfig.theme,
        dark: codeStylingFromConfig.theme,
      },
    };
  }
  if (codeStylingFromConfig === "dark") {
    return {
      themes: {
        light: DEFAULT_DARK_THEME,
        dark: DEFAULT_DARK_THEME,
      },
    };
  }
  return {
    themes: {
      light: DEFAULT_LIGHT_THEME,
      dark: DEFAULT_DARK_THEME,
    },
  };
};

export { codeStylingToThemeOrThemes };
