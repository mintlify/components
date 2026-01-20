import { useState, useEffect, ComponentPropsWithoutRef } from 'react';
import { CopyToClipboardResult, copyToClipboard } from '@/utils/copyToClipboard';
import { cn } from '@/utils/cn';

const DEFAULT_ARIA_LABEL = 'Copy the contents from the code block';
const DEFAULT_TOOLTIP_COPY_TEXT = 'Copy';
const DEFAULT_TOOLTIP_COPIED_TEXT = 'Copied!';

type CodeGroupCopyButtonProps = {
    code: string;
    // pass in useAnalyticsContext('docs.code_group.copy')
    onCopy?: (result: CopyToClipboardResult, textToCopy?: string) => void;
    codeBlockTheme?: 'system' | 'dark';
    // pass in ariaLabel from useSelectedLocale['aria.copyCodeBlock']
    ariaLabel?: string;
    // pass in tooltipCopyText from useSelectedLocale['tooltip.copy']
    tooltipCopyText?: string;
    // pass in tooltipCopiedText from useSelectedLocale['tooltip.copied']
    tooltipCopiedText?: string;
};

export const CodeGroupCopyButton = ({ code, onCopy, codeBlockTheme = 'system', ariaLabel = DEFAULT_ARIA_LABEL, tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT, tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT }: CodeGroupCopyButtonProps) => {
    return (
        <div data-testid="code-group-select-copy-button">
            <CopyToClipboardButton
                textToCopy={code}
                onCopied={onCopy ? (result, textToCopy) => onCopy(result, textToCopy) : undefined}
                codeBlockTheme={codeBlockTheme}
                ariaLabel={ariaLabel}
                tooltipCopyText={tooltipCopyText}
                tooltipCopiedText={tooltipCopiedText}
            />
        </div>
    );
};

type CopyToClipboardButtonProps = {
    textToCopy: string;
    onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
    className?: string;
    showTooltip?: boolean;
    codeBlockTheme?: 'system' | 'dark';
    ariaLabel?: string;
    tooltipCopyText?: string;
    tooltipCopiedText?: string;
}


export function CopyToClipboardButton({
    textToCopy,
    onCopied,
    className,
    showTooltip = true,
    codeBlockTheme,
    ariaLabel = DEFAULT_ARIA_LABEL,
    tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
    tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
}: CopyToClipboardButtonProps & ComponentPropsWithoutRef<'button'>) {
    const trimmedTextToCopy = textToCopy.trim();
    const [isCopiedActive, setIsCopiedActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Hide copy button if the browser does not support it
        if (typeof window !== 'undefined' && !navigator.clipboard) {
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
        if (result === 'success') {
            setIsCopiedActive(true);
            setTimeout(() => {
                setIsCopiedActive(false);
            }, 2000);
        }
    };

    return (
        <CopyIconButton
            onClick={onCopy}
            isCopiedActive={isCopiedActive}
            className={className}
            showTooltip={showTooltip}
            codeBlockTheme={codeBlockTheme}
            ariaLabel={ariaLabel}
            tooltipCopyText={tooltipCopyText}
            tooltipCopiedText={tooltipCopiedText}
        />
    );
}

type CopyIconButtonProps = {
    onClick: () => void;
    isCopiedActive: boolean;
    showTooltip?: boolean;
    className?: string;
    codeBlockTheme?: 'system' | 'dark';
    ariaLabel?: string;
    tooltipCopyText?: string;
    tooltipCopiedText?: string;
}

export function CopyIconButton({
    onClick,
    isCopiedActive,
    showTooltip = true,
    className,
    codeBlockTheme,
    ariaLabel = DEFAULT_ARIA_LABEL,
    tooltipCopyText = DEFAULT_TOOLTIP_COPY_TEXT,
    tooltipCopiedText = DEFAULT_TOOLTIP_COPIED_TEXT,
}: CopyIconButtonProps) {

    return (
        <div className={cn('z-10 relative select-none', className)}>
            <button
                className={
                    'h-[26px] w-[26px] flex items-center justify-center rounded-md backdrop-blur peer group/copy-button '
                }
                onClick={onClick}
                data-testid="copy-code-button"
                aria-label={ariaLabel}
            >
                {isCopiedActive ? (
                    <svg
                        className={cn(
                            codeBlockTheme === 'system' && 'fill-primary dark:fill-primary-light',
                            codeBlockTheme === 'dark' && 'fill-primary-light'
                        )}
                        width="16"
                        height="11"
                        viewBox="0 0 16 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M14.7813 1.21873C15.0751 1.51248 15.0751 1.98748 14.7813 2.2781L6.53135 10.5312C6.2376 10.825 5.7626 10.825 5.47197 10.5312L1.21885 6.28123C0.925098 5.98748 0.925098 5.51248 1.21885 5.22185C1.5126 4.93123 1.9876 4.9281 2.27822 5.22185L5.99697 8.9406L13.7188 1.21873C14.0126 0.924976 14.4876 0.924976 14.7782 1.21873H14.7813Z" />
                    </svg>
                ) : (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                            'w-4 h-4',
                            codeBlockTheme === 'system' &&
                            'text-gray-400 group-hover/copy-button:text-gray-500 dark:text-white/40 dark:group-hover/copy-button:text-white/60',
                            codeBlockTheme === 'dark' && 'text-white/40 group-hover/copy-button:text-white/60'
                        )}
                    >
                        <path
                            d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
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
            className="absolute top-11 left-1/2 transform whitespace-nowrap -translate-x-1/2 -translate-y-1/2 peer-hover:opacity-100 opacity-0 text-tooltip-foreground rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark"
        >
            {text}
        </div>
    );
}
