import { ReactNode } from "react";

import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";

export type ColumnsProps = {
  /**
   * Number of columns to display. Defaults to 2.
   */
  cols?: 1 | 2 | 3 | 4 | "1" | "2" | "3" | "4";
  /**
   * Content to display inside the columns grid.
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply to the root element.
   */
  className?: string;
};

/**
 * A responsive grid layout component for organizing content into columns.
 * Automatically adjusts to a single column on mobile devices.
 */
export function Columns({ children, cols = 2, className }: ColumnsProps) {
  const numCols = Number(cols) as 1 | 2 | 3 | 4;

  const colsClassName = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  }[numCols] ?? "";

  return (
    <div
      className={cn(Classes.Columns, "grid gap-4", colsClassName, className)}
      data-component-part="columns-root"
    >
      {children}
    </div>
  );
}
