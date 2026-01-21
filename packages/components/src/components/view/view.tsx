import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react"

import { Classes } from "@/lib/local/selectors"
import { MultiViewItemType } from "@/models"
import { cn } from "@/utils/cn"

type ViewPropsBase = {
  title: string
  /** @internal Pass multiViewItems from useMDXContent() */
  items: MultiViewItemType[]
}

export type ViewProps = ViewPropsBase &
  Omit<ComponentPropsWithoutRef<"div">, keyof ViewPropsBase>

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, title, items, className, ...props }, ref) => {
    const isVisible = useMemo(() => {
      return items.find((item) => item.title === title)?.active
    }, [items, title])

    if (!isVisible) return null

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
    )
  }
)

View.displayName = "View"
