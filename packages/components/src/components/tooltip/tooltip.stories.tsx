import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    description: 'This is a tooltip',
    children: 'Hover me',
  },
};

export const WithLongText: Story = {
  args: {
    description: 'This is a longer tooltip message that demonstrates how the component handles text that might wrap to multiple lines. The max width is set to 16rem.',
    children: 'Hover for long tooltip',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Pro Tip',
    description: 'You can use keyboard shortcuts to navigate faster.',
    children: 'Hover for tip with headline',
  },
};

export const WithTitleAndCta: Story = {
  args: {
    title: 'Learn More',
    description: 'This feature helps you organize your content better.',
    cta: 'Read docs',
    href: '/docs',
    children: 'Hover for full tooltip',
  },
};

export const OnButton: Story = {
  render: () => (
    <Tooltip description="Click this button">
      <button style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        Button with tooltip
      </button>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip description="Information">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
  ),
};

export const OnCustomStyledText: Story = {
  render: () => (
    <Tooltip description="This is a custom styled text">
      <span style={{ color: '#0056b3', fontWeight: 'bold' }}>Custom styled text</span>
    </Tooltip>
  ),
};

export const OnMultipleElements: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip description="First element">
        <span>First</span>
      </Tooltip>
      <Tooltip description="Second element">
        <span>Second</span>
      </Tooltip>
      <Tooltip description="Third element">
        <span>Third</span>
      </Tooltip>
    </div>
  ),
};
