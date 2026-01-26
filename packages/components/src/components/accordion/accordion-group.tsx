import type { ReactNode } from "react";

import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";

type AccordionGroupProps = {
  children: ReactNode;
  className?: string;
};

const AccordionGroup = ({ children, className }: AccordionGroupProps) => {
  return (
    <div
      className={cn(
        Classes.AccordionGroup,
        "prose prose-stone dark:prose-invert mt-0 mb-3 overflow-hidden rounded-xl border border-stone-200/70 dark:border-white/10 [&>details+details]:border-t [&>details+details]:border-t-stone-200/70 dark:[&>details+details]:border-t-white/10 [&>details>summary]:rounded-none [&>details]:mb-0 [&>details]:rounded-none [&>details]:border-0",
        className
      )}
      data-component-part="accordion-group"
    >
      {children}
    </div>
  );
};

export { AccordionGroup };
export type { AccordionGroupProps };
