const commonClass = 'scrollbar-thin scrollbar-thumb-rounded';
const systemClass =
    'scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20 active:scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25';
const darkClass =
    'scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25';
const scrollbarClassName = {
    dark: `${commonClass} ${darkClass}`,
    system: `${commonClass} ${systemClass}`,
};

export const getCodeBlockScrollbarClassname = (codeBlockTheme?: 'dark' | 'system'): string => {
    if (codeBlockTheme === 'system') {
        return scrollbarClassName.system;
    }
    return scrollbarClassName.dark;
};

export const commonScrollbarClassNames =
    'scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent ' +
    'scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20 ' +
    'hover:scrollbar-thumb-black/25 dark:hover:scrollbar-thumb-white/25 ' +
    'active:scrollbar-thumb-black/25 dark:active:scrollbar-thumb-white/25';
