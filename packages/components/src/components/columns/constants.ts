const COL_OPTIONS = [1, 2, 3, 4] as const;
type ColCount = (typeof COL_OPTIONS)[number];

export { COL_OPTIONS };
export type { ColCount };
