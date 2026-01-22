import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./code-block";
import {
  complexDiffCode,
  diffCodeWithRemove,
  longExpandableCode,
  longSingleLineCode,
  mediumCode,
  simpleDiffCode,
  singleLineCode,
} from "./story-utils";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      highlight={JSON.stringify([4, 5, 6])}
      icon="java"
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const SingleLineCode: Story = {
  render: () => <CodeBlock>{singleLineCode}</CodeBlock>,
};

export const LongSingleLineCode: Story = {
  render: () => <CodeBlock>{longSingleLineCode}</CodeBlock>,
};

export const SystemTheme: Story = {
  render: (_, { globals }) => (
    <CodeBlock
      codeBlockThemeObject={globals.theme === "dark" ? "dark" : "system"}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <CodeBlock codeBlockThemeObject="dark" language="java">
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithShikiTheme: Story = {
  render: () => (
    <CodeBlock codeBlockThemeObject={{ theme: "andromeeda" }} language="java">
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithLightDarkShikiThemes: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject={{
        theme: { light: "everforest-light", dark: "dracula" },
      }}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithFilename: Story = {
  render: () => (
    <CodeBlock filename="HelloWorld.java" language="java">
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <CodeBlock icon="java" language="java">
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithSpacesInFilename: Story = {
  render: () => (
    <CodeBlock filename="My App File.java" language="java">
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
    <CodeBlock codeBlockThemeObject="dark" language="java" lines={true}>
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
    <CodeBlock language="java" lines={true} wrap={true}>
      {mediumCode}
    </CodeBlock>
  ),
};

export const WrapMultiLine: Story = {
  render: () => <CodeBlock wrap={true}>{longSingleLineCode}</CodeBlock>,
};

export const WithHighlight: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      highlight={JSON.stringify([3, 5, 7])}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithHighlightAndLineNumbers: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      highlight={JSON.stringify([1, 3, 5])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightRange: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject="dark"
      highlight={JSON.stringify([2, 3, 4, 5, 6])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightMixed: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      highlight={JSON.stringify([1, 3, 4, 5, 8])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightWithShikiTheme: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject={{ theme: "dracula" }}
      filename="HelloWorld.java"
      highlight={JSON.stringify([3, 5, 7])}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithFocus: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([2, 4, 6])}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const WithFocusAndLineNumbers: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([1, 3, 5, 7, 9])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const FocusRange: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject="dark"
      filename="HelloWorld.java"
      focus={JSON.stringify([2, 3, 4, 5, 6])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const FocusMixed: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([1, 3, 5, 7, 9])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightAndFocus: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([2, 4, 6])}
      highlight={JSON.stringify([1, 3, 5])}
      language="java"
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightAndFocusAndLineNumbers: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([2, 4, 6])}
      highlight={JSON.stringify([1, 3, 5])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const HighlightFocusOverlap: Story = {
  render: () => (
    <CodeBlock
      filename="HelloWorld.java"
      focus={JSON.stringify([5, 6, 7, 8])}
      highlight={JSON.stringify([3, 4, 5, 6])}
      language="java"
      lines={true}
    >
      {mediumCode}
    </CodeBlock>
  ),
};

export const Expandable: Story = {
  render: () => (
    <CodeBlock expandable={true} filename="library.py" language="python">
      {longExpandableCode}
    </CodeBlock>
  ),
};

export const ExpandableAndLineNumbers: Story = {
  render: () => (
    <CodeBlock
      expandable={true}
      filename="library.py"
      language="python"
      lines={true}
    >
      {longExpandableCode}
    </CodeBlock>
  ),
};

export const ExpandableWithHighlight: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject="dark"
      expandable={true}
      filename="library.py"
      highlight={JSON.stringify([1, 3, 5])}
      language="python"
      lines={true}
    >
      {longExpandableCode}
    </CodeBlock>
  ),
};

export const ExpandableWithFocus: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject="dark"
      expandable={true}
      filename="library.py"
      focus={JSON.stringify([2, 4, 6])}
      language="python"
      lines={true}
    >
      {longExpandableCode}
    </CodeBlock>
  ),
};

export const ExpandableAllFeatures: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject="dark"
      expandable={true}
      filename="library.py"
      focus={JSON.stringify([2, 4, 6])}
      highlight={JSON.stringify([1, 3, 5])}
      language="python"
      lines={true}
    >
      {longExpandableCode}
    </CodeBlock>
  ),
};

export const EmptyCode: Story = {
  render: () => (
    <CodeBlock filename="empty.txt" lines={true}>
      {""}
    </CodeBlock>
  ),
};

export const SpecialCharacters: Story = {
  render: () => (
    <CodeBlock filename="special-chars.java" language="java" lines={true}>
      {`// Special characters test
const symbols = "!@#$%^&*()_+-=[]{}|;':",./<>?";
const unicode = "Hello 世界 🌍 café naïve résumé";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;`}
    </CodeBlock>
  ),
};

export const DiffBasic: Story = {
  render: () => (
    <CodeBlock filename="diff.js" language="javascript">
      {simpleDiffCode}
    </CodeBlock>
  ),
};

export const DiffWithShikiTheme: Story = {
  render: () => (
    <CodeBlock
      codeBlockThemeObject={{ theme: "dracula" }}
      filename="diff.js"
      language="javascript"
      lines={true}
    >
      {simpleDiffCode}
    </CodeBlock>
  ),
};

export const DiffWithLineNumbers: Story = {
  render: () => (
    <CodeBlock filename="diff.js" language="javascript" lines={true}>
      {simpleDiffCode}
    </CodeBlock>
  ),
};

export const DiffFunction: Story = {
  render: () => (
    <CodeBlock filename="diff.js" language="javascript">
      {diffCodeWithRemove}
    </CodeBlock>
  ),
};

export const DiffFunctionWithLineNumbers: Story = {
  render: () => (
    <CodeBlock filename="diff.js" language="javascript" lines={true}>
      {diffCodeWithRemove}
    </CodeBlock>
  ),
};

export const DiffReactExample: Story = {
  render: () => (
    <CodeBlock
      filename="react-component-diff.js"
      language="javascript"
      lines={true}
    >
      {complexDiffCode}
    </CodeBlock>
  ),
};

export const DiffExpandable: Story = {
  render: () => (
    <CodeBlock
      expandable={true}
      filename="expandable-diff.js"
      language="javascript"
      lines={true}
    >
      {complexDiffCode}
    </CodeBlock>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <CodeBlock
      className="shadow-xl ring-2 ring-blue-500 [&_[data-component-part=code-block-root]]:rounded-b-2xl"
      filename="custom-styled.js"
      language="javascript"
    >
      {mediumCode}
    </CodeBlock>
  ),
};
