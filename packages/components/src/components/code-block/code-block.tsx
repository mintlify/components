import type { ComponentPropsWithoutRef, ReactNode, RefObject } from "react";

import { Icon as ComponentIcon } from "@/components/icon";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import type { CopyToClipboardResult } from "@/utils/copy-to-clipboard";
import { getNodeText } from "@/utils/get-node-text";
import type { CodeStyling } from "@/validation";

import { BaseCodeBlock } from "./base-code-block";
import { CopyToClipboardButton } from "./copy-button";

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
  codeBlockTheme?: "dark" | "system";
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
  /**
   * The callback function when a user clicks on the copied to clipboard button
   */
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  children?: ReactNode;
};

const CodeBlock = function CodeBlock(params: CodeBlockProps) {
  const {
    filename,
    onCopied,
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
    ...props
  } = params;

  const codeString = getNodeText(children);
  // biome-ignore lint/correctness/noNestedComponentDefinitions: TODO
  const CopyButton = (
    props: Partial<ComponentPropsWithoutRef<typeof CopyToClipboardButton>>
  ) => (
    <CopyToClipboardButton
      onCopied={onCopied}
      textToCopy={codeString}
      {...props}
    />
  );
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
      {...props}
    >
      {hasGrayBackgroundContainer ? (
        <CodeHeader
          codeBlockTheme={codeBlockTheme}
          filename={filename}
          icon={icon}
        >
          {feedbackButton && feedbackButton}
          <CopyButton />
          {askAiButton && askAiButton}
        </CodeHeader>
      ) : (
        <div
          className="absolute top-3 right-4 flex items-center gap-1.5"
          data-floating-buttons
        >
          {feedbackButton && feedbackButton}
          <CopyButton />
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

type CodeHeaderProps = {
  filename?: string;
  icon?: string;
  codeBlockTheme?: "dark" | "system";
  children?: ReactNode;
};

/**
 * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
 * Styling should look the same though.
 */
function CodeHeader({
  filename,
  icon,
  codeBlockTheme = "system",
  children,
}: CodeHeaderProps) {
  return (
    <div
      className="flex rounded-t-[14px] py-1 pr-2.5 pl-4 font-medium text-gray-400 text-xs leading-6"
      data-component-part="code-block-header"
    >
      <div
        className={cn(
          "flex flex-none items-center gap-1.5 text-gray-700 dark:text-gray-300",
          codeBlockTheme === "dark" && "text-gray-300"
        )}
        data-component-part="code-block-header-filename"
      >
        {icon && (
          <ComponentIcon
            className={cn(
              "size-3.5 bg-gray-500 dark:bg-gray-400",
              Classes.CodeBlockIcon
            )}
            icon={icon}
            iconType="regular"
            overrideColor
          />
        )}
        {filename}
      </div>
      <div className="flex flex-1 items-center justify-end gap-1.5">
        {children}
      </div>
    </div>
  );
}

export { type CodeBlockProps, CodeBlock };
