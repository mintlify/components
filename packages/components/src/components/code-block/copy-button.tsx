import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { ActiveCopyButtonIcon, CopyButtonIcon } from "@/icons";
import { cn } from "@/utils/cn";
import {
  type CopyToClipboardResult,
  copyToClipboard,
} from "@/utils/copy-to-clipboard";
import type { CodeBlockTheme } from "@/validation";

const DEFAULT_COPY_BUTTON_ARIA_LABEL = "Copy the contents from the code block";
const DEFAULT_TOOLTIP_COPY_TEXT = "Copy";
const DEFAULT_TOOLTIP_COPIED_TEXT = "Copied!";

type CopyToClipboardButtonProps = {
  textToCopy: string;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  className?: string;
  showTooltip?: boolean;
  codeBlockTheme?: CodeBlockTheme;
  copyButtonAriaLabel?: string;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
};

const CopyToClipboardButton = ({
  textToCopy,
  onCopied,
  className,
  showTooltip = true,
  codeBlockTheme,
  copyButtonAriaLabel = DEFAULT_COPY_BUTTON_ARIA_LABEL,
  tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
  tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
  ...buttonProps
}: CopyToClipboardButtonProps & ComponentPropsWithoutRef<"button">) => {
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
    <div className={cn("relative z-10 select-none", className)}>
      <button
        {...buttonProps}
        aria-label={copyButtonAriaLabel}
        className={
          "peer group/copy-button flex h-[26px] w-[26px] items-center justify-center rounded-md backdrop-blur"
        }
        data-testid="copy-code-button"
        onClick={onCopy}
        type="button"
      >
        {isCopiedActive ? (
          <ActiveCopyButtonIcon codeBlockTheme={codeBlockTheme} />
        ) : (
          <CopyButtonIcon codeBlockTheme={codeBlockTheme} />
        )}
      </button>
      {showTooltip && (
        <div
          aria-hidden
          className="absolute top-11 left-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-primary-dark px-1.5 py-0.5 text-tooltip-foreground text-xs opacity-0 peer-hover:opacity-100"
        >
          {isCopiedActive ? tooltipCopiedText : tooltipCopyText}
        </div>
      )}
    </div>
  );
};

export { type CopyToClipboardButtonProps, CopyToClipboardButton };
