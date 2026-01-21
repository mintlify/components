import { expose } from 'comlink';

let replacements, langMap;
let transformers;
let highlighter;
let hastToHtmlFn;
let codeStylingToThemeOrThemesFn;
let getShikiLanguageFromPresetFn;

const ready = (async () => {
    const [
        { createHighlighter, hastToHtml, createJavaScriptRegexEngine },
        {
            transformerNotationHighlight,
            transformerNotationFocus,
            transformerMetaHighlight,
            transformerNotationDiff,
        },
        {
            THEMES,
            LANGS,
            SHIKI_COLOR_REPLACEMENTS,
            SHIKI_LANG_MAP,
            LINE_HIGHLIGHT_CLASS_NAME,
            LINE_FOCUS_CLASS_NAME,
            LINE_DIFF_ADD_CLASS_NAME,
            LINE_DIFF_REMOVE_CLASS_NAME,
        },
        { codeStylingToThemeOrThemes },
        { getShikiLanguageFromPreset },
    ] = await Promise.all([
        import('shiki'),
        import('@shikijs/transformers'),
        import('./constants.ts'),
        import('@/common/getCodeStyling'),
        import('@/constants/snippetPresets'),
    ]);

    replacements = SHIKI_COLOR_REPLACEMENTS;
    langMap = SHIKI_LANG_MAP;
    hastToHtmlFn = hastToHtml;
    codeStylingToThemeOrThemesFn = codeStylingToThemeOrThemes;
    getShikiLanguageFromPresetFn = getShikiLanguageFromPreset;
    const engine = createJavaScriptRegexEngine({ forgiving: true, cache: new Map() });
    highlighter = await createHighlighter({ themes: THEMES, langs: LANGS, engine });

    const matchAlgorithm = {
        matchAlgorithm: 'v3',
    };

    transformers = [
        transformerMetaHighlight({
            className: LINE_HIGHLIGHT_CLASS_NAME,
        }),
        transformerNotationHighlight({
            ...matchAlgorithm,
            classActiveLine: LINE_HIGHLIGHT_CLASS_NAME,
        }),
        transformerNotationFocus({
            ...matchAlgorithm,
            classActiveLine: LINE_FOCUS_CLASS_NAME,
        }),
        transformerNotationDiff({
            ...matchAlgorithm,
            classLineAdd: LINE_DIFF_ADD_CLASS_NAME,
            classLineRemove: LINE_DIFF_REMOVE_CLASS_NAME,
        }),
    ];
})();

function getShikiLanguage(lang) {
    const text = 'text';
    const n = Number(lang);
    const isStatus = !Number.isNaN(n) && Number.isFinite(n) && n > 99 && n < 600;
    if (isStatus) return 'json';
    if (!lang) return text;
    const presetLang = getShikiLanguageFromPresetFn(lang);
    if (presetLang !== lang) return presetLang;
    return langMap[lang.toLowerCase()] ?? text;
}

function getLanguageFromClassName(className, fallback) {
    const m = /language-(\w+)/.exec(className ?? '');
    return m ? m[1] ?? 'text' : fallback ?? 'text';
}

function highlightSync(opts) {
    let lang =
        'language' in opts ? opts.language : getLanguageFromClassName(opts.className, opts.fileName);
    let html = undefined;
    if (lang) {
        const serializer =
            !!opts.opts?.highlightedLines?.length || !!opts.opts?.focusedLines?.length
                ? 'codeToHast'
                : 'codeToHtml';
        const code = opts.codeString.trim();
        const themeOrThemes = codeStylingToThemeOrThemesFn(opts.codeBlockTheme);
        html = highlighter[serializer](code, {
            lang: getShikiLanguage(lang),
            ...themeOrThemes,
            colorReplacements: { ...replacements },
            transformers: transformers,
            ...opts.opts,
        });
    }
    if (typeof html !== 'object') return html;
    const pre = html.children[0];
    if (pre?.type === 'element' && pre.tagName === 'pre') {
        const spanElements = pre.children[0].children.filter(
            (child) => child.type === 'element' && child.tagName === 'span'
        );
        spanElements.forEach((c, i) => {
            if (typeof c.properties.class === 'string') {
                if (opts.opts?.highlightedLines?.includes(i + 1)) {
                    c.properties.class += ' line-highlight';
                }

                if (opts.opts?.focusedLines?.includes(i + 1)) {
                    c.properties.class += ' line-focus';
                }
            } else if (Array.isArray(c.properties.class)) {
                if (opts.opts?.highlightedLines?.includes(i + 1)) {
                    c.properties.class.push('line-highlight');
                }

                if (opts.opts?.focusedLines?.includes(i + 1)) {
                    c.properties.class.push('line-focus');
                }
            }
        });
    }
    return hastToHtmlFn(html);
}

async function highlight(props) {
    await ready;
    return highlightSync(props);
}

expose({ highlight, ready });
