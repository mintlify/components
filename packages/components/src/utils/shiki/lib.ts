import { type ReactNode, useMemo } from "react";

import { getNodeText } from "@/utils/get-node-text";
import { SHIKI_CLASSNAME } from "@/utils/shiki/constants";

const lineIndentRegex = /^( *)/;
const closingStructureRegex = /^([}\])]|<\/)/;

function getIndent(line: string): number {
  const match = line.match(lineIndentRegex);
  return match ? match[1].length : 0;
}

function findShikiClassName(children: unknown): boolean {
  if (!children || typeof children !== "object") {
    return false;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (findShikiClassName(child)) {
        return true;
      }
    }
  }

  if (
    "props" in children &&
    children.props &&
    typeof children.props === "object"
  ) {
    if (
      "className" in children.props &&
      typeof children.props.className === "string" &&
      children.props.className.includes(SHIKI_CLASSNAME)
    ) {
      return true;
    }

    if ("children" in children.props) {
      return findShikiClassName(children.props.children);
    }
  }

  return false;
}

function dedentCode(code: string): string {
  const lines = code.split("\n");
  if (lines.length <= 1) {
    return code;
  }

  const relevantLines = lines.filter((line) => line.trim() !== "");
  if (relevantLines.length === 0) {
    return code;
  }

  const firstLine = relevantLines[0];
  const lastLine = relevantLines.at(-1) ?? firstLine;
  const firstIndent = getIndent(firstLine);
  const lastIndent = getIndent(lastLine);
  const isTemplatePolluted =
    firstIndent < lastIndent && closingStructureRegex.test(lastLine.trim());

  if (isTemplatePolluted) {
    const firstNonEmptyIndex = lines.findIndex((line) => line.trim() !== "");
    const tail = relevantLines.slice(1);
    if (tail.length === 0) {
      return code;
    }
    const minIndent = Math.min(...tail.map(getIndent));
    if (minIndent === 0) {
      return code;
    }
    return lines
      .map((line, i) =>
        i <= firstNonEmptyIndex ? line : line.slice(minIndent)
      )
      .join("\n");
  }

  const minIndent = Math.min(...relevantLines.map(getIndent));
  if (minIndent === 0) {
    return code;
  }

  return lines.map((line) => line.slice(minIndent)).join("\n");
}

function getCodeString(
  children: ReactNode,
  className?: string,
  forceExtract = false
): string {
  const isShiki =
    className?.includes(SHIKI_CLASSNAME) || findShikiClassName(children);
  if (isShiki && !forceExtract) {
    return "";
  }

  const codeString = getNodeText(children);

  return dedentCode(codeString);
}

function calculateCodeLinesFromHtml(html: string | undefined): number {
  if (!html || typeof html !== "string") {
    return 0;
  }

  const lineMatches = html.match(/<span class="line/g);
  const htmlLineCount = lineMatches ? lineMatches.length : 0;

  return htmlLineCount;
}

function useCalculateCodeLines(
  html: string | undefined,
  existingNumberOfLines?: number
): number | undefined {
  return useMemo(() => {
    if (existingNumberOfLines !== undefined) {
      return existingNumberOfLines;
    }
    return html ? calculateCodeLinesFromHtml(html) : undefined;
  }, [html, existingNumberOfLines]);
}

export { getCodeString, calculateCodeLinesFromHtml, useCalculateCodeLines };
