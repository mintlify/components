import { useState } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { type ShikiHighlightedHtmlArgs, getShikiHighlightedHtml } from '@/utils/shiki';

export function useGetShikiHighlightedHtml(props: ShikiHighlightedHtmlArgs): string | undefined {
    const htmlOrPromise = getShikiHighlightedHtml(props);

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
    }, [props, htmlOrPromise]);

    return html;
}
