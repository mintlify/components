import type React from "react";
import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import type { ColCount } from "./constants";
import {
  AUTO_MODES,
  COL_CLASSES,
  DEFAULT_AUTO_MODE,
  DEFAULT_COLS,
  DEFAULT_MIN_COL_WIDTH,
} from "./constants";

type ColumnsProps = {
  children: React.ReactNode;
  cols?: ColCount | `${ColCount}`;
  layout?: "none" | "fill" | "fit";
  className?: string;
};

const Columns = ({
  children,
  className,
  cols = DEFAULT_COLS,
  layout = DEFAULT_AUTO_MODE,
}: ColumnsProps) => {
  const numCols = Number(cols) || DEFAULT_COLS;
  const autoMode = AUTO_MODES[layout];
  const minWidth = `var(--col-min-w, ${DEFAULT_MIN_COL_WIDTH})`;
  const autoStyle = autoMode
    ? {
        gridTemplateColumns: `repeat(${autoMode},minmax(max(${minWidth},calc(100%/${numCols} - 1rem)),1fr))`,
      }
    : undefined;

  return (
    <div
      className={cn(
        Classes.Columns,
        "prose dark:prose-invert grid max-w-none gap-4",
        !autoMode && (COL_CLASSES[numCols] ?? ""),
        className
      )}
      style={autoStyle}
    >
      {children}
    </div>
  );
};

export { Columns };
export type { ColumnsProps };
