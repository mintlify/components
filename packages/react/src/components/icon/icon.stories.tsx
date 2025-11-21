import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => {
    return (
      <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
        <Icon {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    icon: "rocket",
    size: 24,
  },
};

export const AllIconTypes: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="grid grid-cols-4 gap-6 max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="regular" size={32} />
          <span className="text-sm text-text-secondary">Regular</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} />
          <span className="text-sm text-text-secondary">Solid</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="light" size={32} />
          <span className="text-sm text-text-secondary">Light</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="thin" size={32} />
          <span className="text-sm text-text-secondary">Thin</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="duotone" size={32} />
          <span className="text-sm text-text-secondary">Duotone</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="sharp-solid" size={32} />
          <span className="text-sm text-text-secondary">Sharp Solid</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="sharp-regular" size={32} />
          <span className="text-sm text-text-secondary">Sharp Regular</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="sharp-light" size={32} />
          <span className="text-sm text-text-secondary">Sharp Light</span>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={16} />
          <span className="text-sm text-text-secondary">16px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={20} />
          <span className="text-sm text-text-secondary">20px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={24} />
          <span className="text-sm text-text-secondary">24px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={32} />
          <span className="text-sm text-text-secondary">32px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={48} />
          <span className="text-sm text-text-secondary">48px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="rocket" iconType="solid" size={64} />
          <span className="text-sm text-text-secondary">64px</span>
        </div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#ef4444" />
          <span className="text-sm text-text-secondary">Red</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#3b82f6" />
          <span className="text-sm text-text-secondary">Blue</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#10b981" />
          <span className="text-sm text-text-secondary">Green</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#f59e0b" />
          <span className="text-sm text-text-secondary">Orange</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#8b5cf6" />
          <span className="text-sm text-text-secondary">Purple</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconType="solid" size={32} color="#6366f1" />
          <span className="text-sm text-text-secondary">Indigo</span>
        </div>
      </div>
    </div>
  ),
};

export const BrandIcons: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="grid grid-cols-6 gap-6 max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="github" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">GitHub</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="twitter" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Twitter</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="linkedin" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">LinkedIn</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="facebook" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Facebook</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="instagram" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Instagram</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="youtube" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">YouTube</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="discord" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Discord</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="slack" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Slack</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="figma" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Figma</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="react" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">React</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="npm" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">NPM</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="docker" iconType="brands" size={32} />
          <span className="text-xs text-text-secondary">Docker</span>
        </div>
      </div>
    </div>
  ),
};

export const LucideIcons: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="grid grid-cols-6 gap-6 max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="heart" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">Heart</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="star" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">Star</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="check" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">Check</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="x" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">X</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="settings" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">Settings</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Icon icon="search" iconLibrary="lucide" size={32} />
          <span className="text-xs text-text-secondary">Search</span>
        </div>
      </div>
    </div>
  ),
};

export const CustomURL: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex flex-col items-center gap-4">
        <Icon
          icon="https://mintcdn.com/mintlify/e0-N9JebsJpsinlD/logo/light.svg?fit=max&auto=format&n=e0-N9JebsJpsinlD&q=85&s=b0900d78fd30c5583e438ce3f2591f94"
          size={48}
        />
        <span className="text-sm text-text-secondary">CDN URL (with mask)</span>
      </div>
    </div>
  ),
};

export const InlineInText: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-text-primary">
          Icons can be used inline with text{" "}
          <Icon
            icon="heart"
            iconType="solid"
            size={16}
            color="#ef4444"
            className="inline align-middle"
          />{" "}
          to add visual interest and improve readability.
        </p>
        <p className="text-text-primary">
          You can use icons for actions like{" "}
          <Icon
            icon="download"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          download,{" "}
          <Icon
            icon="share"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          share, or{" "}
          <Icon
            icon="bookmark"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          save.
        </p>
        <p className="text-text-primary">
          Status indicators work well too:{" "}
          <Icon
            icon="circle-check"
            iconType="solid"
            size={16}
            color="#10b981"
            className="inline align-middle"
          />{" "}
          Success,{" "}
          <Icon
            icon="circle-exclamation"
            iconType="solid"
            size={16}
            color="#f59e0b"
            className="inline align-middle"
          />{" "}
          Warning,{" "}
          <Icon
            icon="circle-xmark"
            iconType="solid"
            size={16}
            color="#ef4444"
            className="inline align-middle"
          />{" "}
          Error.
        </p>
      </div>
    </div>
  ),
};

export const WithCurrentColor: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-y-6">
        <div className="text-blue-500 flex items-center gap-2">
          <Icon icon="info-circle" iconType="solid" size={20} />
          <span>Icons inherit text color by default</span>
        </div>
        <div className="text-green-600 flex items-center gap-2">
          <Icon icon="check-circle" iconType="solid" size={20} />
          <span>Success message with icon</span>
        </div>
        <div className="text-red-600 flex items-center gap-2">
          <Icon icon="exclamation-triangle" iconType="solid" size={20} />
          <span>Error message with icon</span>
        </div>
        <div className="text-orange-500 flex items-center gap-2">
          <Icon icon="lightbulb" iconType="solid" size={20} />
          <span>Tip with icon</span>
        </div>
      </div>
    </div>
  ),
};

export const DifferentStates: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Icon icon="heart" iconType="regular" size={24} />
          </button>
          <span className="text-xs text-text-secondary">Inactive</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Icon icon="heart" iconType="solid" size={24} color="#ef4444" />
          </button>
          <span className="text-xs text-text-secondary">Active</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-2 rounded opacity-50 cursor-not-allowed"
            disabled
          >
            <Icon icon="heart" iconType="solid" size={24} />
          </button>
          <span className="text-xs text-text-secondary">Disabled</span>
        </div>
      </div>
    </div>
  ),
};
