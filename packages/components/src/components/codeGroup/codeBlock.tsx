import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react';

// import { CodeSnippetFeedbackProvider } from '@/contexts/CodeSnippetFeedbackContext';
// import { useSelectedLocale } from '@/contexts/NavigationContext';
// import { useCodeBlockThemeEnum } from '@/hooks/useCodeBlockTheme';
import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { extractCodeBlockBaseProps } from '@/utils/extractCodeBlockProps';

import { copyToClipboard, CopyToClipboardResult } from '../../utils/copyToClipboard';
import { AskAiCodeBlockButton } from './AskAiCodeBlockButton';
import { BaseCodeBlock } from './BaseCodeBlock';
import { CodeSnippetFeedbackButton } from './CodeSnippetFeedback/CodeSnippetFeedbackButton';
import { getNodeText } from './getNodeText';

/**
 * User-defined properties
 */
export type CodeBlockPropsBase = {
    language?: string;
    filename?: string;
    icon?: string;
    lang?: string;
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
     * Internal prop to hide code snippet feedback button
     */
    hideCodeSnippetFeedbackButton?: boolean;
    /**
     * Internal prop to show ask ai button
     */
    hideAskAiButton?: boolean;
    /**
     * Internal prop to set the small text size
     */
    isSmallText?: boolean;
};

export interface CodeBlockInternalPropsBase extends CodeBlockPropsBase {
    /**
     * The callback function when a user clicks on the copied to clipboard button
     */
    onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
}

export type CodeBlockProps = CodeBlockInternalPropsBase &
    Omit<ComponentPropsWithoutRef<'div'>, keyof CodeBlockInternalPropsBase>;

export const CodeBlock = function CodeBlock(params: CodeBlockProps) {
    const { filename, onCopied, children, className, icon, isSmallText, hideAskAiButton, ...props } =
        params;

    const codeString = getNodeText(children);
    const CopyButton = (props: Partial<ComponentPropsWithoutRef<typeof CopyToClipboardButton>>) => (
        <CopyToClipboardButton textToCopy={codeString} onCopied={onCopied} {...props} />
    );
    const codeBlockTheme = useCodeBlockThemeEnum();
    const hasGrayBackgroundContainer = !!filename || !!icon;

    return (
        <CodeSnippetFeedbackProvider code={codeString} {...extractCodeBlockBaseProps(params)}>
            {({ feedbackModalOpen, anchorRef }) => {
                return (
                    <div
                        className={cn(
                            Classes.CodeBlock,
                            'mt-5 mb-8 not-prose rounded-2xl relative group',
                            codeBlockTheme === 'system' &&
                            'text-gray-950 bg-gray-50 dark:bg-white/5 dark:text-gray-50 codeblock-light border border-gray-950/10 dark:border-white/10 dark:twoslash-dark',
                            codeBlockTheme === 'dark' &&
                            'text-gray-50 bg-codeblock dark:bg-white/5 ring-1 ring-transparent dark:ring-white/[0.14] codeblock-dark twoslash-dark dark:twoslash-dark',
                            !hasGrayBackgroundContainer ? 'bg-transparent dark:bg-transparent' : 'p-0.5',
                            feedbackModalOpen && 'border border-primary dark:border-primary-light',
                            className
                        )}
                        ref={anchorRef}
                        {...props}
                    >
                        {hasGrayBackgroundContainer ? (
                            <CodeHeader filename={filename} icon={icon}>
                                <CodeSnippetFeedbackButton />
                                <CopyButton />
                                <AskAiCodeBlockButton code={codeString} {...extractCodeBlockBaseProps(params)} />
                            </CodeHeader>
                        ) : (
                            <div
                                data-floating-buttons
                                className="absolute top-3 right-4 flex items-center gap-1.5"
                            >
                                <CodeSnippetFeedbackButton />
                                <CopyButton />
                                <AskAiCodeBlockButton code={codeString} {...extractCodeBlockBaseProps(params)} />
                            </div>
                        )}

                        <BaseCodeBlock
                            isSmallText={isSmallText}
                            hideAskAiButton={hideAskAiButton}
                            {...params}
                        />
                    </div>
                );
            }}
        </CodeSnippetFeedbackProvider>
    );
};

/**
 * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
 * Styling should look the same though.
 */
function CodeHeader({
    filename,
    icon,
    children,
}: {
    filename?: string;
    icon?: string;
    children?: ReactNode;
}) {
    const codeBlockTheme = useCodeBlockThemeEnum();

    return (
        <div
            className="flex text-gray-400 text-xs rounded-t-[14px] leading-6 font-medium pl-4 pr-2.5 py-1"
            data-component-part="code-block-header"
        >
            <div
                className={cn(
                    'flex-none flex items-center gap-1.5 text-gray-700 dark:text-gray-300',
                    codeBlockTheme === 'dark' && 'text-gray-300'
                )}
                data-component-part="code-block-header-filename"
            >
                {icon && (
                    <ComponentIcon
                        icon={icon}
                        iconType="regular"
                        className={cn('h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400', Classes.CodeBlockIcon)}
                        overrideColor
                    />
                )}
                {filename}
            </div>
            <div className="flex-1 flex items-center justify-end gap-1.5">{children}</div>
        </div>
    );
}

export function CopyToClipboardButton({
    textToCopy,
    onCopied,
    className,
    showTooltip = true,
}: {
    textToCopy: string;
    onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
    className?: string;
    showTooltip?: boolean;
} & ComponentPropsWithoutRef<'button'>) {
    const trimmedTextToCopy = textToCopy.trim();
    const [isCopiedActive, setIsCopiedActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Hide copy button if the browser does not support it
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
        />
    );
}

export function CopyIconButton({
    onClick,
    isCopiedActive,
    showTooltip = true,
    className,
}: {
    onClick: () => void;
    isCopiedActive: boolean;
    showTooltip?: boolean;
    className?: string;
}) {
    const locale = useSelectedLocale();

    const codeBlockTheme = useCodeBlockThemeEnum();

    return (
        <div className={cn('z-10 relative select-none', className)}>
            <button
                className={
                    'h-[26px] w-[26px] flex items-center justify-center rounded-md backdrop-blur peer group/copy-button '
                }
                onClick={onClick}
                data-testid="copy-code-button"
                aria-label={locale['aria.copyCodeBlock']}
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
                    text={isCopiedActive ? locale['tooltip.copied'] : locale['tooltip.copy']}
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
