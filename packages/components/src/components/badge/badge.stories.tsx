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
    variant: {
      control: "select",
      options: ["solid", "outline"],
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Solid (Default)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge color="blue">Blue</Badge>
        <Badge color="green">Green</Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Outline
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">Outline</Badge>
        <Badge color="blue" variant="outline">
          Blue Outline
        </Badge>
        <Badge color="green" variant="outline">
          Green Outline
        </Badge>
      </div>
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
          Lead Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star">With Lead Icon</Badge>
        <Badge leadIcon="heart" color="red">
          Heart Lead
        </Badge>
        <Badge leadIcon="check" color="green">
          Check Lead
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Tail Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge tailIcon="star">With Tail Icon</Badge>
        <Badge tailIcon="arrow-right" color="blue">
          Next
        </Badge>
        <Badge tailIcon="external-link" color="purple">
          External
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Both Lead and Tail Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" tailIcon="star">
          Both Icons
        </Badge>
        <Badge leadIcon="check" tailIcon="arrow-right" color="green">
          Complete
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Inline SVG Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge
          leadIcon={
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
          With Lead
        </Badge>
        <Badge
          color="green"
          tailIcon={
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
          With Tail
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icon Types (Font Awesome Styles)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" iconType="regular">
          Regular
        </Badge>
        <Badge leadIcon="star" iconType="solid" color="yellow">
          Solid
        </Badge>
        <Badge leadIcon="star" iconType="light" color="blue">
          Light
        </Badge>
        <Badge leadIcon="star" iconType="duotone" color="purple">
          Duotone
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Lucide Icon Library
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" iconLibrary="lucide">
          Lucide Star
        </Badge>
        <Badge leadIcon="heart" iconLibrary="lucide" color="red">
          Lucide Heart
        </Badge>
        <Badge leadIcon="circle-check" iconLibrary="lucide" color="green">
          Lucide Check
        </Badge>
        <Badge leadIcon="info" iconLibrary="lucide" color="blue">
          Lucide Info
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Different Sizes
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Badge leadIcon="bolt" size="xs" color="orange">
          XS
        </Badge>
        <Badge leadIcon="bolt" size="sm" color="orange">
          SM
        </Badge>
        <Badge leadIcon="bolt" size="md" color="orange">
          MD
        </Badge>
        <Badge leadIcon="bolt" size="lg" color="orange">
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
          Icons with Outline Variant
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" variant="outline">
          Star
        </Badge>
        <Badge leadIcon="check" color="green" variant="outline">
          Check
        </Badge>
        <Badge leadIcon="heart" color="red" variant="outline">
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Disabled State
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" disabled>
          Star
        </Badge>
        <Badge leadIcon="check" color="green" disabled>
          Check
        </Badge>
        <Badge leadIcon="heart" color="red" disabled>
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Icons with Pill Shape
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" shape="pill">
          Pill Star
        </Badge>
        <Badge leadIcon="check" color="green" shape="pill">
          Pill Check
        </Badge>
        <Badge leadIcon="heart" color="red" shape="pill">
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
          leadIcon={
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
          variant="outline"
          color="green"
        >
          With Outline
        </Badge>
        <Badge
          leadIcon={
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
          leadIcon={
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
        <Badge
          leadIcon="star"
          color="yellow"
          shape="pill"
          variant="outline"
          size="lg"
        >
          All Options
        </Badge>
        <Badge
          leadIcon="bolt"
          color="orange"
          shape="pill"
          variant="outline"
          size="sm"
        >
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
          leadIcon="star"
          className="opacity-75 hover:opacity-100 transition-opacity"
          color="yellow"
        >
          Custom Opacity
        </Badge>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Clickable Badges (onClick)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge onClick={() => alert("Badge clicked!")}>Click me</Badge>
        <Badge
          onClick={() => alert("Star clicked!")}
          leadIcon="star"
          color="yellow"
        >
          Click Star
        </Badge>
        <Badge
          onClick={() => alert("Outline clicked!")}
          variant="outline"
          color="blue"
        >
          Click Outline
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Link Badges (href)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge href="https://example.com" tailIcon="external-link">
          External Link
        </Badge>
        <Badge
          href="https://github.com"
          leadIcon="github"
          color="gray"
          variant="outline"
        >
          GitHub
        </Badge>
        <Badge href="/docs" tailIcon="arrow-right" color="blue">
          Documentation
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          Disabled Interactive Badges
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge onClick={() => alert("Should not fire")} disabled>
          Disabled Click
        </Badge>
        <Badge href="https://example.com" disabled tailIcon="external-link">
          Disabled Link
        </Badge>
      </div>
    </div>
  ),
};

