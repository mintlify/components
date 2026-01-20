import { memo, ReactNode } from 'react';

import { CodeStyling } from '@/validation';
import { SHIKI_CLASSNAME } from '@/utils/shiki/constants';
import { useGetShikiHighlightedHtml } from '@/utils/shiki/useGetShikiHighlightedHtml';

export type CodeSnippetProps = {
    language?: string;
    /**
     * If `children` is a `string`, `Shiki` will be emitted
     */
    children?: ReactNode;
    codeBlockThemeObject?: CodeStyling;
};

export const CodeSnippet = memo(function CodeSnippet({ language, children, codeBlockThemeObject }: CodeSnippetProps) {
    const codeString = typeof children === 'string' ? children : '';
    language = language ?? 'text';
    const html = useGetShikiHighlightedHtml({
        codeString,
        codeBlockTheme: codeBlockThemeObject,
        language,
        opts: { structure: 'inline' },
    });

    if (typeof children === 'string' && language && html) {
        return (
            <pre className={SHIKI_CLASSNAME} suppressHydrationWarning>
                <code suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        );
    }

    return (
        <pre className={SHIKI_CLASSNAME} suppressHydrationWarning>
            <code suppressHydrationWarning>{children}</code>
        </pre>
    );
});
