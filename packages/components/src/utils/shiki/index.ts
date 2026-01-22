import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import type { ShikiTransformer } from "@shikijs/types";
import type { Element, Root } from "hast";
import { createHighlighter, hastToHtml } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  HighlighterGeneric,
} from "shiki/types";
import { codeStylingToThemeOrThemes } from "@/common/get-code-styling";
import { MAX_PREVIEW_BYTES } from "@/constants";
import { getShikiLanguageFromPreset } from "@/utils/shiki/snippet-presets";
import type { CodeStyling } from "@/validation";

import {
  LANGS,
  LINE_DIFF_ADD_CLASS_NAME,
  LINE_DIFF_REMOVE_CLASS_NAME,
  LINE_FOCUS_CLASS_NAME,
  LINE_HIGHLIGHT_CLASS_NAME,
  SHIKI_COLOR_REPLACEMENTS,
  SHIKI_LANG_MAP,
  type ShikiLanguage,
} from "./constants";
import { getShikiWorker } from "./worker-client";

const matchAlgorithm = {
  matchAlgorithm: "v3",
} as const;

const SHIKI_TRANSFORMERS: ShikiTransformer[] = [
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

const jsEngine = createJavaScriptRegexEngine({
  forgiving: true,
  cache: new Map(),
});

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined;
let highlighterError: Error | undefined;
let highlighterResolved = false;
const highlighterPromise = createHighlighter({
  themes: [],
  langs: LANGS,
  engine: jsEngine,
})
  .then((hl) => {
    highlighter = hl;
  })
  .catch((err) => {
    console.error(err);
    highlighterError =
      err ?? new Error("Unknown error occurred initializing highlighter");
  })
  .finally(() => {
    highlighterResolved = true;
  });

function getShikiLanguage(lang: string | undefined): ShikiLanguage {
  const text = "text" as ShikiLanguage;
  if (lang === undefined) {
    return text;
  }

  // Handle HTTP status codes as JSON
  const possibleStatusCode = Number(lang);
  if (
    !Number.isNaN(possibleStatusCode) &&
    possibleStatusCode > 99 &&
    possibleStatusCode < 600
  ) {
    return "json";
  }

  const lower = lang.toLowerCase();

  // Check snippet preset system first (source of truth for API playground languages)
  // e.g., "dotnet" → "csharp", "node" → "javascript"
  const presetLang = getShikiLanguageFromPreset(lower);

  // Then check shiki lang map (handles general aliases like "py" → "python")
  return SHIKI_LANG_MAP[presetLang] ?? SHIKI_LANG_MAP[lower] ?? text;
}

function getLanguageFromClassName(
  className: string | undefined,
  fallback?: string
): string {
  // biome-ignore lint/performance/useTopLevelRegex: TODO
  const match = /language-(\w+)/.exec(className ?? "");
  return match ? (match[1] ?? "text") : (fallback ?? "text");
}

function getThemesForCodeStyling(codeblocks?: CodeStyling): string[] {
  if (typeof codeblocks === "string" || !codeblocks) {
    return codeblocks === "system" || !codeblocks
      ? ["dark-plus", "github-light-default"]
      : ["dark-plus"];
  }
  const { theme } = codeblocks;
  if (typeof theme === "string") {
    return [theme];
  }
  if (typeof theme === "object") {
    return [theme.dark, theme.light];
  }
  return ["dark-plus", "github-light-default"];
}

function areThemesLoaded(codeblocks?: CodeStyling): boolean {
  if (!highlighter) {
    return false;
  }
  const loaded = highlighter.getLoadedThemes();
  const needed = getThemesForCodeStyling(codeblocks);
  return needed.every((t) => t === "css-variables" || loaded.includes(t));
}

async function loadShikiThemes(codeblocks?: CodeStyling) {
  await highlighterPromise;
  if (!highlighter) {
    return;
  }

  const loaded = highlighter.getLoadedThemes();
  const toLoad = getThemesForCodeStyling(codeblocks).filter(
    (t) => t !== "css-variables" && !loaded.includes(t)
  ) as [BundledTheme, ...BundledTheme[]];

  if (toLoad.length > 0) {
    await highlighter.loadTheme(...toLoad);
  }
}

type ShikiHighlightedHtmlArgs = {
  codeString: string;
  codeBlockTheme: CodeStyling;
  opts?: Partial<CodeToHastOptions> & {
    highlightedLines?: number[];
    focusedLines?: number[];
    noAsync?: boolean;
  };
} & (
  | {
      className: string | undefined;
      fileName?: string;
    }
  | {
      language: string;
    }
);

function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs & {
    opts: ShikiHighlightedHtmlArgs["opts"] & { noAsync: true };
  }
): string | undefined;

function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs
): string | undefined | Promise<string | undefined>;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO
function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs
): string | undefined | Promise<string | undefined> {
  if (!props.codeString || highlighterError !== undefined) {
    return undefined;
  }

  if (highlighter === undefined) {
    if (props.opts?.noAsync || highlighterResolved) {
      return undefined;
    }
    return highlighterPromise
      .then(() => getShikiHighlightedHtml(props))
      .catch(() => undefined);
  }

  if (!areThemesLoaded(props.codeBlockTheme)) {
    if (props.opts?.noAsync) {
      return undefined;
    }
    return loadShikiThemes(props.codeBlockTheme)
      .then(() => getShikiHighlightedHtml(props))
      .catch(() => undefined);
  }

  let lang: string;
  if ("language" in props) {
    if (props.language === "text") {
      return undefined;
    }
    lang = props.language;
  } else {
    if (props.className === "lang-text") {
      return undefined;
    }
    lang = getLanguageFromClassName(props.className, props.fileName);
  }

  if (props.codeString.length > MAX_PREVIEW_BYTES * 5) {
    return undefined;
  }

  if (props.codeString.length > MAX_PREVIEW_BYTES) {
    if (props.opts?.noAsync === true) {
      return undefined;
    }

    try {
      const worker = getShikiWorker();
      return worker === undefined ? undefined : worker.highlight(props);
    } catch {
      return undefined;
    }
  }

  let html: string | Root | undefined;
  if (lang) {
    try {
      const serializer =
        !!props.opts?.highlightedLines?.length ||
        !!props.opts?.focusedLines?.length
          ? "codeToHast"
          : "codeToHtml";
      const code = props.codeString.trim();
      const themeOrThemes = codeStylingToThemeOrThemes(props.codeBlockTheme);

      html = highlighter[serializer](code, {
        lang: getShikiLanguage(lang),
        ...themeOrThemes,
        colorReplacements: { ...SHIKI_COLOR_REPLACEMENTS },
        transformers: SHIKI_TRANSFORMERS,
        tabindex: false,
        ...props.opts,
      });
    } catch (error) {
      console.error("error getting shiki highlighted html", error);
    }
  }

  if (typeof html !== "object") {
    return html;
  }

  const firstChild = html.children[0];
  if (!firstChild) {
    return undefined;
  }
  if (firstChild.type === "element" && firstChild.tagName === "pre") {
    const codeElement = firstChild.children[0] as Element | undefined;
    if (!codeElement?.children) {
      return hastToHtml(html);
    }
    const spanElements = codeElement.children.filter(
      (child) => child.type === "element" && child.tagName === "span"
    ) as Element[];
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO
    spanElements.forEach((child, index) => {
      // we used 1-based index in the meta string, so we need to increment it by 1
      const actualIndex = index + 1;
      if (typeof child.properties.class === "string") {
        if (props.opts?.highlightedLines?.includes(actualIndex)) {
          child.properties.class += ` ${LINE_HIGHLIGHT_CLASS_NAME}`;
        }

        if (props.opts?.focusedLines?.includes(actualIndex)) {
          child.properties.class += ` ${LINE_FOCUS_CLASS_NAME}`;
        }
      } else if (Array.isArray(child.properties.class)) {
        if (props.opts?.highlightedLines?.includes(actualIndex)) {
          child.properties.class.push(LINE_HIGHLIGHT_CLASS_NAME);
        }

        if (props.opts?.focusedLines?.includes(actualIndex)) {
          child.properties.class.push(LINE_FOCUS_CLASS_NAME);
        }
      }
    });
  }

  return hastToHtml(html);
}

export {
  SHIKI_TRANSFORMERS,
  highlighterPromise,
  getShikiLanguage,
  getLanguageFromClassName,
  loadShikiThemes,
  type ShikiHighlightedHtmlArgs,
  getShikiHighlightedHtml,
};
