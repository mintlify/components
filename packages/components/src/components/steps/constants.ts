export const STEP_TITLE_SIZES = ['p', 'h2', 'h3', 'h4'] as const;
export type StepTitleSize = (typeof STEP_TITLE_SIZES)[number];
