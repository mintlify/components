import { useEffect, useRef, useState } from "react";

export const SMALL_EXPANDABLE_NUMBER_OF_LINES = 7;
const SMALL_EXPANDED_HEIGHT_OFFSET = 30;
const EXPANDED_HEIGHT_OFFSET = 40;

export const useExpandable = (enable: boolean, numberOfLines?: number) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | undefined;
    if (contentRef.current != null && enable) {
      rafId = requestAnimationFrame(() => {
        if (contentRef.current != null) {
          setCalculatedHeight(
            contentRef.current.scrollHeight +
              (numberOfLines && numberOfLines < SMALL_EXPANDABLE_NUMBER_OF_LINES
                ? SMALL_EXPANDED_HEIGHT_OFFSET
                : EXPANDED_HEIGHT_OFFSET)
          );
        }
      });
    }
    return () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enable, numberOfLines]);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return { isExpanded, calculatedHeight, contentRef, toggleExpanded };
};
