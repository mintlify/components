import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { ActiveCopyButtonIcon, CopyButtonIcon } from "@/icons";
import { cn } from "@/utils/cn";
import {
  type CopyToClipboardResult,
  copyToClipboard,
} from "@/utils/copy-to-clipboard";

const DEFAULT_COPY_BUTTON_ARIA_LABEL = "Copy the contents from the code block";
const DEFAULT_TOOLTIP_COPY_TEXT = "Copy";
const DEFAULT_TOOLTIP_COPIED_TEXT = "Copied!";

type CodeGroupCopyButtonProps = {
  code: string;
  // pass in useAnalyticsContext('docs.code_group.copy')
  onCopy?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  codeBlockTheme?: "system" | "dark";
  // pass in ariaLabel from useSelectedLocale['aria.copyCodeBlock']
  copyButtonAriaLabel?: string;
  // pass in tooltipCopyText from useSelectedLocale['tooltip.copy']
  tooltipCopyText?: string;
  // pass in tooltipCopiedText from useSelectedLocale['tooltip.copied']
  tooltipCopiedText?: string;
};

export const CodeGroupCopyButton = ({
  code,
  onCopy,
  codeBlockTheme = "system",
  copyButtonAriaLabel = DEFAULT_COPY_BUTTON_ARIA_LABEL,
  tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
  tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
}: CodeGroupCopyButtonProps) => {
  return (
    <div data-testid="code-group-select-copy-button">
      <CopyToClipboardButton
        codeBlockTheme={codeBlockTheme}
        copyButtonAriaLabel={copyButtonAriaLabel}
        onCopied={
          onCopy
            ? (result, textToCopy) => onCopy(result, textToCopy)
            : undefined
        }
        textToCopy={code}
        tooltipCopiedText={tooltipCopiedText}
        tooltipCopyText={tooltipCopyText}
      />
    </div>
  );
};

type CopyToClipboardButtonProps = {
  textToCopy: string;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  className?: string;
  showTooltip?: boolean;
  codeBlockTheme?: "system" | "dark";
  copyButtonAriaLabel?: string;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
};

export function CopyToClipboardButton({
  textToCopy,
  onCopied,
  className,
  showTooltip = true,
  codeBlockTheme,
  copyButtonAriaLabel = DEFAULT_COPY_BUTTON_ARIA_LABEL,
  tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
  tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
}: CopyToClipboardButtonProps & ComponentPropsWithoutRef<"button">) {
  const trimmedTextToCopy = textToCopy.trim();
  const [isCopiedActive, setIsCopiedActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Hide copy button if the browser does not support it
    if (typeof window !== "undefined" && !navigator.clipboard) {
      console.warn(
        "The browser's Clipboard API is unavailable. The Clipboard API is only available on HTTPS."
      );
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  // Hide copy button if you would copy an empty string
  if (!trimmedTextToCopy || isDisabled) {
    return null;
  }

  const onCopy = async () => {
    const result = await copyToClipboard(trimmedTextToCopy);
    if (onCopied) {
      onCopied(result, trimmedTextToCopy);
    }
    if (result === "success") {
      setIsCopiedActive(true);
      setTimeout(() => {
        setIsCopiedActive(false);
      }, 2000);
    }
  };

  return (
    <CopyIconButton
      className={className}
      codeBlockTheme={codeBlockTheme}
      copyButtonAriaLabel={copyButtonAriaLabel}
      isCopiedActive={isCopiedActive}
      onClick={onCopy}
      showTooltip={showTooltip}
      tooltipCopiedText={tooltipCopiedText}
      tooltipCopyText={tooltipCopyText}
    />
  );
}

type CopyIconButtonProps = {
  onClick: () => void;
  isCopiedActive: boolean;
  showTooltip?: boolean;
  className?: string;
  codeBlockTheme?: "system" | "dark";
  copyButtonAriaLabel?: string;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
};

export function CopyIconButton({
  onClick,
  isCopiedActive,
  showTooltip = true,
  className,
  codeBlockTheme,
  copyButtonAriaLabel = DEFAULT_COPY_BUTTON_ARIA_LABEL,
  tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
  tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
}: CopyIconButtonProps) {
  return (
    <div className={cn("relative z-10 select-none", className)}>
      <button
        aria-label={copyButtonAriaLabel}
        className={
          "peer group/copy-button flex h-[26px] w-[26px] items-center justify-center rounded-md backdrop-blur"
        }
        data-testid="copy-code-button"
        onClick={onClick}
        type="button"
      >
        {isCopiedActive ? (
          <ActiveCopyButtonIcon codeBlockTheme={codeBlockTheme} />
        ) : (
          <CopyButtonIcon codeBlockTheme={codeBlockTheme} />
        )}
      </button>
      {showTooltip && (
        <CodeBlockTooltip
          text={isCopiedActive ? tooltipCopiedText : tooltipCopyText}
        />
      )}
    </div>
  );
}

export function CodeBlockTooltip({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="absolute top-11 left-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-primary-dark px-1.5 py-0.5 text-tooltip-foreground text-xs opacity-0 peer-hover:opacity-100"
    >
      {text}
    </div>
  );
}
