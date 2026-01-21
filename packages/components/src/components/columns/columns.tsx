import { Classes } from "@/lib/local/selectors"
import { cn } from "@/utils/cn"
import React from "react"

type ColCount = 1 | 2 | 3 | 4

type ColumnsProps = {
  children: React.ReactNode
  cols?: ColCount | `${ColCount}`
  className?: string
}

const Columns = ({ children, className, cols }: ColumnsProps) => {
  return (
    <div
      className={cn(
        Classes.CardGroup,
        `prose dark:prose-dark grid gap-4`,
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
