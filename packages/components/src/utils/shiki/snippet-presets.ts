type SnippetPreset = {
  /** Canonical identifier (e.g., 'python', 'bash') */
  key: string;
  /** Alternative names that map to this preset (e.g., ['py'] for python) */
  aliases?: string[];
  /** Human-readable name (e.g., "Python", "cURL") */
  displayName: string;
  /** Devicon SVG name if different from key (e.g., 'dot-net' for '.NET') */
  iconKey?: string;
  /** Shiki language for syntax highlighting */
  shikiLanguage: string;
  /** httpsnippet config for code generation */
  httpSnippet: {
    target: string;
    client?: string;
  };
};

/**
 * Central config for API playground language options.
 * Each preset defines: display info, icon, syntax highlighting, and code generation.
 */
const SNIPPET_PRESETS: SnippetPreset[] = [
  {
    key: "bash",
    aliases: ["curl", "sh", "shell"],
    displayName: "cURL",
    shikiLanguage: "bash",
    httpSnippet: { target: "shell" },
  },
  {
    key: "python",
    aliases: ["py"],
    displayName: "Python",
    shikiLanguage: "python",
    httpSnippet: { target: "python", client: "requests" },
  },
  {
    key: "javascript",
    aliases: ["js"],
    displayName: "JavaScript",
    shikiLanguage: "javascript",
    httpSnippet: { target: "javascript", client: "fetch" },
  },
  {
    key: "node",
    aliases: ["nodejs", "node.js"],
    displayName: "Node.js",
    iconKey: "node",
    shikiLanguage: "javascript",
    httpSnippet: { target: "node", client: "fetch" },
  },
  {
    key: "php",
    displayName: "PHP",
    shikiLanguage: "php",
    httpSnippet: { target: "php", client: "curl" },
  },
  {
    key: "go",
    aliases: ["golang"],
    displayName: "Go",
    shikiLanguage: "go",
    httpSnippet: { target: "go" },
  },
  {
    key: "java",
    displayName: "Java",
    shikiLanguage: "java",
    httpSnippet: { target: "java" },
  },
  {
    key: "ruby",
    aliases: ["rb"],
    displayName: "Ruby",
    shikiLanguage: "ruby",
    httpSnippet: { target: "ruby" },
  },
  {
    key: "powershell",
    displayName: "PowerShell",
    shikiLanguage: "bash", // shiki doesn't have powershell in our LANGS
    httpSnippet: { target: "powershell" },
  },
  {
    key: "swift",
    displayName: "Swift",
    shikiLanguage: "swift",
    httpSnippet: { target: "swift" },
  },
  {
    key: "csharp",
    aliases: ["c#"],
    displayName: "C#",
    shikiLanguage: "csharp",
    httpSnippet: { target: "csharp", client: "restsharp" },
  },
  {
    key: "dotnet",
    aliases: [".net", ".NET", "dotnet", "dot-net"],
    displayName: ".NET",
    iconKey: "dot-net",
    shikiLanguage: "csharp",
    httpSnippet: { target: "csharp", client: "restsharp" },
  },
  {
    key: "typescript",
    aliases: ["ts"],
    displayName: "TypeScript",
    shikiLanguage: "typescript",
    httpSnippet: { target: "javascript", client: "fetch" },
  },
  {
    key: "c",
    displayName: "C",
    shikiLanguage: "c",
    httpSnippet: { target: "c" },
  },
  {
    key: "c++",
    aliases: ["cpp"],
    displayName: "C++",
    shikiLanguage: "c++",
    iconKey: "cplusplus",
    httpSnippet: { target: "c" },
  },
  {
    key: "kotlin",
    aliases: ["kt"],
    displayName: "Kotlin",
    shikiLanguage: "kotlin",
    httpSnippet: { target: "kotlin" },
  },
  {
    key: "rust",
    aliases: ["rs"],
    displayName: "Rust",
    shikiLanguage: "rust",
    httpSnippet: { target: "rust" },
  },
  {
    key: "dart",
    aliases: ["flutter"],
    displayName: "Dart",
    shikiLanguage: "dart",
    httpSnippet: { target: "dart" },
  },
];

const presetLookup = new Map<string, SnippetPreset>();
for (const preset of SNIPPET_PRESETS) {
  presetLookup.set(preset.key.toLowerCase(), preset);
  for (const alias of preset.aliases ?? []) {
    presetLookup.set(alias.toLowerCase(), preset);
  }
}

const getPreset = (lang: string): SnippetPreset | undefined =>
  presetLookup.get(lang.toLowerCase());

const getDisplayName = (lang: string): string =>
  getPreset(lang)?.displayName ?? lang;

const getIconKey = (lang: string): string | undefined => {
  const preset = getPreset(lang);
  return preset ? (preset.iconKey ?? preset.key) : undefined;
};

const getShikiLanguageFromPreset = (lang: string): string =>
  getPreset(lang)?.shikiLanguage ?? lang;

export {
  type SnippetPreset,
  SNIPPET_PRESETS,
  getPreset,
  getDisplayName,
  getIconKey,
  getShikiLanguageFromPreset,
};
