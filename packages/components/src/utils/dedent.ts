const INDENT_REGEX = /^[ ]*/;

export function dedent(code: string): string {
  const lines = code.split("\n");

  while (lines.length && lines[0].trim() === "") {
    lines.shift();
  }

  while (lines.length && lines.at(-1)?.trim() === "") {
    lines.pop();
  }

  if (lines.length === 0) {
    return "";
  }

  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(INDENT_REGEX)?.[0].length ?? 0);

  const minIndent = Math.min(...indents);

  return lines.map((line) => line.slice(minIndent)).join("\n");
}
