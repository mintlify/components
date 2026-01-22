const COLOR_VARIANTS = ["compact", "table"] as const;
type ColorVariant = (typeof COLOR_VARIANTS)[number];

export { COLOR_VARIANTS };
export type { ColorVariant };
