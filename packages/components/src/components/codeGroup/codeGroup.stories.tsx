import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeGroup } from "./codeGroup";
import { CodeBlock } from "./codeBlock";
import { getString, longExpandableCode, longSingleLineCode, mediumCode, shortMultiLineCode } from "./storyUtils";

const meta: Meta<typeof CodeGroup> = {
  title: "Components/CodeGroup",
  component: CodeGroup,
};

export default meta;
type Story = StoryObj<typeof CodeGroup>;

export const Default: Story = {
  render: (_, { globals }) => (
    <CodeGroup codeBlockTheme={globals.theme === 'dark' ? 'dark' : 'system'}>
      <CodeBlock language="javascript" filename="JavaScript">
        {getString(1)}
      </CodeBlock>
      <CodeBlock language="python" filename="Python">
        {`print("Hello, World!")`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java">
        {`System.out.println("Hello, World!");`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSmallText: Story = {
  render: (_, { globals }) => (
    <CodeGroup isSmallText={true} codeBlockTheme={globals.theme === 'dark' ? 'dark' : 'system'}>
      <CodeBlock language="javascript" filename="JavaScript">
        {getString()}
      </CodeBlock>
      <CodeBlock language="python" filename="Python">
        {`print("Hello, World!")`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const SingleTab: Story = {
  render: (_, { globals }) => (
    <CodeGroup codeBlockTheme={globals.theme === 'dark' ? 'dark' : 'system'}>
      <CodeBlock language="javascript" filename="Single tab">
        {getString()}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithDarkCode: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system" codeBlockThemeObject="dark">
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  )
}

export const WithShikiTheme: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system" codeBlockThemeObject={{ theme: 'andromeeda' }}>
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  )
}

export const WithLightDarkShikiThemes: Story = {
  render: (_, { globals }) => (
    <CodeGroup codeBlockTheme={globals.theme === 'dark' ? 'dark' : 'system'} codeBlockThemeObject={{ theme: { light: 'everforest-light', dark: 'dracula' } }}>
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  )
}

export const WithFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="app.js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="main.py">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="HelloWorld.java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {mediumCode}
      </CodeBlock>
      <CodeBlock language="typescript" filename="TypeScript" icon="typescript">
        {`function greet(name: string): boolean {\n  console.log(\`Hello, \${name}!\`);\n  return true;\n}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSpacesInFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="My App File.js" icon="js">
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Main Python Script.py" icon="python">
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="Hello World Class.java" icon="java">
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="app.js" icon="js" lines={true}>
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="main.py" icon="python" lines={true}>
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
      <CodeBlock language="java" filename="HelloWorld.java" icon="java" lines={true}>
        {mediumCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const LineNumbersDarkCode: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system" codeBlockThemeObject="dark">
      <CodeBlock language="javascript" filename="JavaScript" lines={true}>
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" lines={true}>
        {`def greet(name):\n    print(f"Hello, {name}!")\n    return True`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithWrap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="Long Line JS" wrap={true}>
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Long Line Python" wrap={true}>
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="Long Line JS" wrap={true} lines={true}>
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Long Line Python" wrap={true} lines={true}>
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([3, 5, 7])}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([2, 3])}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 5])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 4])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([2, 3, 4, 5, 6])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 2, 3, 4])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 4, 5, 8])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 3])}
        lines={true}
        icon="js"
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
        language="javascript"
        filename="Long Line"
        wrap={true}
        highlight={JSON.stringify([1])}
        lines={true}
      >
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock
        language="python"
        filename="Long Comment"
        wrap={true}
        highlight={JSON.stringify([1])}
        lines={true}
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
        language="java"
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 4, 6])}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" focus={JSON.stringify([2, 3])} icon="js">
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const FocusWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        focus={JSON.stringify([1, 2])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 3, 4, 5, 6])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        focus={JSON.stringify([2, 3, 4])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        focus={JSON.stringify([2, 5, 6, 7, 10])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        focus={JSON.stringify([1, 4])}
        lines={true}
        icon="js"
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
        language="javascript"
        filename="Long Line"
        wrap={true}
        focus={JSON.stringify([1])}
        lines={true}
      >
        {longSingleLineCode}
        {`\n`}
        {shortMultiLineCode}
      </CodeBlock>
      <CodeBlock
        language="python"
        filename="Long Comment"
        wrap={true}
        focus={JSON.stringify([1])}
        lines={true}
      >
        {`# ${longSingleLineCode}`}
        {`\n`}
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightAndFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 5])}
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1])}
        focus={JSON.stringify([3, 4])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([2, 3, 4])}
        focus={JSON.stringify([6, 7, 8])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 2])}
        focus={JSON.stringify([3, 4])}
        lines={true}
        icon="js"
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
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([3, 4, 5, 6])}
        focus={JSON.stringify([5, 6, 7, 8])}
        lines={true}
        icon="java"
      >
        {mediumCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([2, 3])}
        focus={JSON.stringify([3, 4])}
        lines={true}
        icon="js"
      >
        {shortMultiLineCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const Expandable: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="python" filename="library.py" expandable={true} icon="python">
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" expandable={true} icon="js">
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="python"
        filename="library.py"
        expandable={true}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" expandable={true} lines={true} icon="js">
        {getString(15)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="python"
        filename="library.py"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 25])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3, 10, 11, 12])}
        lines={true}
        icon="js"
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
        language="python"
        filename="library.py"
        expandable={true}
        focus={JSON.stringify([30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        expandable={true}
        focus={JSON.stringify([5, 6, 7, 8, 9, 10])}
        lines={true}
        icon="js"
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
        language="python"
        filename="library.py"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3, 8, 9, 10])}
        focus={JSON.stringify([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3])}
        focus={JSON.stringify([8, 9, 10, 11, 12])}
        lines={true}
        icon="js"
      >
        {getString(15)}
      </CodeBlock>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        expandable={true}
        wrap={true}
        lines={true}
        icon="java"
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
        {''}
      </CodeBlock>
      <CodeBlock filename="empty.js" language="javascript" lines={true} icon="js">
        {''}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const VeryLongSingleLine: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="long-line.js" lines={true} icon="js">
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock language="python" filename="long-line.py" lines={true} icon="python">
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
        language="javascript"
        filename="long-line-wrapped.js"
        wrap={true}
        lines={true}
        icon="js"
      >
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock
        language="python"
        filename="long-line-wrapped.py"
        wrap={true}
        lines={true}
        icon="python"
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
      <CodeBlock language="javascript" filename="special-chars.js" lines={true} icon="js">
        {`// Special characters test
const symbols = "!@#$%^&*()_+-=[]{}|;':",./<>?";
const unicode = "Hello 世界 🌍 café naïve résumé";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;`}
      </CodeBlock>
      <CodeBlock language="python" filename="special-chars.py" lines={true} icon="python">
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
        language="python"
        filename="complex-highlight.py"
        highlight={JSON.stringify([1, 3, 4, 5, 8, 10, 11, 12, 15, 18, 19, 20, 25, 30, 31, 32])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="complex-highlight.js"
        highlight={JSON.stringify([1, 2, 4, 6, 8, 10, 12])}
        lines={true}
        icon="js"
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
        language="python"
        filename="complex-focus.py"
        focus={JSON.stringify([2, 4, 5, 6, 9, 11, 12, 13, 16, 19, 20, 21, 26, 31, 32, 33])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="complex-focus.js"
        focus={JSON.stringify([2, 4, 6, 8, 10, 12, 14])}
        lines={true}
        icon="js"
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
        display: 'grid',
        width: '720px',
        height: '160px',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
      }}
    >
      <CodeGroup>
        <CodeBlock language="javascript" filename="With many lines 1 - Left" icon="js">
          {getString(3)}
        </CodeBlock>
        <CodeBlock language="python" filename="With many lines 2 - Left" icon="python">
          {getString(3, 'python')}
        </CodeBlock>
        <CodeBlock language="java" filename="With many lines 3 - Left" icon="java">
          {getString(3, 'java')}
        </CodeBlock>
      </CodeGroup>
      <CodeGroup>
        <CodeBlock language="javascript" filename="With many lines 1 - Right" icon="js">
          {getString(3)}
        </CodeBlock>
        <CodeBlock language="python" filename="With many lines 2 - Right" icon="python">
          {getString(3, 'python')}
        </CodeBlock>
        <CodeBlock language="java" filename="With many lines 3 - Right" icon="java">
          {getString(3, 'java')}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

export const DropdownEnabled: Story = {
  render: () => (
    <CodeGroup dropdown={true}>
      <CodeBlock language="javascript" filename="app.js" lines={true} icon="js">
        {getString(3)}
      </CodeBlock>
      <CodeBlock language="python" filename="app.py" lines={true} icon="python">
        {getString(3, 'python')}
      </CodeBlock>
      <CodeBlock language="java" filename="app.java" lines={true} icon="java">
        {getString(3, 'java')}
      </CodeBlock>
    </CodeGroup>
  ),
};
