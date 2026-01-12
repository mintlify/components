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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Inline SVG Icons
        </h3>
      </div>
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

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          String Icon Names
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star">Star</Badge>
        <Badge icon="heart" color="red">
          Heart
        </Badge>
        <Badge icon="check" color="green">
          Check
        </Badge>
        <Badge icon="circle-info" color="blue">
          Info
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icon Types (Font Awesome Styles)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" iconType="regular">
          Regular
        </Badge>
        <Badge icon="star" iconType="solid" color="yellow">
          Solid
        </Badge>
        <Badge icon="star" iconType="light" color="blue">
          Light
        </Badge>
        <Badge icon="star" iconType="duotone" color="purple">
          Duotone
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Lucide Icon Library
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" iconLibrary="lucide">
          Lucide Star
        </Badge>
        <Badge icon="heart" iconLibrary="lucide" color="red">
          Lucide Heart
        </Badge>
        <Badge icon="circle-check" iconLibrary="lucide" color="green">
          Lucide Check
        </Badge>
        <Badge icon="info" iconLibrary="lucide" color="blue">
          Lucide Info
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Different Sizes
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Badge icon="bolt" size="xs" color="orange">
          XS
        </Badge>
        <Badge icon="bolt" size="sm" color="orange">
          SM
        </Badge>
        <Badge icon="bolt" size="md" color="orange">
          MD
        </Badge>
        <Badge icon="bolt" size="lg" color="orange">
          LG
        </Badge>
      </div>
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

export const IconCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Stroke
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" stroke>
          Star
        </Badge>
        <Badge icon="check" color="green" stroke>
          Check
        </Badge>
        <Badge icon="heart" color="red" stroke>
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Disabled State
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" disabled>
          Star
        </Badge>
        <Badge icon="check" color="green" disabled>
          Check
        </Badge>
        <Badge icon="heart" color="red" disabled>
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Pill Shape
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" shape="pill">
          Pill Star
        </Badge>
        <Badge icon="check" color="green" shape="pill">
          Pill Check
        </Badge>
        <Badge icon="heart" color="red" shape="pill">
          Pill Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Inline SVG Icons with States
        </h3>
      </div>
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
          stroke
          color="green"
        >
          With Stroke
        </Badge>
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
          disabled
          color="blue"
        >
          Disabled
        </Badge>
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
          shape="pill"
          color="purple"
        >
          Pill
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          All States Combined
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge icon="star" color="yellow" shape="pill" stroke size="lg">
          All Options
        </Badge>
        <Badge icon="bolt" color="orange" shape="pill" stroke size="sm">
          Small Combo
        </Badge>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Using className prop for custom styling
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge className="uppercase">Uppercase</Badge>
        <Badge className="font-bold" color="blue">
          Bold
        </Badge>
        <Badge className="italic" color="green">
          Italic
        </Badge>
        <Badge className="shadow-lg" color="purple">
          With Shadow
        </Badge>
      </div>
      <div className="flex gap-2">
        <Badge className="ring-2 ring-blue-500 ring-offset-2" color="blue">
          With Ring
        </Badge>
        <Badge className="hover:scale-110 transition-transform cursor-pointer" color="red">
          Hover Effect
        </Badge>
        <Badge
          icon="star"
          className="opacity-75 hover:opacity-100 transition-opacity"
          color="yellow"
        >
          Custom Opacity
        </Badge>
      </div>
    </div>
  ),
};

