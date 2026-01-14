import { ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

export function AccordionGroup({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    // [&>details] modifies the Accordion's borders to only show divider borders.
    // We use border-0 instead of border-none because border-none turns off divide-y.
    // [&>details>summary] modifies the summary to not round the highlighted part
    // when inside of an Accordion group.
    return (
        <div
            className={cn(
                Classes.AccordionGroup,
                '[&>details]:border-0 [&>details]:rounded-none [&>details>summary]:rounded-none [&>details]:mb-0 overflow-hidden mt-0 mb-3 rounded-xl prose prose-gray dark:prose-invert divide-y divide-inherit border dark:border-gray-800/50',
                className
            )}
            data-component-part="accordion-group"
        >
            {children}
        </div>
    );
}
