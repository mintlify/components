import {
  codeStylingToThemeOrThemes,
  CodeStyling,
  DocsConfig,
} from './types';
import {
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers';
import type { Root, Element } from 'hast';
import { createHighlighter, hastToHtml } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  HighlighterGeneric,
  ShikiTransformer,
} from 'shiki/types';

import { MAX_PREVIEW_BYTES } from '@/constants';
import { getShikiLanguageFromPreset } from '@/constants/snippetPresets';

import {
  LANGS,
  shikiColorReplacements,
  shikiLangMap,
  LINE_HIGHLIGHT_CLASS_NAME,
  LINE_FOCUS_CLASS_NAME,
  type ShikiLanguage,
  LINE_DIFF_REMOVE_CLASS_NAME,
  LINE_DIFF_ADD_CLASS_NAME,
} from './constants';
import { getShikiWorker } from './worker-client';

const matchAlgorithm = {
  matchAlgorithm: 'v3',
} as const;

export const SHIKI_TRANSFORMERS: ShikiTransformer[] = [
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

const jsEngine = createJavaScriptRegexEngine({ forgiving: true, cache: new Map() });

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined = undefined;
let highlighterError: Error | undefined = undefined;
let highlighterResolved: boolean = false;
export const highlighterPromise = createHighlighter({
  themes: [],
  langs: LANGS,
  engine: jsEngine,
})
  .then((hl) => {
    highlighter = hl;
  })
  .catch((err) => {
    console.error(err);
    highlighterError = err ?? new Error('Unknown error occurred initializing highlighter');
  })
  .finally(() => {
    highlighterResolved = true;
  });

export function getShikiLanguage(lang: string | undefined): ShikiLanguage {
  const text = 'text' as ShikiLanguage;
  if (lang === undefined) return text;

  // Handle HTTP status codes as JSON
  const possibleStatusCode = Number(lang);
  if (!isNaN(possibleStatusCode) && possibleStatusCode > 99 && possibleStatusCode < 600) {
    return 'json';
  }

  const lower = lang.toLowerCase();

  // Check snippet preset system first (source of truth for API playground languages)
  // e.g., "dotnet" → "csharp", "node" → "javascript"
  const presetLang = getShikiLanguageFromPreset(lower);

  // Then check shikiLangMap (handles general aliases like "py" → "python")
  return shikiLangMap[presetLang] ?? shikiLangMap[lower] ?? text;
}

export function getLanguageFromClassName(className: string | undefined, fallback?: string): string {
  const match = /language-(\w+)/.exec(className ?? '');
  return match ? match[1] ?? 'text' : fallback ?? 'text';
}

let hasLoadedThemes: boolean = false;
export async function loadShikiThemes(
  codeblocks?: NonNullable<DocsConfig['styling']>['codeblocks'],
  //Used for storybook testing
  force?: boolean
) {
  await highlighterPromise;
  if (hasLoadedThemes && !force) return;
  if (!highlighter) return;

  if (typeof codeblocks === 'string' || !codeblocks) {
    if (codeblocks === 'system' || !codeblocks) {
      await highlighter.loadTheme('dark-plus', 'github-light-default');
    } else {
      await highlighter.loadTheme('dark-plus');
    }
    hasLoadedThemes = true;
    return;
  }

  const { theme } = codeblocks;
  if (typeof theme === 'string' && theme !== 'css-variables') {
    await highlighter.loadTheme(theme as BundledTheme);
  } else if (typeof theme === 'object') {
    if (theme.dark !== 'css-variables' && theme.light !== 'css-variables') {
      await highlighter.loadTheme(theme.dark as BundledTheme, theme.light as BundledTheme);
    } else if (theme.dark !== 'css-variables') {
      await highlighter.loadTheme(theme.dark as BundledTheme);
    } else if (theme.light !== 'css-variables') {
      await highlighter.loadTheme(theme.light as BundledTheme);
    }
  }

  hasLoadedThemes = true;
}

export type ShikiHighlightedHtmlArgs = {
  codeString: string;
  codeBlockTheme?: CodeStyling;
  opts?: Partial<CodeToHastOptions> & {
    highlightedLines?: Array<number>;
    focusedLines?: Array<number>;
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

// Function overloads for getShikiHighlightedHtml
/* eslint-disable no-redeclare */
export function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs & {
    opts: ShikiHighlightedHtmlArgs['opts'] & { noAsync: true };
  }
): string | undefined;

export function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs
): string | undefined | Promise<string | undefined>;

export function getShikiHighlightedHtml(
  props: ShikiHighlightedHtmlArgs
): string | undefined | Promise<string | undefined> {
/* eslint-enable no-redeclare */
  if (!props.codeString || highlighterError !== undefined) return undefined;

  if (highlighter === undefined) {
    if (props.opts?.noAsync || highlighterResolved) return undefined;
    return highlighterPromise.then(() => getShikiHighlightedHtml(props)).catch(() => undefined);
  }

  if (!hasLoadedThemes) {
    if (props.opts?.noAsync) return undefined;
    return loadShikiThemes()
      .then(() => getShikiHighlightedHtml(props))
      .catch(() => undefined);
  }

  let lang: string;
  if ('language' in props) {
    if (props.language === 'text') return undefined;
    lang = props.language;
  } else {
    if (props.className === 'lang-text') return undefined;
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
      return worker == undefined ? undefined : worker.highlight(props);
    } catch {
      return undefined;
    }
  }

  let html: string | Root | undefined = undefined;
  if (lang) {
    try {
      const serializer =
        !!props.opts?.highlightedLines?.length || !!props.opts?.focusedLines?.length
          ? 'codeToHast'
          : 'codeToHtml';
      const code = props.codeString.trim();
      const themeOrThemes = codeStylingToThemeOrThemes(props.codeBlockTheme);

      html = highlighter[serializer](code, {
        lang: getShikiLanguage(lang),
        ...themeOrThemes,
        colorReplacements: { ...shikiColorReplacements },
        transformers: SHIKI_TRANSFORMERS,
        tabindex: false,
        ...props.opts,
      });
    } catch {
      // Ignore errors during highlighting
    }
  }

  if (typeof html !== 'object') {
    return html;
  }

  const firstChild = html.children[0];
  if (!firstChild) return undefined;
  if (firstChild.type === 'element' && firstChild.tagName === 'pre') {
    const spanElements = (firstChild.children[0] as Element).children.filter(
      (child) => child.type === 'element' && child.tagName === 'span'
    ) as Element[];
    spanElements.forEach((child, index) => {
      // we used 1-based index in the meta string, so we need to increment it by 1
      const actualIndex = index + 1;
      if (typeof child.properties.class === 'string') {
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
