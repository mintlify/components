import { expose } from "comlink";

let replacements, langMap;
let transformers;
let highlighter;
let hastToHtmlFn;
let codeStylingToThemeOrThemesFn;
let getShikiLanguageFromPresetFn;
let lineHighlightClassName, lineFocusClassName;

const ready = (async () => {
  const [
    { createHighlighter, hastToHtml },
    { createJavaScriptRegexEngine },
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
    import("shiki"),
    import("shiki/engine/javascript"),
    import("@shikijs/transformers"),
    import("./constants.ts"),
    import("@/utils/shiki/get-code-styling"),
    import("@/utils/shiki/snippet-presets"),
  ]);

  replacements = SHIKI_COLOR_REPLACEMENTS;
  langMap = SHIKI_LANG_MAP;
  hastToHtmlFn = hastToHtml;
  lineHighlightClassName = LINE_HIGHLIGHT_CLASS_NAME;
  lineFocusClassName = LINE_FOCUS_CLASS_NAME;
  codeStylingToThemeOrThemesFn = codeStylingToThemeOrThemes;
  getShikiLanguageFromPresetFn = getShikiLanguageFromPreset;
  const engine = createJavaScriptRegexEngine({
    forgiving: true,
    cache: new Map(),
  });
  highlighter = await createHighlighter({
    themes: THEMES,
    langs: LANGS,
    engine,
  });

  const matchAlgorithm = {
    matchAlgorithm: "v3",
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
  const text = "text";
  if (!lang) {
    return text;
  }

  const n = Number(lang);
  const isStatus = !Number.isNaN(n) && Number.isFinite(n) && n > 99 && n < 600;
  if (isStatus) {
    return "json";
  }

  const lower = lang.toLowerCase();
  const presetLang = getShikiLanguageFromPresetFn(lower);

  return langMap[presetLang] ?? langMap[lower] ?? text;
}

function getLanguageFromClassName(className, fallback) {
  // biome-ignore lint/performance/useTopLevelRegex: TODO
  const m = /language-(\w+)/.exec(className ?? "");
  return m ? (m[1] ?? "text") : (fallback ?? "text");
}

function highlightSync(opts) {
  const lang =
    "language" in opts
      ? opts.language
      : getLanguageFromClassName(opts.className, opts.fileName);
  let html;
  if (lang) {
    const serializer =
      !!opts.opts?.highlightedLines?.length || !!opts.opts?.focusedLines?.length
        ? "codeToHast"
        : "codeToHtml";
    const code = opts.codeString.trim();
    const themeOrThemes = codeStylingToThemeOrThemesFn(opts.codeBlockTheme);
    html = highlighter[serializer](code, {
      lang: getShikiLanguage(lang),
      ...themeOrThemes,
      colorReplacements: { ...replacements },
      transformers,
      tabindex: false,
      ...opts.opts,
    });
  }
  if (typeof html !== "object") {
    return html;
  }
  const pre = html.children[0];
  if (pre?.type === "element" && pre.tagName === "pre") {
    const codeElement = pre.children[0];
    if (!codeElement?.children) {
      return hastToHtmlFn(html);
    }
    const spanElements = codeElement.children.filter(
      (child) => child.type === "element" && child.tagName === "span"
    );
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO
    spanElements.forEach((c, i) => {
      if (typeof c.properties.class === "string") {
        if (opts.opts?.highlightedLines?.includes(i + 1)) {
          c.properties.class += ` ${lineHighlightClassName}`;
        }

        if (opts.opts?.focusedLines?.includes(i + 1)) {
          c.properties.class += ` ${lineFocusClassName}`;
        }
      } else if (Array.isArray(c.properties.class)) {
        if (opts.opts?.highlightedLines?.includes(i + 1)) {
          c.properties.class.push(lineHighlightClassName);
        }

        if (opts.opts?.focusedLines?.includes(i + 1)) {
          c.properties.class.push(lineFocusClassName);
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
