import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    description: {
      control: "text",
      description: "The descriptive text shown in the tooltip",
    },
    title: {
      control: "text",
      description: "Optional title shown above the description",
    },
    cta: {
      control: "text",
      description: "Optional call-to-action text (requires href)",
    },
    href: {
      control: "text",
      description: "Optional link URL for the CTA",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the root element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic usage with text-only trigger
export const Default: Story = {
  args: {
    description: "This is a helpful tooltip with more information.",
    children: "Hover me",
  },
};

// Tooltip with a title
export const WithTitle: Story = {
  args: {
    title: "Pro Tip",
    description: "You can customize this component using the className prop.",
    children: "Hover for a tip",
  },
};

// Tooltip with CTA link
export const WithCTA: Story = {
  args: {
    title: "Learn More",
    description: "This feature allows you to extend functionality.",
    cta: "View documentation",
    href: "https://mintlify.com/docs",
    children: "Hover for details",
  },
};

// Tooltip wrapping a button element
export const WithButton: Story = {
  args: {
    description: "Click this button to perform an action",
    children: <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Action Button</button>,
  },
};

// Tooltip with custom element as trigger
export const WithCustomTrigger: Story = {
  args: {
    description: "This icon provides additional context",
    children: (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs font-medium cursor-help">
        ?
      </span>
    ),
  },
};

// Tooltip with long description
export const LongDescription: Story = {
  args: {
    title: "Detailed Information",
    description: "This is a longer description that provides more context about the feature. It demonstrates how the tooltip handles multiline content and wraps text appropriately within its maximum width constraint.",
    children: "Read more details",
  },
};

// Tooltip with custom className
export const WithClassName: Story = {
  args: {
    description: "This trigger has custom styling applied",
    className: "font-bold text-blue-600",
    children: "Styled trigger",
  },
};

// Multiple tooltips showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-32">Basic:</span>
        <Tooltip description="A simple tooltip with just a description.">
          Hover me
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-32">With Title:</span>
        <Tooltip
          title="Important"
          description="This tooltip includes a title for emphasis."
        >
          Hover me
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-32">With CTA:</span>
        <Tooltip
          title="Documentation"
          description="Click the link below to learn more."
          cta="Read docs"
          href="https://example.com"
        >
          Hover me
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-32">Button Trigger:</span>
        <Tooltip description="This tooltip is triggered by a button.">
          <button className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
            Button
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-32">Icon Trigger:</span>
        <Tooltip
          title="Help"
          description="Click the question mark for more information."
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium cursor-help">
            ?
          </span>
        </Tooltip>
      </div>
    </div>
  ),
};

// Accessibility example - demonstrates keyboard navigation
export const AccessibilityExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 mb-2">
        Tab through the elements below and press Enter or Space to toggle tooltips:
      </p>
      <div className="flex gap-4">
        <Tooltip
          title="First Item"
          description="Navigate using Tab key"
        >
          <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            First
          </button>
        </Tooltip>
        <Tooltip
          title="Second Item"
          description="Press Enter or Space to toggle"
        >
          <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Second
          </button>
        </Tooltip>
        <Tooltip
          title="Third Item"
          description="Use Escape to close"
        >
          <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Third
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// Dark mode preview
export const DarkModePreview: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4">
        <Tooltip
          title="Dark Mode"
          description="The tooltip adapts to dark mode with appropriate colors."
        >
          <span className="text-gray-200">Hover in dark mode</span>
        </Tooltip>
        <Tooltip
          title="With CTA"
          description="Links also adapt to the dark theme."
          cta="Learn more"
          href="https://example.com"
        >
          <span className="text-gray-200">Hover for CTA</span>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
