const COL_OPTIONS = [1, 2, 3, 4] as const;
type ColCount = (typeof COL_OPTIONS)[number];

const DEFAULT_COLS = 2;
const DEFAULT_MIN_COL_WIDTH = "200px";
const DEFAULT_AUTO_MODE = "static";

const COL_CLASSES: Record<number, string> = {
  1: "sm:grid-cols-1 @sm:grid-cols-1",
  2: "sm:grid-cols-2 @sm:grid-cols-2",
  3: "sm:grid-cols-3 @sm:grid-cols-3",
  4: "sm:grid-cols-4 @sm:grid-cols-4",
};

const AUTO_MODES = {
  static: undefined,
  fill: "auto-fill",
  fit: "auto-fit",
} as const;

export {
  COL_OPTIONS,
  COL_CLASSES,
  AUTO_MODES,
  DEFAULT_COLS,
  DEFAULT_MIN_COL_WIDTH,
  DEFAULT_AUTO_MODE,
};

export type { ColCount };
