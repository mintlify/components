import { ReactNode } from 'react';

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
    headerButtons?: ReactNode;
    codeBlockTheme?: 'dark' | 'system';
    className?: string;
    children?: ReactNode;
};

// export interface CodeBlockInternalPropsBase extends CodeBlockPropsBase {
//     /**
//      * The callback function when a user clicks on the copied to clipboard button
//      */
//     onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
// }

// export type CodeBlockProps = CodeBlockInternalPropsBase &
//     Omit<ComponentPropsWithoutRef<'div'>, keyof CodeBlockInternalPropsBase>;

// export const CodeBlock = function CodeBlock(params: CodeBlockProps) {
//     const { filename, onCopied, children, className, icon, isSmallText, hideAskAiButton, headerButtons, codeBlockTheme, ...props } =
//         params;

//     const codeString = getNodeText(children);
//     const hasGrayBackgroundContainer = !!filename || !!icon;

//     return (
//         <CodeSnippetFeedbackProvider code={codeString} {...extractCodeBlockBaseProps(params)}>
//             {({ feedbackModalOpen, anchorRef }) => {
//                 return (
//                     <div
//                         className={cn(
//                             Classes.CodeBlock,
//                             'mt-5 mb-8 not-prose rounded-2xl relative group',
//                             codeBlockTheme === 'system' &&
//                             'text-gray-950 bg-gray-50 dark:bg-white/5 dark:text-gray-50 codeblock-light border border-gray-950/10 dark:border-white/10 dark:twoslash-dark',
//                             codeBlockTheme === 'dark' &&
//                             'text-gray-50 bg-codeblock dark:bg-white/5 ring-1 ring-transparent dark:ring-white/[0.14] codeblock-dark twoslash-dark dark:twoslash-dark',
//                             !hasGrayBackgroundContainer ? 'bg-transparent dark:bg-transparent' : 'p-0.5',
//                             feedbackModalOpen && 'border border-primary dark:border-primary-light',
//                             className
//                         )}
//                         ref={anchorRef}
//                         {...props}
//                     >
//                         {hasGrayBackgroundContainer ? (
//                             <CodeHeader filename={filename} icon={icon}>
//                                 {headerButtons && headerButtons}
//                             </CodeHeader>
//                         ) : (
//                             <div
//                                 data-floating-buttons
//                                 className="absolute top-3 right-4 flex items-center gap-1.5"
//                             >
//                                 {headerButtons && headerButtons}
//                             </div>
//                         )}

//                         <BaseCodeBlock
//                             isSmallText={isSmallText}
//                             hideAskAiButton={hideAskAiButton}
//                             {...params}
//                         />
//                     </div>
//                 );
//             }}
//         </CodeSnippetFeedbackProvider>
//     );
// };

// /**
//  * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
//  * Styling should look the same though.
//  */
// function CodeHeader({
//     filename,
//     icon,
//     children,
// }: {
//     filename?: string;
//     icon?: string;
//     children?: ReactNode;
// }) {
//     const codeBlockTheme = useCodeBlockThemeEnum();

//     return (
//         <div
//             className="flex text-gray-400 text-xs rounded-t-[14px] leading-6 font-medium pl-4 pr-2.5 py-1"
//             data-component-part="code-block-header"
//         >
//             <div
//                 className={cn(
//                     'flex-none flex items-center gap-1.5 text-gray-700 dark:text-gray-300',
//                     codeBlockTheme === 'dark' && 'text-gray-300'
//                 )}
//                 data-component-part="code-block-header-filename"
//             >
//                 {icon && (
//                     <ComponentIcon
//                         icon={icon}
//                         iconType="regular"
//                         className={cn('h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400', Classes.CodeBlockIcon)}
//                         overrideColor
//                     />
//                 )}
//                 {filename}
//             </div>
//             <div className="flex-1 flex items-center justify-end gap-1.5">{children}</div>
//         </div>
//     );
// }

// export function CodeBlockTooltip({ text }: { text: string }) {
//     return (
//         <div
//             aria-hidden
//             className="absolute top-11 left-1/2 transform whitespace-nowrap -translate-x-1/2 -translate-y-1/2 peer-hover:opacity-100 opacity-0 text-tooltip-foreground rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark"
//         >
//             {text}
//         </div>
//     );
// }
