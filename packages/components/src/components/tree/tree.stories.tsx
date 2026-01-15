import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree } from "./index";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the tree root",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Default: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.File name="README.md" />
      <Tree.Folder name="src">
        <Tree.File name="index.ts" />
        <Tree.File name="app.tsx" />
      </Tree.Folder>
      <Tree.Folder name="public">
        <Tree.File name="favicon.ico" />
      </Tree.Folder>
    </Tree>
  ),
};

export const WithDefaultOpen: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.Folder name="src" defaultOpen>
        <Tree.File name="index.ts" />
        <Tree.Folder name="components" defaultOpen>
          <Tree.File name="Button.tsx" />
          <Tree.File name="Card.tsx" />
        </Tree.Folder>
        <Tree.Folder name="utils">
          <Tree.File name="cn.ts" />
        </Tree.Folder>
      </Tree.Folder>
    </Tree>
  ),
};

export const DeeplyNested: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.Folder name="packages" defaultOpen>
        <Tree.Folder name="components" defaultOpen>
          <Tree.Folder name="src" defaultOpen>
            <Tree.Folder name="components" defaultOpen>
              <Tree.Folder name="tree" defaultOpen>
                <Tree.File name="tree.tsx" />
                <Tree.File name="tree.stories.tsx" />
                <Tree.File name="index.ts" />
              </Tree.Folder>
            </Tree.Folder>
          </Tree.Folder>
        </Tree.Folder>
      </Tree.Folder>
    </Tree>
  ),
};

export const FilesOnly: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.File name="package.json" />
      <Tree.File name="tsconfig.json" />
      <Tree.File name="README.md" />
      <Tree.File name=".gitignore" />
      <Tree.File name=".eslintrc.js" />
    </Tree>
  ),
};

export const EmptyFolder: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.Folder name="src">
        <Tree.File name="index.ts" />
      </Tree.Folder>
      <Tree.Folder name="empty-folder" />
      <Tree.Folder name="dist" openable={false} />
    </Tree>
  ),
};

export const ProjectStructure: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.Folder name="my-project" defaultOpen>
        <Tree.File name=".gitignore" />
        <Tree.File name="package.json" />
        <Tree.File name="tsconfig.json" />
        <Tree.File name="README.md" />
        <Tree.Folder name="src" defaultOpen>
          <Tree.File name="index.ts" />
          <Tree.File name="App.tsx" />
          <Tree.Folder name="components">
            <Tree.File name="Header.tsx" />
            <Tree.File name="Footer.tsx" />
            <Tree.File name="Sidebar.tsx" />
          </Tree.Folder>
          <Tree.Folder name="hooks">
            <Tree.File name="useAuth.ts" />
            <Tree.File name="useTheme.ts" />
          </Tree.Folder>
          <Tree.Folder name="utils">
            <Tree.File name="cn.ts" />
            <Tree.File name="api.ts" />
          </Tree.Folder>
          <Tree.Folder name="styles">
            <Tree.File name="globals.css" />
            <Tree.File name="variables.css" />
          </Tree.Folder>
        </Tree.Folder>
        <Tree.Folder name="public">
          <Tree.File name="favicon.ico" />
          <Tree.File name="robots.txt" />
          <Tree.Folder name="images">
            <Tree.File name="logo.svg" />
            <Tree.File name="hero.png" />
          </Tree.Folder>
        </Tree.Folder>
        <Tree.Folder name="tests">
          <Tree.File name="setup.ts" />
          <Tree.Folder name="unit">
            <Tree.File name="utils.test.ts" />
          </Tree.Folder>
          <Tree.Folder name="e2e">
            <Tree.File name="home.spec.ts" />
          </Tree.Folder>
        </Tree.Folder>
      </Tree.Folder>
    </Tree>
  ),
};

export const WithCustomClassName: Story = {
  render: (args) => (
    <Tree {...args} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg w-64">
      <Tree.Folder name="src" defaultOpen>
        <Tree.File name="index.ts" />
        <Tree.File name="app.tsx" />
      </Tree.Folder>
      <Tree.File name="package.json" />
    </Tree>
  ),
};

export const LongFileNames: Story = {
  render: (args) => (
    <Tree {...args} className="w-64">
      <Tree.Folder
        name="this-is-a-really-long-folder-name-that-should-truncate"
        defaultOpen
      >
        <Tree.File name="this-is-a-really-long-file-name-that-should-also-truncate.tsx" />
        <Tree.File name="another-very-long-file-name.config.ts" />
      </Tree.Folder>
      <Tree.File name="extremely-long-filename-at-root-level.md" />
    </Tree>
  ),
};

export const AllExpanded: Story = {
  render: (args) => (
    <Tree {...args}>
      <Tree.Folder name="level-1" defaultOpen>
        <Tree.Folder name="level-2a" defaultOpen>
          <Tree.Folder name="level-3a" defaultOpen>
            <Tree.File name="deep-file.ts" />
          </Tree.Folder>
          <Tree.File name="file-2a.ts" />
        </Tree.Folder>
        <Tree.Folder name="level-2b" defaultOpen>
          <Tree.File name="file-2b.ts" />
        </Tree.Folder>
        <Tree.File name="file-1.ts" />
      </Tree.Folder>
    </Tree>
  ),
};
