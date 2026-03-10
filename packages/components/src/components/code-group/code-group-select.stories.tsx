import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ExampleCodeSnippet } from "./code-group-select";
import { CodeGroupSelect } from "./code-group-select";

const meta: Meta<typeof CodeGroupSelect> = {
  title: "Components/CodeGroupSelect",
  component: CodeGroupSelect,
};

export default meta;
type Story = StoryObj<typeof CodeGroupSelect>;

const pythonSnippets: Record<string, ExampleCodeSnippet> = {
  Setup: {
    filename: "install.sh",
    code: "pip install my-package",
    language: "bash",
  },
  "Basic usage": {
    filename: "example.py",
    code: `from my_package import Client

client = Client(api_key="your-key")
result = client.run(input="Hello, world")
print(result)`,
    language: "python",
  },
  Advanced: {
    filename: "advanced.py",
    code: `from my_package import Client, Config

config = Config(
    timeout=30,
    retries=3,
    verbose=True,
)
client = Client(api_key="your-key", config=config)

for item in client.stream(input="Process this"):
    print(item)`,
    language: "python",
  },
};

const typescriptSnippets: Record<string, ExampleCodeSnippet> = {
  Setup: {
    filename: "install.sh",
    code: "npm install my-package",
    language: "bash",
  },
  "Basic usage": {
    filename: "example.ts",
    code: `import { Client } from "my-package";

const client = new Client({ apiKey: "your-key" });
const result = await client.run({ input: "Hello, world" });
console.log(result);`,
    language: "typescript",
  },
  Advanced: {
    filename: "advanced.ts",
    code: `import { Client, type Config } from "my-package";

const config: Config = {
  timeout: 30,
  retries: 3,
  verbose: true,
};
const client = new Client({ apiKey: "your-key", config });

for await (const item of client.stream({ input: "Process this" })) {
  console.log(item);
}`,
    language: "typescript",
  },
};

const goSnippets: Record<string, ExampleCodeSnippet> = {
  Setup: {
    filename: "install.sh",
    code: "go get github.com/example/my-package",
    language: "bash",
  },
  "Basic usage": {
    filename: "main.go",
    code: `package main

import "github.com/example/my-package"

func main() {
    client := mypackage.NewClient("your-key")
    result, err := client.Run("Hello, world")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(result)
}`,
    language: "go",
  },
};

const snippets: Record<string, Record<string, ExampleCodeSnippet>> = {
  Python: pythonSnippets,
  TypeScript: typescriptSnippets,
  Go: goSnippets,
};

export const Default: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      snippets={snippets}
    />
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <CodeGroupSelect codeBlockTheme="dark" snippets={snippets} />
  ),
};

export const SingleGroup: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      snippets={{ Python: pythonSnippets }}
    />
  ),
};

export const SingleOption: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      snippets={{
        Python: {
          Setup: pythonSnippets.Setup,
        },
        TypeScript: {
          Setup: typescriptSnippets.Setup,
        },
      }}
    />
  ),
};

export const WithAudioUrl: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      snippets={{
        English: {
          Greeting: {
            filename: "greeting.mp3",
            code: "",
            language: "text",
            audioUrl: "/greeting.mp3",
          },
        },
        Spanish: {
          Greeting: {
            filename: "saludo.mp3",
            code: "",
            language: "text",
            audioUrl: "/saludo.mp3",
          },
        },
      }}
    />
  ),
};

export const WithShikiTheme: Story = {
  render: () => (
    <CodeGroupSelect
      codeBlockTheme="system"
      codeBlockThemeObject={{ theme: "andromeeda" }}
      snippets={snippets}
    />
  ),
};

export const WithLightDarkShikiThemes: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      codeBlockThemeObject={{
        theme: { light: "everforest-light", dark: "dracula" },
      }}
      snippets={snippets}
    />
  ),
};

export const WithCustomClassName: Story = {
  render: (_, { globals }) => (
    <CodeGroupSelect
      className="max-w-md shadow-lg"
      codeBlockTheme={globals.theme === "dark" ? "dark" : "system"}
      snippets={snippets}
    />
  ),
};
