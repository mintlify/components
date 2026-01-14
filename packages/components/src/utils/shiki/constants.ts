import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME } from '@/common/constants';
import { SHIKI_THEMES } from '@/mdx/constants';
import type { BuiltinTheme } from 'shiki/types';

export const LINE_HIGHLIGHT_CLASS_NAME = 'line-highlight';
export const LINE_FOCUS_CLASS_NAME = 'line-focus';
export const LINE_DIFF_ADD_CLASS_NAME = 'line-diff line-add';
export const LINE_DIFF_REMOVE_CLASS_NAME = 'line-diff line-remove';

const SHIKI_THEMES_EXCLUDING_CSS_VARIABLES_AND_DEFAULTS = SHIKI_THEMES.filter(
  (theme) =>
    theme !== 'css-variables' && theme !== DEFAULT_DARK_THEME && theme !== DEFAULT_LIGHT_THEME
);

export const DEFAULT_DARK_BG = '#0B0C0E';
export const DEFAULT_LIGHT_BG = '#FFFFFF';

export const THEMES: [BuiltinTheme, BuiltinTheme, ...BuiltinTheme[]] = [
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  ...SHIKI_THEMES_EXCLUDING_CSS_VARIABLES_AND_DEFAULTS,
] as const;

export const LANGS = [
  'bash' as const,
  'c' as const,
  'c++' as const,
  'dart' as const,
  'go' as const,
  'java' as const,
  'javascript' as const,
  'json' as const,
  'kotlin' as const,
  'php' as const,
  'python' as const,
  'ruby' as const,
  'rust' as const,
  'swift' as const,
  'csharp' as const,
  'typescript' as const,
  'tsx' as const,
  'yaml' as const,
];

export type ShikiTheme = BuiltinTheme;
export type ShikiLanguage = (typeof LANGS)[number];

export const shikiColorReplacements: Record<string, string | Record<string, string>> = {
  [THEMES[0]]: {
    '#1e1e1e': DEFAULT_DARK_BG,
  },
};

export const shikiThemeMap: Record<'dark' | 'light', ShikiTheme> = {
  dark: THEMES[0],
  light: THEMES[1],
} as const;

export const shikiLangMap: Record<string, ShikiLanguage> = {
  curl: 'bash',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  shellscript: 'bash',

  c: 'c',
  csharp: 'csharp',

  'c++': 'c++',
  cpp: 'c++',
  cc: 'c++',

  go: 'go',
  golang: 'go',

  java: 'java',

  javascript: 'javascript',
  js: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',

  json: 'json',
  jsonc: 'json',
  json5: 'json',

  php: 'php',

  python: 'python',
  py: 'python',

  typescript: 'typescript',
  ts: 'typescript',

  tsx: 'tsx',
  react: 'tsx',
  reactts: 'tsx',
  'react-ts': 'tsx',
  jsx: 'tsx',

  ruby: 'ruby',
  rb: 'ruby',

  rust: 'rust',
  rs: 'rust',
  rustc: 'rust',

  swift: 'swift',
  kotlin: 'kotlin',
  kt: 'kotlin',
  dart: 'dart',
  flutter: 'dart',

  yaml: 'yaml',
  yml: 'yaml',
  toml: 'yaml',
} as const;

export const shikiDisplayLangMap: Record<string, string> = {
  bash: 'cURL',
  c: 'C',
  'c++': 'C++',
  'c#': 'C#',
  '.NET': '.NET',
  dart: 'Dart',
  go: 'Go',
  java: 'Java',
  javascript: 'Javascript',
  json: 'JSON',
  kotlin: 'Kotlin',
  node: 'Node.js',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  rust: 'Rust',
  swift: 'Swift',
  typescript: 'Typescript',
  tsx: 'TSX',
  yaml: 'YAML',
} as const;

export const SHIKI_CLASSNAME = 'shiki shiki-themes';
