import type React from "react";
import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import type { ColCount } from "./constants";
import { DEFAULT_COLS } from "./constants";

type ColumnsProps = {
  children: React.ReactNode;
  cols?: ColCount | `${ColCount}`;
  className?: string;
};

const Columns = ({
  children,
  className,
  cols = DEFAULT_COLS,
}: ColumnsProps) => {
  const numCols = Number(cols) || DEFAULT_COLS;

  return (
    <div
      className={cn(
        Classes.Columns,
        "prose dark:prose-invert grid max-w-none gap-4",
        "sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))]",
        "@[0px]:grid-cols-1 @sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))]",
        className
      )}
      style={{ "--cols": numCols } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export { Columns };
export type { ColumnsProps };
