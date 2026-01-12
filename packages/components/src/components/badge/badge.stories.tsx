import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "gray",
        "blue",
        "green",
        "orange",
        "yellow",
        "red",
        "purple",
        "white",
        "surface",
        "white-destructive",
        "surface-destructive",
      ],
    },
    shape: {
      control: "select",
      options: ["rounded", "pill"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    stroke: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    color: "gray",
    shape: "rounded",
    size: "md",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="gray">Gray</Badge>
      <Badge color="blue">Blue</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="orange">Orange</Badge>
      <Badge color="yellow">Yellow</Badge>
      <Badge color="red">Red</Badge>
      <Badge color="purple">Purple</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="pill">Pill</Badge>
    </div>
  ),
};

export const WithStroke: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge stroke>With Stroke</Badge>
      <Badge color="blue" stroke>
        Blue Stroke
      </Badge>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge disabled>Disabled</Badge>
      <Badge color="blue" disabled>
        Disabled Blue
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        With Icon
      </Badge>
      <Badge
        color="green"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Success
      </Badge>
    </div>
  ),
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="flex gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Badge color="white">White</Badge>
      <Badge color="surface">Surface</Badge>
      <Badge color="white-destructive">White Destructive</Badge>
      <Badge color="surface-destructive">Surface Destructive</Badge>
    </div>
  ),
};

