import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeGroup } from "./codeGroup";
import { CodeBlock } from "./codeBlock";
import { getString, longSingleLineCode, mediumCode, shortMultiLineCode } from "./storyUtils";

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
