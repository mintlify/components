import { CodeBlockPropsBase } from "./codeBlock";

type CodeBlockPropsBaseWithRequiredKeys = Required<CodeBlockPropsBase>;

/**
 * Notes:
 * booleans here don't have any meanings, they are just used to extract the props
 * making them all required
 */
const ALL_CODE_BLOCK_PROPS: {
    [K in keyof CodeBlockPropsBaseWithRequiredKeys]: boolean;
} = {
    language: true,
    filename: true,
    icon: true,
    lang: true,
    lines: true,
    wrap: true,
    expandable: true,
    highlight: true,
    focus: true,
    numberOfLines: true,
    hideAskAiButton: true,
    hideCodeSnippetFeedbackButton: true,
    isSmallText: true,
    headerButtons: true,
    codeBlockTheme: true,
    className: true,
    children: true,
};

export const extractCodeBlockBaseProps = (
    props?: Record<string, unknown>
): Partial<CodeBlockPropsBase> => {
    if (!props) return {};

    const result: Partial<CodeBlockPropsBase> = {};

    (Object.keys(ALL_CODE_BLOCK_PROPS) as Array<keyof CodeBlockPropsBase>).forEach((key) => {
        if (props[key] !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result[key] = props[key] as any;
        }
    });

    return result;
};
