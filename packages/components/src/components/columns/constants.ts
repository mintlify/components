const COL_OPTIONS = [1, 2, 3, 4] as const;
type ColCount = (typeof COL_OPTIONS)[number];

const DEFAULT_COLS = 2;

export { COL_OPTIONS, DEFAULT_COLS };

export type { ColCount };
