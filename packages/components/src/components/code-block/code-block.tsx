import type { ReactNode, RefObject } from "react";

import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import { getNodeText } from "@/utils/get-node-text";
import type { CodeBlockTheme, CodeStyling } from "@/validation";

import { BaseCodeBlock } from "./base-code-block";
import { CodeHeader } from "./code-header";
import {
  CopyToClipboardButton,
  type CopyToClipboardButtonProps,
} from "./copy-button";

type CodeBlockProps = {
  language?: string;
  filename?: string;
  icon?: string;
  lang?: string;
  className?: string;
  /**
   * Whether to show line numbers.
   */
  lines?: boolean;
  /**
   * Whether to wrap the code block.
   */
  wrap?: boolean;
  /**
   * Whether to expand the code block.
   */
  expandable?: boolean;
  /**
   * The lines to highlight. it's a stringified array of numbers.
   * Example: "[1,3,4,5]"
   */
  highlight?: string;
  /**
   * The lines to focus on. it's a stringified array of numbers.
   * Example: "[1,3,4,5]"
   */
  focus?: string;
  /**
   * Internal prop to set the number of lines in the code block.
   * Users should not set this prop.
   */
  numberOfLines?: number;
  /**
   * Prop to hide the ask ai button
   */
  hideAskAiButton?: boolean;
  /**
   * Prop to set the small text size
   */
  isSmallText?: boolean;
  /**
   * Pass in from CodeSnippetFeedbackProvider
   */
  feedbackModalOpen?: boolean;
  /**
   * Pass in from CodeSnippetFeedbackProvider
   */
  anchorRef?: RefObject<HTMLDivElement>;
  /**
   * Prop to set the code block theme (code block UI theme)
   */
  codeBlockTheme?: CodeBlockTheme;
  /**
   * Prop to set the code block theme object (syntax highlighting theme)
   */
  codeBlockThemeObject?: CodeStyling;
  /**
   * Pass in AskAiCodeBlockButton component
   */
  askAiButton?: ReactNode;
  /**
   * Pass in CodeSnippetFeedbackButton component
   */
  feedbackButton?: ReactNode;
  children?: ReactNode;
  copyButtonProps?: CopyToClipboardButtonProps;
};

const CodeBlock = function CodeBlock(params: CodeBlockProps) {
  const {
    filename,
    children,
    className,
    icon,
    isSmallText,
    hideAskAiButton,
    feedbackModalOpen,
    anchorRef,
    codeBlockTheme = "system",
    codeBlockThemeObject,
    askAiButton,
    feedbackButton,
    copyButtonProps,
  } = params;

  const codeString = getNodeText(children);
  const hasGrayBackgroundContainer = !!filename || !!icon;

  return (
    <div
      className={cn(
        Classes.CodeBlock,
        "not-prose group relative mt-5 mb-8 rounded-2xl",
        codeBlockTheme === "system" &&
          "codeblock-light dark:twoslash-dark border border-gray-950/10 bg-gray-50 text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-50",
        codeBlockTheme === "dark" &&
          "codeblock-dark twoslash-dark dark:twoslash-dark bg-codeblock text-gray-50 ring-1 ring-transparent dark:bg-white/5 dark:ring-white/[0.14]",
        hasGrayBackgroundContainer
          ? "p-0.5"
          : "bg-transparent dark:bg-transparent",
        feedbackModalOpen && "border border-primary dark:border-primary-light",
        className
      )}
      ref={anchorRef}
    >
      {hasGrayBackgroundContainer ? (
        <CodeHeader
          codeBlockTheme={codeBlockTheme}
          filename={filename}
          icon={icon}
        >
          {feedbackButton && feedbackButton}
          <CopyToClipboardButton
            codeBlockTheme={codeBlockTheme}
            textToCopy={codeString}
            {...copyButtonProps}
          />
          {askAiButton && askAiButton}
        </CodeHeader>
      ) : (
        <div
          className="absolute top-3 right-4 flex items-center gap-1.5"
          data-floating-buttons
        >
          {feedbackButton && feedbackButton}
          <CopyToClipboardButton
            codeBlockTheme={codeBlockTheme}
            textToCopy={codeString}
            {...copyButtonProps}
          />
          {askAiButton && askAiButton}
        </div>
      )}
      <BaseCodeBlock
        codeBlockTheme={codeBlockTheme}
        codeBlockThemeObject={codeBlockThemeObject}
        hideAskAiButton={hideAskAiButton}
        isSmallText={isSmallText}
        {...params}
      />
    </div>
  );
};

export { type CodeBlockProps, CodeBlock };
