import { memo, type ReactNode } from "react";

import { useGetShikiHighlightedHtml } from "@/hooks/use-get-shiki-highlighted-html";
import type { CodeStyling } from "@/utils/shiki/code-styling";
import { SHIKI_CLASSNAME } from "@/utils/shiki/constants";

type CodeSnippetProps = {
  language?: string;
  /**
   * If `children` is a `string`, `Shiki` will be emitted
   */
  children?: ReactNode;
  codeBlockThemeObject?: CodeStyling;
};

const CodeSnippet = memo(
  ({ language, children, codeBlockThemeObject }: CodeSnippetProps) => {
    const codeString = typeof children === "string" ? children : "";
    language = language ?? "text";
    const html = useGetShikiHighlightedHtml({
      codeString,
      codeBlockTheme: codeBlockThemeObject,
      language,
      opts: { structure: "inline" },
    });

    if (typeof children === "string" && language && html) {
      return (
        <pre className={SHIKI_CLASSNAME} suppressHydrationWarning>
          <code
            // biome-ignore lint/security/noDangerouslySetInnerHtml: html is shiki highlighted html
            dangerouslySetInnerHTML={{ __html: html }}
            suppressHydrationWarning
          />
        </pre>
      );
    }

    return (
      <pre className={SHIKI_CLASSNAME} suppressHydrationWarning>
        <code suppressHydrationWarning>{children}</code>
      </pre>
    );
  }
);

export { CodeSnippet, type CodeSnippetProps };
