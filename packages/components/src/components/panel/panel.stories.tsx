import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          This content is visible on small screens and hidden on xl screens.
        </p>
      </div>
    ),
  },
};

export const WithId: Story = {
  args: {
    id: "custom-panel-id",
    children: (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          This panel has a custom ID for targeting.
        </p>
      </div>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "border border-blue-500 p-2",
    children: (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          This panel has custom border styling applied via className.
        </p>
      </div>
    ),
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <h3 className="text-white font-bold mb-2">Mobile Navigation</h3>
        <ul className="text-white/90 space-y-1">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    ),
  },
};

export const MobileOnlyMessage: Story = {
  args: {
    className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4",
    children: (
      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
        This message is only visible on mobile and tablet devices. Resize your browser to see it disappear on larger screens.
      </p>
    ),
  },
};

export const Empty: Story = {
  args: {},
};
