const STEP_TITLE_SIZES = ["p", "h2", "h3", "h4"] as const;
type StepTitleSize = (typeof STEP_TITLE_SIZES)[number];

export { STEP_TITLE_SIZES };
export type { StepTitleSize };
