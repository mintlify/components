import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./codeBlock";
import { complexDiffCode, diffCodeWithRemove, longExpandableCode, longSingleLineCode, mediumCode, simpleDiffCode, singleLineCode } from "./storyUtils";

const meta: Meta<typeof CodeBlock> = {
    title: "Components/CodeBlock",
    component: CodeBlock,
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
    render: () => (
        <CodeBlock language="java" icon="java" highlight={JSON.stringify([4, 5, 6])} lines={true} filename="HelloWorld.java">
            {mediumCode}
        </CodeBlock>
    ),
};

export const SingleLineCode: Story = {
    render: () => (
        <CodeBlock>
            {singleLineCode}
        </CodeBlock>
    ),
};

export const LongSingleLineCode: Story = {
    render: () => (
        <CodeBlock>
            {longSingleLineCode}
        </CodeBlock>
    ),
};

export const SystemTheme: Story = {
    render: (_, { globals }) => (
        <CodeBlock language="java" codeBlockThemeObject={globals.theme === 'dark' ? 'dark' : 'system'}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const DarkTheme: Story = {
    render: () => (
        <CodeBlock language="java" codeBlockThemeObject="dark">
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithShikiTheme: Story = {
    render: () => (
        <CodeBlock language="java" codeBlockThemeObject={{ theme: 'andromeeda' }}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithLightDarkShikiThemes: Story = {
    render: () => (
        <CodeBlock language="java" codeBlockThemeObject={{ theme: { light: 'everforest-light', dark: 'dracula' } }}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithFilename: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java">
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <CodeBlock language="java" icon="java">
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithSpacesInFilename: Story = {
    render: () => (
        <CodeBlock language="java" filename="My App File.java">
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithLineNumbers: Story = {
    render: () => (
        <CodeBlock language="java" lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithLineNumbersDark: Story = {
    render: () => (
        <CodeBlock language="java" lines={true} codeBlockThemeObject="dark">
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithWrap: Story = {
    render: () => (
        <CodeBlock language="java" wrap={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithWrapAndLineNumbers: Story = {
    render: () => (
        <CodeBlock language="java" wrap={true} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WrapMultiLine: Story = {
    render: () => (
        <CodeBlock wrap={true}>
            {longSingleLineCode}
        </CodeBlock>
    ),
};

export const WithHighlight: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([3, 5, 7])}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithHighlightAndLineNumbers: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([1, 3, 5])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightRange: Story = {
    render: () => (
        <CodeBlock language="java" highlight={JSON.stringify([2, 3, 4, 5, 6])} lines={true} codeBlockThemeObject="dark">
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightMixed: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([1, 3, 4, 5, 8])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightWithShikiTheme: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" codeBlockThemeObject={{ theme: 'dracula' }} highlight={JSON.stringify([3, 5, 7])}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithFocus: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" focus={JSON.stringify([2, 4, 6])}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const WithFocusAndLineNumbers: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" focus={JSON.stringify([1, 3, 5, 7, 9])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const FocusRange: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" focus={JSON.stringify([2, 3, 4, 5, 6])} lines={true} codeBlockThemeObject="dark">
            {mediumCode}
        </CodeBlock>
    ),
};

export const FocusMixed: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" focus={JSON.stringify([1, 3, 5, 7, 9])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightAndFocus: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([1, 3, 5])} focus={JSON.stringify([2, 4, 6])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightAndFocusAndLineNumbers: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([1, 3, 5])} focus={JSON.stringify([2, 4, 6])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const HighlightFocusOverlap: Story = {
    render: () => (
        <CodeBlock language="java" filename="HelloWorld.java" highlight={JSON.stringify([3, 4, 5, 6])} focus={JSON.stringify([5, 6, 7, 8])} lines={true}>
            {mediumCode}
        </CodeBlock>
    ),
};

export const Expandable: Story = {
    render: () => (
        <CodeBlock language="python" filename="library.py" expandable={true}>
            {longExpandableCode}
        </CodeBlock>
    ),
};

export const ExpandableAndLineNumbers: Story = {
    render: () => (
        <CodeBlock language="python" filename="library.py" expandable={true} lines={true}>
            {longExpandableCode}
        </CodeBlock>
    ),
};

export const ExpandableWithHighlight: Story = {
    render: () => (
        <CodeBlock language="python" filename="library.py" expandable={true} highlight={JSON.stringify([1, 3, 5])} lines={true} codeBlockThemeObject="dark">
            {longExpandableCode}
        </CodeBlock>
    ),
};

export const ExpandableWithFocus: Story = {
    render: () => (
        <CodeBlock language="python" filename="library.py" expandable={true} focus={JSON.stringify([2, 4, 6])} lines={true} codeBlockThemeObject="dark">
            {longExpandableCode}
        </CodeBlock>
    ),
};

export const ExpandableAllFeatures: Story = {
    render: () => (
        <CodeBlock language="python" filename="library.py" expandable={true} highlight={JSON.stringify([1, 3, 5])} focus={JSON.stringify([2, 4, 6])} lines={true} codeBlockThemeObject="dark">
            {longExpandableCode}
        </CodeBlock>
    ),
};

export const EmptyCode: Story = {
    render: () => (
        <CodeBlock filename="empty.txt" lines={true}>
            {''}
        </CodeBlock>
    ),
};

export const SpecialCharacters: Story = {
    render: () => (
        <CodeBlock language="java" filename="special-chars.java" lines={true}>
            {`// Special characters test
const symbols = "!@#$%^&*()_+-=[]{}|;':",./<>?";
const unicode = "Hello 世界 🌍 café naïve résumé";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;`}
        </CodeBlock>
    ),
};

export const DiffBasic: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="diff.js" lines={true}>
            {simpleDiffCode}
        </CodeBlock>
    ),
};

export const DiffWithShikiTheme: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="diff.js" lines={true} codeBlockThemeObject={{ theme: 'dracula' }}>
            {simpleDiffCode}
        </CodeBlock>
    ),
};

export const DiffWithLineNumbers: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="diff.js" lines={true}>
            {simpleDiffCode}
        </CodeBlock>
    ),
};

export const DiffFunction: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="diff.js" lines={true}>
            {diffCodeWithRemove}
        </CodeBlock>
    ),
};

export const DiffFunctionWithLineNumbers: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="diff.js" lines={true}>
            {diffCodeWithRemove}
        </CodeBlock>
    ),
};

export const DiffReactExample: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="react-component-diff.js" lines={true}>
            {complexDiffCode}
        </CodeBlock>
    ),
};

export const DiffExpandable: Story = {
    render: () => (
        <CodeBlock language="javascript" filename="expandable-diff.js" expandable={true} lines={true}>
            {complexDiffCode}
        </CodeBlock>
    ),
};
