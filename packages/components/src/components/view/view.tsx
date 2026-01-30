import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";

import { Classes } from "@/constants/selectors";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { cn } from "@/utils/cn";
import type { MultiViewItemType } from "@/utils/icon-utils";

type ViewPropsBase = {
  title: string;
  /** @internal Pass multiViewItems from useMDXContent() */
  items: MultiViewItemType[];
};

type ViewProps = ViewPropsBase &
  Omit<ComponentPropsWithoutRef<"div">, keyof ViewPropsBase>;

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, title, items, className, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);

    useIsomorphicLayoutEffect(() => {
      setMounted(true);
    }, []);

    const isVisible = items.find((item) => item.title === title)?.active;

    if (!(mounted && isVisible)) {
      return null;
    }

    return (
      <div
        className={cn(
          Classes.MultiViewItem,
          "prose dark:prose-invert",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

View.displayName = "View";

export { View };
export type { ViewProps };
