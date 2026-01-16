export const stepTitleSizes = ['p', 'h2', 'h3', 'h4'] as const;
export type StepTitleSize = (typeof stepTitleSizes)[number];
