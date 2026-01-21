export const COL_OPTIONS = [1, 2, 3, 4] as const
export type ColCount = (typeof COL_OPTIONS)[number]
