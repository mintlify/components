import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
    const scrollbarBase = {
        'scrollbar-width': 'thin',
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
        },
    };

    addUtilities({
        '.scrollbar-code-dark': {
            ...scrollbarBase,
            'scrollbar-color': 'rgb(255 255 255 / 0.2) transparent',
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '9999px',
                backgroundColor: 'rgb(255 255 255 / 0.2)',
            },
            '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
            '&:active::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
        },
        '.scrollbar-code-system': {
            ...scrollbarBase,
            'scrollbar-color': 'rgb(0 0 0 / 0.15) transparent',
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '9999px',
                backgroundColor: 'rgb(0 0 0 / 0.15)',
            },
            '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(0 0 0 / 0.2)',
            },
            '&:active::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(0 0 0 / 0.2)',
            },
        },
        '.dark .scrollbar-code-system': {
            'scrollbar-color': 'rgb(255 255 255 / 0.2) transparent',
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.2)',
            },
            '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
            '&:active::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
        },
        '.scrollbar-common': {
            ...scrollbarBase,
            'scrollbar-color': 'rgb(0 0 0 / 0.2) transparent',
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '9999px',
                backgroundColor: 'rgb(0 0 0 / 0.2)',
            },
            '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(0 0 0 / 0.25)',
            },
            '&:active::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(0 0 0 / 0.25)',
            },
        },
        '.dark .scrollbar-common': {
            'scrollbar-color': 'rgb(255 255 255 / 0.2) transparent',
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.2)',
            },
            '&:hover::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
            '&:active::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(255 255 255 / 0.25)',
            },
        },
    });
});
