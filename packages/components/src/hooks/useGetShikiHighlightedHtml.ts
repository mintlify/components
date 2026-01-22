import { useState, useMemo } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { type ShikiHighlightedHtmlArgs, getShikiHighlightedHtml } from '@/utils/shiki';

export function useGetShikiHighlightedHtml(props: ShikiHighlightedHtmlArgs): string | undefined {
    const { codeString, codeBlockTheme, opts } = props;
    const language = 'language' in props ? props.language : undefined;
    const className = 'className' in props ? props.className : undefined;
    const fileName = 'fileName' in props ? props.fileName : undefined;

    const optsKey = useMemo(
        () => JSON.stringify(opts),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [opts?.highlightedLines, opts?.focusedLines, opts?.noAsync]
    );

    const htmlOrPromise = useMemo(
        () => getShikiHighlightedHtml(props),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [codeString, codeBlockTheme, language, className, fileName, optsKey]
    );

    const [html, setHtml] = useState<string | undefined>(
        htmlOrPromise instanceof Promise ? undefined : htmlOrPromise
    );

    useIsomorphicLayoutEffect(() => {
        if (!(htmlOrPromise instanceof Promise)) {
            setHtml(htmlOrPromise);
            return;
        }

        let cancelled = false;

        async function getHtml() {
            if (!(htmlOrPromise instanceof Promise)) {
                setHtml(htmlOrPromise);
                return;
            }

            try {
                const result = await htmlOrPromise;
                if (!cancelled) {
                    setHtml(result);
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setHtml(undefined);
                }
            }
        }

        void getHtml();

        return () => {
            cancelled = true;
        };
    }, [htmlOrPromise]);

    return html;
}
