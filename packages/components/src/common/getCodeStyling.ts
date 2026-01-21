import { CodeStyling } from '@/validation';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, type ShikiThemeType } from '@/utils/shiki/constants';

const getThemeModeFromTheme = (theme: ShikiThemeType): 'system' | 'dark' => {
    const lightThemes = [
        'catppuccin-latte',
        'everforest-light',
        'github-light',
        'github-light-default',
        'github-light-high-contrast',
        'gruvbox-light-hard',
        'gruvbox-light-medium',
        'gruvbox-light-soft',
        'kanagawa-lotus',
        'light-plus',
        'material-theme-lighter',
        'min-light',
        'one-light',
        'rose-pine-dawn',
        'slack-ochin',
        'snazzy-light',
        'solarized-light',
        'vitesse-light',
    ];
    if (lightThemes.includes(theme)) {
        return 'system';
    }
    return 'dark';
};

export const codeStylingToThemeOrThemes = (
    codeStylingFromConfig: CodeStyling
): { themes: { light: ShikiThemeType; dark: ShikiThemeType } } => {
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

export const getCodeStylingEnum = (codeStylingFromConfig: CodeStyling): 'system' | 'dark' => {
    if (codeStylingFromConfig === 'system' || codeStylingFromConfig === 'dark') {
        return codeStylingFromConfig;
    }
    if (
        typeof codeStylingFromConfig === 'object' &&
        'theme' in codeStylingFromConfig &&
        typeof codeStylingFromConfig.theme === 'object'
    ) {
        return 'system';
    }
    if (
        typeof codeStylingFromConfig === 'object' &&
        'theme' in codeStylingFromConfig &&
        typeof codeStylingFromConfig.theme === 'string'
    ) {
        return getThemeModeFromTheme(codeStylingFromConfig.theme);
    }
    return 'system';
};
