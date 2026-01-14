import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Expandable } from "./expandable";

const meta: Meta<typeof Expandable> = {
  title: "Components/Expandable",
  component: Expandable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title displayed in the expandable header",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the expandable is open by default",
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    lazy: {
      control: "boolean",
      description: "Whether to lazily render children",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Expandable>;

export const Default: Story = {
  args: {
    title: "Additional Details",
    children: (
      <div className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This is the expandable content. It can contain any React elements.
        </p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Open by Default",
    defaultOpen: true,
    children: (
      <div className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This expandable starts in the open state.
        </p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    children: (
      <div className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          When no title is provided, it defaults to "child attributes".
        </p>
      </div>
    ),
  },
};

export const LazyRendering: Story = {
  args: {
    title: "Lazy Loaded Content",
    lazy: true,
    children: (
      <div className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This content is only rendered when the expandable is first opened.
          Once rendered, it stays in the DOM even when collapsed.
        </p>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Open
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
        <Expandable
          title="Controlled Expandable"
          open={isOpen}
          onChange={setIsOpen}
        >
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This expandable is controlled by external state.
              Current state: <strong>{isOpen ? "Open" : "Closed"}</strong>
            </p>
          </div>
        </Expandable>
      </div>
    );
  },
};

export const WithOnChange: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState<string>("None");
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last action: <strong>{lastAction}</strong>
        </p>
        <Expandable
          title="Track Open/Close"
          onChange={(open) => setLastAction(open ? "Opened" : "Closed")}
        >
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The onChange callback is triggered whenever the expandable is opened or closed.
            </p>
          </div>
        </Expandable>
      </div>
    );
  },
};

export const NestedExpandables: Story = {
  render: () => (
    <Expandable title="Parent Expandable">
      <div className="py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Expandables can be nested inside each other.
        </p>
        <Expandable title="Child Expandable 1">
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              First nested content.
            </p>
          </div>
        </Expandable>
        <Expandable title="Child Expandable 2">
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Second nested content.
            </p>
            <Expandable title="Deeply Nested">
              <div className="py-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Even deeper nesting is supported.
                </p>
              </div>
            </Expandable>
          </div>
        </Expandable>
      </div>
    </Expandable>
  ),
};

export const WithRichContent: Story = {
  args: {
    title: "API Response Fields",
    children: (
      <div className="py-4 space-y-4">
        <div className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
            id
          </code>
          <div className="flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">string</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Unique identifier for the resource.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
            created_at
          </code>
          <div className="flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">datetime</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Timestamp when the resource was created.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-2">
          <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
            status
          </code>
          <div className="flex-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">enum</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Current status of the resource: "active", "pending", or "archived".
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Expandable
        title="Custom Background"
        className="bg-blue-50 dark:bg-blue-950/30"
      >
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Using className to add a custom background color.
          </p>
        </div>
      </Expandable>
      <Expandable
        title="Custom Border"
        className="border-2 border-purple-300 dark:border-purple-700"
      >
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Using className to customize the border.
          </p>
        </div>
      </Expandable>
      <Expandable
        title="Custom Shadow"
        className="shadow-lg"
      >
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Using className to add a shadow effect.
          </p>
        </div>
      </Expandable>
    </div>
  ),
};

export const MultipleExpandables: Story = {
  render: () => (
    <div className="space-y-2">
      <Expandable title="Section 1: Introduction">
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is the first section with introductory content.
          </p>
        </div>
      </Expandable>
      <Expandable title="Section 2: Configuration">
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This section covers configuration options.
          </p>
        </div>
      </Expandable>
      <Expandable title="Section 3: Advanced Usage">
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Advanced usage patterns and examples.
          </p>
        </div>
      </Expandable>
    </div>
  ),
};
