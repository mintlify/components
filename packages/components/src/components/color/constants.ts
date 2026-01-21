export const COLOR_VARIANTS = ["compact", "table"] as const
export type ColorVariant = (typeof COLOR_VARIANTS)[number]
