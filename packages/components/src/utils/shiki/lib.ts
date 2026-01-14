import { ReactNode, useMemo } from 'react';

import { getNodeText } from '@/components/code/getNodeText';
import { SHIKI_CLASSNAME } from '@/utils/shiki/constants';

function findShikiClassName(children: unknown): boolean {
  if (!children || typeof children !== 'object') return false;

  if (Array.isArray(children)) {
    for (const child of children) {
      if (findShikiClassName(child)) return true;
    }
  }

  if ('props' in children && children.props && typeof children.props === 'object') {
    if (
      'className' in children.props &&
      typeof children.props.className === 'string' &&
      children.props.className.includes(SHIKI_CLASSNAME)
    ) {
      return true;
    }

    if ('children' in children.props) {
      return findShikiClassName(children.props.children);
    }
  }

  return false;
}

export function getCodeString(
  children: ReactNode,
  className?: string,
  forceExtract = false
): string {
  const isShiki = className?.includes(SHIKI_CLASSNAME) || findShikiClassName(children);
  if (isShiki && !forceExtract) return '';

  const codeString = getNodeText(children);

  return codeString;
}

export function calculateCodeLinesFromHtml(html: string | undefined): number {
  if (!html || typeof html !== 'string') {
    return 0;
  }

  const lineMatches = html.match(/<span class="line/g);
  const htmlLineCount = lineMatches ? lineMatches.length : 0;

  return htmlLineCount;
}

export function useCalculateCodeLines(
  html: string | undefined,
  existingNumberOfLines?: number
): number | undefined {
  return useMemo(() => {
    if (existingNumberOfLines !== undefined) return existingNumberOfLines;
    return html ? calculateCodeLinesFromHtml(html) : undefined;
  }, [html, existingNumberOfLines]);
}
