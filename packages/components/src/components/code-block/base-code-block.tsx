import type React from "react";

import {
  DEFAULT_EXPANDABLE_CODE_BLOCK_HEIGHT,
  SMALL_EXPANDABLE_CODE_BLOCK_HEIGHT,
  SMALL_EXPANDABLE_NUMBER_OF_LINES,
  useExpandable,
} from "@/hooks/use-expandable";
import { useGetShikiHighlightedHtml } from "@/hooks/use-get-shiki-highlighted-html";
import { cn } from "@/utils/cn";
import { getShikiBackgroundColors } from "@/utils/shiki/get-shiki-background-colors";
import { getCodeString, useCalculateCodeLines } from "@/utils/shiki/lib";

import type { CodeBlockProps } from "./code-block";
import { CodeFooter } from "./code-footer";

interface BaseCodeBlockProps extends CodeBlockProps {
  isParentCodeGroup?: boolean;
  shouldHighlight?: boolean;
  // pass isLivePreview to forceExtract to force code string theme changes
  forceExtract?: boolean;
}

const BaseCodeBlock = ({
  expandable = false,
  shouldHighlight = true,
  children,
  isParentCodeGroup,
  isSmallText,
  numberOfLines,
  forceExtract = false,
  codeBlockTheme = "system",
  codeBlockThemeObject = "system",
  ...props
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO
}: BaseCodeBlockProps) => {
  const { focus, highlight, lang, language, className, wrap, lines } = props;

  const codeString = getCodeString(children, props.className, forceExtract);

  const opts: {
    highlightedLines?: number[];
    focusedLines?: number[];
  } = {};

  let focusLines: number[] = [];
  let highlightLines: number[] = [];

  if (focus) {
    try {
      const parsed = JSON.parse(focus);
      focusLines = Array.isArray(parsed) ? parsed : [];
    } catch {
      focusLines = [];
    }
  }

  if (highlight) {
    try {
      const parsed = JSON.parse(highlight);
      highlightLines = Array.isArray(parsed) ? parsed : [];
    } catch {
      highlightLines = [];
    }
  }

  if (highlightLines.length > 0) {
    opts.highlightedLines = highlightLines;
  }
  if (focusLines.length > 0) {
    opts.focusedLines = focusLines;
  }

  const selectedLang = lang || language;

  const html = useGetShikiHighlightedHtml(
    selectedLang
      ? {
          codeString,
          codeBlockTheme: codeBlockThemeObject,
          language: shouldHighlight ? selectedLang : "text",
          opts,
        }
      : {
          codeString,
          codeBlockTheme: codeBlockThemeObject,
          className: shouldHighlight ? className : "lang-text",
          opts,
        }
  );

  numberOfLines = useCalculateCodeLines(html, numberOfLines);
  const { isExpanded, calculatedHeight, contentRef, toggleExpanded } =
    useExpandable(expandable, numberOfLines);
  const shikiBackgroundColors = getShikiBackgroundColors(
    codeBlockTheme,
    html,
    children
  );

  const isFocusEnabled = focusLines.length > 0;
  const isHighlightEnabled = highlightLines.length > 0;
  const getHeight = () => {
    if (expandable) {
      if (isExpanded) {
        return `${calculatedHeight}px`;
      }
      if (numberOfLines && numberOfLines < SMALL_EXPANDABLE_NUMBER_OF_LINES) {
        return `${SMALL_EXPANDABLE_CODE_BLOCK_HEIGHT}px`;
      }
      return `${DEFAULT_EXPANDABLE_CODE_BLOCK_HEIGHT}px`;
    }
    if (isParentCodeGroup) {
      return "100%";
    }
    return "auto";
  };
  const height = getHeight();

  return (
    <>
      <div
        className={cn(
          // prevent code blocks from growing beyond their container, setting width to 0 to recalculate the width
          "children:!my-0 children:!shadow-none children:!bg-transparent relative h-full w-0 min-w-full max-w-full px-4 py-3.5 text-sm leading-6 dark:bg-codeblock",
          "code-block-background overflow-x-auto transition-[height] duration-300 ease-in-out",
          "**:outline-0 **:ring-0 **:focus:outline-0 **:focus:ring-0",
          props.filename ? "rounded-xt" : "rounded-2xl",
          codeBlockTheme === "system" ? "bg-white" : "bg-codeblock",
          (expandable || isParentCodeGroup) && "overflow-auto",
          expandable && (isExpanded ? "overflow-y-auto" : "overflow-y-hidden"),
          wrap
            ? "code-block-wrap overflow-x-hidden whitespace-pre-wrap"
            : "overflow-x-auto",
          lines && "has-line-numbers",
          isFocusEnabled && "has-focused",
          isHighlightEnabled && "has-highlighted",
          codeBlockTheme === "system"
            ? "scrollbar-code-system"
            : "scrollbar-code-dark"
        )}
        data-component-part="code-block-root"
        style={
          {
            fontVariantLigatures: "none",
            height,
            backgroundColor: shikiBackgroundColors?.light,
            "--shiki-dark-bg": shikiBackgroundColors?.dark,
          } as React.CSSProperties
        }
      >
        {html ? (
          <div
            className={cn(
              "font-mono",
              wrap ? "whitespace-pre-wrap" : "whitespace-pre",
              isParentCodeGroup && "h-full flex-none text-sm",
              isSmallText ? "text-xs leading-[1.35rem]" : "leading-6"
            )}
            key={codeBlockTheme}
            ref={contentRef}
            suppressHydrationWarning
            {...(isParentCodeGroup && {
              "data-component-part": "code-group-tab-content",
            })}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: html is shiki highlighted html
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div
            className={cn(
              "font-mono",
              wrap ? "whitespace-pre-wrap" : "whitespace-pre",
              isParentCodeGroup && "h-full flex-none text-sm",
              isSmallText ? "text-xs leading-[1.35rem]" : "leading-6"
            )}
            ref={contentRef}
            suppressHydrationWarning
            {...(isParentCodeGroup && {
              "data-component-part": "code-group-tab-content",
            })}
          >
            {children}
          </div>
        )}
      </div>
      {!(wrap || isHighlightEnabled || expandable) &&
        focusLines.length === 0 && (
          <div
            aria-hidden
            data-fade-overlay
            style={
              {
                "--fade-color-light": shikiBackgroundColors?.light,
                "--fade-color-dark": shikiBackgroundColors?.dark,
              } as React.CSSProperties
            }
          />
        )}
      {expandable && (
        <CodeFooter
          isExpanded={isExpanded}
          numberOfLines={numberOfLines}
          toggleExpanded={toggleExpanded}
        />
      )}
    </>
  );
};

export { type BaseCodeBlockProps, BaseCodeBlock };
