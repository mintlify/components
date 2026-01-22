import { useState } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import {
  getShikiHighlightedHtml,
  type ShikiHighlightedHtmlArgs,
} from "@/utils/shiki";

const useGetShikiHighlightedHtml = (
  props: ShikiHighlightedHtmlArgs
): string | undefined => {
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

    // biome-ignore lint/complexity/noVoid: TODO
    void getHtml();

    return () => {
      cancelled = true;
    };
  }, [props, htmlOrPromise]);

  return html;
};

export { useGetShikiHighlightedHtml };
