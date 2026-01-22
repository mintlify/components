import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "@/components/code-block";
import {
  getString,
  longExpandableCode,
  longSingleLineCode,
  mediumCode,
  shortCode,
  shortMultiLineCode,
  shortMultiLineCodeTS,
} from "@/components/code-block/story-utils";
import { CodeGroup } from "./code-group";

const meta: Meta<typeof CodeGroup> = {
  title: "Components/CodeGroup",
  component: CodeGroup,
};

export default meta;
type Story = StoryObj<typeof CodeGroup>;

export const Default: Story = {
  render: (_, { globals }) => (
    <CodeGroup codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}>
      <CodeBlock filename="JavaScript" language="javascript">
        {getString(1)}
      </CodeBlock>
      <CodeBlock filename="Python" language="python">
        {`print("Hello, World!")`}
      </CodeBlock>
      <CodeBlock filename="Java" language="java">
        {`System.out.println("Hello, World!");`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSmallText: Story = {
  render: (_, { globals }) => (
    <CodeGroup
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      isSmallText={true}
    >
      <CodeBlock filename="JavaScript" language="javascript">
        {getString()}
      </CodeBlock>
      <CodeBlock filename="Python" language="python">
        {`print("Hello, World!")`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const SingleTab: Story = {
  render: (_, { globals }) => (
    <CodeGroup codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}>
      <CodeBlock filename="Single tab" language="javascript">
        {getString()}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithDarkCode: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system" codeBlockThemeObject="dark">
      <CodeBlock filename="JavaScript" icon="js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="Python" icon="python" language="python">
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="Java" icon="java" language="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithShikiTheme: Story = {
  render: () => (
    <CodeGroup
      codeBlockTheme="system"
      codeBlockThemeObject={{ theme: "andromeeda" }}
    >
      <CodeBlock filename="JavaScript" icon="js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="Python" icon="python" language="python">
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="Java" icon="java" language="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithLightDarkShikiThemes: Story = {
  render: (_, { globals }) => (
    <CodeGroup
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      codeBlockThemeObject={{
        theme: { light: "everforest-light", dark: "dracula" },
      }}
    >
      <CodeBlock filename="JavaScript" icon="js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="Python" icon="python" language="python">
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="Java" icon="java" language="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="app.js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="main.py" language="python">
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="HelloWorld.java" language="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="JavaScript" icon="js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="Python" icon="python" language="python">
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="Java" icon="java" language="java">
        {mediumCode}
      </CodeBlock>
      <CodeBlock filename="TypeScript" icon="typescript" language="typescript">
        {shortMultiLineCodeTS}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSpacesInFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="My App File.js" icon="js" language="javascript">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock
        filename="Main Python Script.py"
        icon="python"
        language="python"
      >
        {shortCode}
      </CodeBlock>
      <CodeBlock filename="Hello World Class.java" icon="java" language="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="app.js" icon="js" language="javascript" lines={true}>
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock
        filename="main.py"
        icon="python"
        language="python"
        lines={true}
      >
        {shortCode}
      </CodeBlock>
      <CodeBlock
        filename="HelloWorld.java"
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const LineNumbersDarkCode: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system" codeBlockThemeObject="dark">
      <CodeBlock filename="JavaScript" language="javascript" lines={true}>
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock filename="Python" language="python" lines={true}>
        {shortCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithWrap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="Long Line JS" language="javascript" wrap={true}>
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock filename="Long Line Python" language="python" wrap={true}>
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="Long Line JS"
        language="javascript"
        lines={true}
        wrap={true}
      >
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock
        filename="Long Line Python"
        language="python"
        lines={true}
        wrap={true}
      >
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        highlight={JSON.stringify([3, 5, 7])}
        icon="java"
        language="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        highlight={JSON.stringify([2, 3])}
        icon="js"
        language="javascript"
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 5])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        highlight={JSON.stringify([1, 4])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightRange: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        highlight={JSON.stringify([2, 3, 4, 5, 6])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        highlight={JSON.stringify([1, 2, 3, 4])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightMixed: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 4, 5, 8])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        highlight={JSON.stringify([1, 3])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapWithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="Long Line"
        highlight={JSON.stringify([1])}
        language="javascript"
        lines={true}
        wrap={true}
      >
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock
        filename="Long Comment"
        highlight={JSON.stringify([1])}
        language="python"
        lines={true}
        wrap={true}
      >
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 4, 6])}
        icon="java"
        language="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([2, 3])}
        icon="js"
        language="javascript"
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const FocusWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([1, 2])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const FocusRange: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 3, 4, 5, 6])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([2, 3, 4])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const FocusMixed: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 5, 6, 7, 10])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([1, 4])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapWithFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="Long Line"
        focus={JSON.stringify([1])}
        language="javascript"
        lines={true}
        wrap={true}
      >
        {longSingleLineCode}
        {"\n"}
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock
        filename="Long Comment"
        focus={JSON.stringify([1])}
        language="python"
        lines={true}
        wrap={true}
      >
        {`# ${longSingleLineCode}`}
        {"\n"}
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightAndFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        highlight={JSON.stringify([1, 3, 5])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([3, 4])}
        highlight={JSON.stringify([1])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightFocusLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([6, 7, 8])}
        highlight={JSON.stringify([2, 3, 4])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([3, 4])}
        highlight={JSON.stringify([1, 2])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightFocusOverlap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="HelloWorld.java"
        focus={JSON.stringify([5, 6, 7, 8])}
        highlight={JSON.stringify([3, 4, 5, 6])}
        icon="java"
        language="java"
        lines={true}
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        filename="app.js"
        focus={JSON.stringify([3, 4])}
        highlight={JSON.stringify([2, 3])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const Expandable: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        expandable={true}
        filename="library.py"
        icon="python"
        language="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="app.js"
        icon="js"
        language="javascript"
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        expandable={true}
        filename="library.py"
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="app.js"
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        expandable={true}
        filename="library.py"
        highlight={JSON.stringify([1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 25])}
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="app.js"
        highlight={JSON.stringify([1, 2, 3, 10, 11, 12])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        expandable={true}
        filename="library.py"
        focus={JSON.stringify([30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40])}
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="app.js"
        focus={JSON.stringify([5, 6, 7, 8, 9, 10])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableAllFeatures: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        expandable={true}
        filename="library.py"
        focus={JSON.stringify([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])}
        highlight={JSON.stringify([1, 2, 3, 8, 9, 10])}
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="app.js"
        focus={JSON.stringify([8, 9, 10, 11, 12])}
        highlight={JSON.stringify([1, 2, 3])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
      <CodeBlock
        expandable={true}
        filename="HelloWorld.java"
        icon="java"
        language="java"
        lines={true}
        wrap={true}
      >
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const EmptyCode: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="empty.txt" lines={true}>
        {""}
      </CodeBlock>
      <CodeBlock
        filename="empty.js"
        icon="js"
        language="javascript"
        lines={true}
      >
        {""}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const VeryLongSingleLine: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="long-line.js"
        icon="js"
        language="javascript"
        lines={true}
      >
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock
        filename="long-line.py"
        icon="python"
        language="python"
        lines={true}
      >
        {
          'very_long_variable_name_that_exceeds_normal_line_length_and_should_test_horizontal_scrolling_behavior_in_code_blocks_when_wrap_is_disabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width"'
        }
      </CodeBlock>
    </CodeGroup>
  ),
};

export const VeryLongSingleLineWithWrap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="long-line-wrapped.js"
        icon="js"
        language="javascript"
        lines={true}
        wrap={true}
      >
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock
        filename="long-line-wrapped.py"
        icon="python"
        language="python"
        lines={true}
        wrap={true}
      >
        {
          'very_long_variable_name_that_exceeds_normal_line_length_and_should_test_horizontal_scrolling_behavior_in_code_blocks_when_wrap_is_disabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width"'
        }
      </CodeBlock>
    </CodeGroup>
  ),
};

export const SpecialCharacters: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="special-chars.js"
        icon="js"
        language="javascript"
        lines={true}
      >
        {`// Special characters test
const symbols = "!@#$%^&*()_+-=[]{}|;':",./<>?";
const unicode = "Hello 世界 🌍 café naïve résumé";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;`}
      </CodeBlock>
      <CodeBlock
        filename="special-chars.py"
        icon="python"
        language="python"
        lines={true}
      >
        {`# Special characters test
symbols = "!@#$%^&*()_+-=[]{}|;':\\",./<>?"
unicode = "Hello 世界 🌍 café naïve résumé"
import re
regex = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ComplexHighlightPattern: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="complex-highlight.py"
        highlight={JSON.stringify([
          1, 3, 4, 5, 8, 10, 11, 12, 15, 18, 19, 20, 25, 30, 31, 32,
        ])}
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        filename="complex-highlight.js"
        highlight={JSON.stringify([1, 2, 4, 6, 8, 10, 12])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ComplexFocusPattern: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        filename="complex-focus.py"
        focus={JSON.stringify([
          2, 4, 5, 6, 9, 11, 12, 13, 16, 19, 20, 21, 26, 31, 32, 33,
        ])}
        icon="python"
        language="python"
        lines={true}
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        filename="complex-focus.js"
        focus={JSON.stringify([2, 4, 6, 8, 10, 12, 14])}
        icon="js"
        language="javascript"
        lines={true}
      >
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithOverflowsInGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        width: "720px",
        height: "160px",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
      }}
    >
      <CodeGroup>
        <CodeBlock
          filename="With many lines 1 - Left"
          icon="js"
          language="javascript"
        >
          {getString(3)}
        </CodeBlock>
        <CodeBlock
          filename="With many lines 2 - Left"
          icon="python"
          language="python"
        >
          {getString(3, "python")}
        </CodeBlock>
        <CodeBlock
          filename="With many lines 3 - Left"
          icon="java"
          language="java"
        >
          {getString(3, "java")}
        </CodeBlock>
      </CodeGroup>
      <CodeGroup>
        <CodeBlock
          filename="With many lines 1 - Right"
          icon="js"
          language="javascript"
        >
          {getString(3)}
        </CodeBlock>
        <CodeBlock
          filename="With many lines 2 - Right"
          icon="python"
          language="python"
        >
          {getString(3, "python")}
        </CodeBlock>
        <CodeBlock
          filename="With many lines 3 - Right"
          icon="java"
          language="java"
        >
          {getString(3, "java")}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

export const DropdownEnabled: Story = {
  render: () => (
    <CodeGroup dropdown={true}>
      <CodeBlock filename="app.js" icon="js" language="javascript" lines={true}>
        {getString(3)}
      </CodeBlock>
      <CodeBlock filename="app.py" icon="python" language="python" lines={true}>
        {getString(3, "python")}
      </CodeBlock>
      <CodeBlock filename="app.java" icon="java" language="java" lines={true}>
        {getString(3, "java")}
      </CodeBlock>
    </CodeGroup>
  ),
};
