import { useEffect, useRef, useState } from 'react';

import { SMALL_EXPANDABLE_NUMBER_OF_LINES } from '@/components/code/baseCodeBlock';

const SMALL_EXPANDED_HEIGHT_OFFSET = 30;
const EXPANDED_HEIGHT_OFFSET = 40;

export const useExpandable = (enable: boolean, numberOfLines?: number) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [calculatedHeight, setCalculatedHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current != null && enable) {
            requestAnimationFrame(() => {
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
    }, [enable, contentRef.current?.scrollHeight, numberOfLines]);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return { isExpanded, calculatedHeight, contentRef, toggleExpanded };
};
