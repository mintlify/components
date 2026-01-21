import { Classes } from "@/lib/local/selectors"
import { cn } from "@/utils/cn"
import React from "react"
import type { ColCount } from "./constants"

type ColumnsProps = {
  children: React.ReactNode
  cols?: ColCount | `${ColCount}`
  className?: string
}

const Columns = ({ children, className, cols = 2 }: ColumnsProps) => {
  return (
    <div
      className={cn(
        Classes.CardGroup,
        `prose dark:prose-invert grid gap-4`,
        Number(cols) === 1 && "sm:grid-cols-1",
        Number(cols) === 2 && "sm:grid-cols-2",
        Number(cols) === 3 && "sm:grid-cols-3",
        Number(cols) === 4 && "sm:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Columns }
