import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
  addUtilities({
    '.scrollbar-code-dark': {
      '@apply scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25':
        {},
    },
    '.scrollbar-code-system': {
      '@apply scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20 active:scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25':
        {},
    },
    '.scrollbar-common': {
      '@apply scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-black/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-black/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-black/25 dark:active:scrollbar-thumb-white/25':
        {},
    },
  });
});
