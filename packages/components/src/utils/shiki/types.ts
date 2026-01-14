// Inlined types from @mintlify/validation to make the component library independent

export type ShikiTheme = string; // Simplified - in practice this would be a union of all supported themes

export type CodeStyling =
  | 'dark'
  | 'system'
  | {
      theme?:
        | ShikiTheme
        | {
            light: ShikiTheme;
            dark: ShikiTheme;
          };
      languages?: {
        custom?: string[];
      };
    };

export type DocsConfig = {
  styling?: {
    codeblocks?: CodeStyling;
    eyebrows?: 'section' | 'breadcrumbs';
    latex?: boolean;
  };
};

// Inlined from @mintlify/common
export const DEFAULT_DARK_THEME = 'dark-plus';
export const DEFAULT_LIGHT_THEME = 'github-light-default';

export const codeStylingToThemeOrThemes = (
  codeStylingFromConfig?: CodeStyling
): { themes: { light: string; dark: string } } => {
  if (!codeStylingFromConfig) {
    return {
      themes: {
        light: DEFAULT_LIGHT_THEME,
        dark: DEFAULT_DARK_THEME,
      },
    };
  }
  if (
    typeof codeStylingFromConfig === 'object' &&
    'theme' in codeStylingFromConfig &&
    typeof codeStylingFromConfig.theme === 'object'
  ) {
    return {
      themes: codeStylingFromConfig.theme,
    };
  }
  if (
    typeof codeStylingFromConfig === 'object' &&
    'theme' in codeStylingFromConfig &&
    typeof codeStylingFromConfig.theme === 'string'
  ) {
    return {
      themes: {
        light: codeStylingFromConfig.theme,
        dark: codeStylingFromConfig.theme,
      },
    };
  }
  if (codeStylingFromConfig === 'dark') {
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
