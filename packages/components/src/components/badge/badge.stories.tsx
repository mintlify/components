/** biome-ignore-all lint/suspicious/noAlert: ignore alert, it's testing */
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
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Solid (Default)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge color="blue">Blue</Badge>
        <Badge color="green">Green</Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
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
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Lead Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star">With Lead Icon</Badge>
        <Badge color="red" leadIcon="heart">
          Heart Lead
        </Badge>
        <Badge color="green" leadIcon="check">
          Check Lead
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Tail Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge tailIcon="star">With Tail Icon</Badge>
        <Badge color="blue" tailIcon="arrow-right">
          Next
        </Badge>
        <Badge color="purple" tailIcon="external-link">
          External
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Both Lead and Tail Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" tailIcon="star">
          Both Icons
        </Badge>
        <Badge color="green" leadIcon="check" tailIcon="arrow-right">
          Complete
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Inline SVG Icons
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge
          leadIcon={
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                fillRule="evenodd"
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
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                fillRule="evenodd"
              />
            </svg>
          }
        >
          With Tail
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Icon Types (Font Awesome Styles)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge iconType="regular" leadIcon="star">
          Regular
        </Badge>
        <Badge color="yellow" iconType="solid" leadIcon="star">
          Solid
        </Badge>
        <Badge color="blue" iconType="light" leadIcon="star">
          Light
        </Badge>
        <Badge color="purple" iconType="duotone" leadIcon="star">
          Duotone
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Lucide Icon Library
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge iconLibrary="lucide" leadIcon="star">
          Lucide Star
        </Badge>
        <Badge color="red" iconLibrary="lucide" leadIcon="heart">
          Lucide Heart
        </Badge>
        <Badge color="green" iconLibrary="lucide" leadIcon="circle-check">
          Lucide Check
        </Badge>
        <Badge color="blue" iconLibrary="lucide" leadIcon="info">
          Lucide Info
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Icons with Different Sizes
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Badge color="orange" leadIcon="bolt" size="xs">
          XS
        </Badge>
        <Badge color="orange" leadIcon="bolt" size="sm">
          SM
        </Badge>
        <Badge color="orange" leadIcon="bolt" size="md">
          MD
        </Badge>
        <Badge color="orange" leadIcon="bolt" size="lg">
          LG
        </Badge>
      </div>
    </div>
  ),
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="flex gap-2 rounded-lg bg-stone-100 p-4 dark:bg-stone-800">
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
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Icons with Outline Variant
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" variant="outline">
          Star
        </Badge>
        <Badge color="green" leadIcon="check" variant="outline">
          Check
        </Badge>
        <Badge color="red" leadIcon="heart" variant="outline">
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Icons with Disabled State
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge disabled leadIcon="star">
          Star
        </Badge>
        <Badge color="green" disabled leadIcon="check">
          Check
        </Badge>
        <Badge color="red" disabled leadIcon="heart">
          Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Icons with Pill Shape
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge leadIcon="star" shape="pill">
          Pill Star
        </Badge>
        <Badge color="green" leadIcon="check" shape="pill">
          Pill Check
        </Badge>
        <Badge color="red" leadIcon="heart" shape="pill">
          Pill Heart
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Inline SVG Icons with States
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge
          color="green"
          leadIcon={
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                fillRule="evenodd"
              />
            </svg>
          }
          variant="outline"
        >
          With Outline
        </Badge>
        <Badge
          color="blue"
          disabled
          leadIcon={
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                fillRule="evenodd"
              />
            </svg>
          }
        >
          Disabled
        </Badge>
        <Badge
          color="purple"
          leadIcon={
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                fillRule="evenodd"
              />
            </svg>
          }
          shape="pill"
        >
          Pill
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          All States Combined
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge
          color="yellow"
          leadIcon="star"
          shape="pill"
          size="lg"
          variant="outline"
        >
          All Options
        </Badge>
        <Badge
          color="orange"
          leadIcon="bolt"
          shape="pill"
          size="sm"
          variant="outline"
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
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
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
        <Badge
          className="cursor-pointer transition-transform hover:scale-110"
          color="red"
        >
          Hover Effect
        </Badge>
        <Badge
          className="opacity-75 transition-opacity hover:opacity-100"
          color="yellow"
          leadIcon="star"
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
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Clickable Badges (onClick)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge onClick={() => alert("Badge clicked!")}>Click me</Badge>
        <Badge
          color="yellow"
          leadIcon="star"
          onClick={() => alert("Star clicked!")}
        >
          Click Star
        </Badge>
        <Badge
          color="blue"
          onClick={() => alert("Outline clicked!")}
          variant="outline"
        >
          Click Outline
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Link Badges (href)
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge href="https://example.com" tailIcon="external-link">
          External Link
        </Badge>
        <Badge
          color="gray"
          href="https://github.com"
          leadIcon="github"
          variant="outline"
        >
          GitHub
        </Badge>
        <Badge color="blue" href="/docs" tailIcon="arrow-right">
          Documentation
        </Badge>
      </div>

      <div className="flex gap-2">
        <h3 className="w-full font-medium text-sm text-stone-700 dark:text-stone-300">
          Disabled Interactive Badges
        </h3>
      </div>
      <div className="flex gap-2">
        <Badge disabled onClick={() => alert("Should not fire")}>
          Disabled Click
        </Badge>
        <Badge disabled href="https://example.com" tailIcon="external-link">
          Disabled Link
        </Badge>
      </div>
    </div>
  ),
};
