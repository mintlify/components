import type { Meta, StoryObj } from "@storybook/react-vite";
import { Frame } from "./frame";
const meta: Meta<typeof Frame> = {
  title: 'Components/Frame',
  component: Frame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Basic: Story = {
  args: {
    style: { width: '400px', height: '200px' },
    className: 'w-full',
    children: <div className="p-4">Basic frame content</div>,
  },
};

export const WithCaption: Story = {
  args: {
    style: { width: '400px', height: '200px' },
    className: 'w-full',
    description: 'This is a frame caption',
    children: <div className="p-4">Frame with caption</div>,
  },
};

export const WithHint: Story = {
  args: {
    style: { width: '400px', height: '200px' },
    className: 'w-full',
    title: 'This is a helpful hint',
    children: <div className="p-4">Frame with hint</div>,
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: {
      width: '400px',
      height: '200px',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    },
    className: 'w-full',
    children: <div className="p-4 text-white">Frame with custom background</div>,
  },
};

export const WithContent: Story = {
  args: {
    style: { width: '400px', height: '200px' },
    className: 'w-full',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Frame Content</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This frame contains structured content with a heading and paragraph.
        </p>
      </div>
    ),
  },
};

export const WithAllFeatures: Story = {
  args: {
    style: { width: '400px', height: '200px' },
    className: 'w-full',
    description: 'Complete frame example',
    title: 'This frame shows all available features',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Complete Example</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This frame demonstrates all available features including caption, hint, and custom
          styling.
        </p>
      </div>
    ),
  },
};
