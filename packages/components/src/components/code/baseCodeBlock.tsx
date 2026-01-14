import { EllipsisIcon } from 'lucide-react';

import { useExpandable } from '@/hooks/useExpandable';
import { cn } from '@/utils/cn';
import { getCodeBlockScrollbarClassname } from '@/utils/getScrollbarClassname';
import { getCodeString, useCalculateCodeLines } from '@/utils/shiki/lib';
import { useGetShikiHighlightedHtml } from '@/utils/shiki/useGetShikiHighlightedHtml';

import { CodeBlockPropsBase } from './codeBlock';
import { getShikiBackgroundColors } from './getShikiBackgroundColors';
import { ReactNode } from 'react';

export const SMALL_EXPANDABLE_CODE_BLOCK_HEIGHT = 45;
export const DEFAULT_EXPANDABLE_CODE_BLOCK_HEIGHT = 190;
export const SMALL_EXPANDABLE_NUMBER_OF_LINES = 7;

interface BaseCodeBlockProps extends CodeBlockPropsBase {
    isParentCodeGroup?: boolean;
    shouldHighlight?: boolean;
    // force shiki re-highlighting for live preview, pass in isLivePreview
    forceExtractCodeString?: boolean;
    codeBlockThemeObject?: any; // type of docsConfig.styling.codeBlocks
    children?: ReactNode;
}

export const BaseCodeBlock = ({
    expandable = false,
    shouldHighlight = true,
    children,
    isParentCodeGroup,
    isSmallText,
    numberOfLines,
    forceExtractCodeString = false,
    codeBlockTheme,
    codeBlockThemeObject,
    ...props
}: BaseCodeBlockProps) => {
    const { focus, highlight, lang, language, className, wrap, lines } = props;

    const codeString = getCodeString(children, props.className, forceExtractCodeString);

    const { isExpanded, calculatedHeight, contentRef, toggleExpanded } = useExpandable(
        expandable,
        numberOfLines
    );

    const opts: {
        highlightedLines?: number[];
        focusedLines?: number[];
    } = {};

    let focusLines: number[] = [];
    let highlightLines: number[] = [];

    if (focus) {
        try {
            focusLines = JSON.parse(focus);
        } catch {
            focusLines = [];
        }
    }

    if (highlight) {
        try {
            highlightLines = JSON.parse(highlight);
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
                language: shouldHighlight ? selectedLang : 'text',
                opts,
            }
            : {
                codeString,
                codeBlockTheme: codeBlockThemeObject,
                className: shouldHighlight ? className : 'lang-text',
                opts,
            }
    );

    numberOfLines = useCalculateCodeLines(html, numberOfLines);
    const shikiBackgroundColors = getShikiBackgroundColors(codeBlockTheme || 'system', html, children);

    const CodeElement = () => {
        return html ? (
            <div
                key={codeBlockTheme}
                suppressHydrationWarning
                ref={contentRef}
                className={cn(
                    'font-mono',
                    wrap ? 'whitespace-pre-wrap' : 'whitespace-pre',
                    isParentCodeGroup && 'flex-none text-sm h-full',
                    isSmallText ? 'text-xs leading-[1.35rem]' : 'leading-6'
                )}
                {...(isParentCodeGroup && {
                    'data-component-part': 'code-group-tab-content',
                })}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        ) : (
            <div
                suppressHydrationWarning
                ref={contentRef}
                className={cn(
                    'font-mono',
                    wrap ? 'whitespace-pre-wrap' : 'whitespace-pre',
                    isParentCodeGroup && 'flex-none text-sm h-full',
                    isSmallText ? 'text-xs leading-[1.35rem]' : 'leading-6'
                )}
                {...(isParentCodeGroup && {
                    'data-component-part': 'code-group-tab-content',
                })}
            >
                {children}
            </div>
        );
    };

    const isFocusEnabled = focusLines.length > 0;
    const isHighlightEnabled = highlightLines.length > 0;

    return (
        <>
            <div
                className={cn(
                    // prevent code blocks from growing beyond their container, setting width to 0 to recalculate the width
                    'w-0 min-w-full max-w-full py-3.5 px-4 h-full dark:bg-codeblock relative text-sm leading-6 children:!my-0 children:!shadow-none children:!bg-transparent',
                    'transition-[height] duration-300 ease-in-out overflow-x-auto code-block-background',
                    '[&_*]:ring-0 [&_*]:outline-0 [&_*]:focus:ring-0 [&_*]:focus:outline-0',
                    !props.filename ? 'rounded-2xl' : 'rounded-xt',
                    codeBlockTheme === 'system' ? 'bg-white' : 'bg-codeblock',
                    (expandable || isParentCodeGroup) && 'overflow-auto',
                    expandable && (isExpanded ? 'overflow-y-auto' : 'overflow-y-hidden'),
                    wrap ? 'code-block-wrap overflow-x-hidden whitespace-pre-wrap' : 'overflow-x-auto',
                    lines && 'has-line-numbers',
                    isFocusEnabled && 'has-focused',
                    isHighlightEnabled && 'has-highlighted',
                    getCodeBlockScrollbarClassname(codeBlockTheme)
                )}
                data-component-part="code-block-root"
                tabIndex={0}
                style={
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    {
                        fontVariantLigatures: 'none',
                        height: expandable
                            ? !isExpanded
                                ? `${numberOfLines && numberOfLines < SMALL_EXPANDABLE_NUMBER_OF_LINES ? SMALL_EXPANDABLE_CODE_BLOCK_HEIGHT : DEFAULT_EXPANDABLE_CODE_BLOCK_HEIGHT}px`
                                : `${calculatedHeight}px`
                            : isParentCodeGroup
                                ? '100%'
                                : 'auto',
                        backgroundColor: shikiBackgroundColors?.light,
                        '--shiki-dark-bg': shikiBackgroundColors?.dark,
                    } as React.CSSProperties
                }
            >
                <CodeElement />
            </div>
            {!wrap && !isHighlightEnabled && !expandable && focusLines.length === 0 && (
                <div
                    data-fade-overlay
                    aria-hidden
                    style={
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        {
                            '--fade-color-light': shikiBackgroundColors?.light,
                            '--fade-color-dark': shikiBackgroundColors?.dark,
                        } as React.CSSProperties
                    }
                />
            )}
            {expandable && (
                <CodeFooter
                    isExpanded={isExpanded}
                    toggleExpanded={toggleExpanded}
                    numberOfLines={numberOfLines}
                />
            )}
        </>
    );
};

export function CodeFooter({
    numberOfLines,
    isExpanded,
    toggleExpanded,
}: {
    numberOfLines: number | undefined;
    isExpanded: boolean;
    toggleExpanded: () => void;
}) {
    if (!numberOfLines) return null;

    return (
        <div
            data-component-part="code-block-footer"
            className="px-3 py-1 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
            <button
                data-component-part="code-block-footer-button"
                className="flex-1 gap-1.5 flex items-center py-1.5"
                onClick={toggleExpanded}
            >
                <EllipsisIcon className="h-3.5 w-3.5 shrink-0 text-gray-500 dark:text-gray-400" />
                {isExpanded ? 'Collapse' : `See all ${numberOfLines} line${numberOfLines === 1 ? '' : 's'}`}
            </button>
        </div>
    );
}
