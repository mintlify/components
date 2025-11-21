import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => {
    return (
      <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
        <Badge {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  args: {
    children: "Badge",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-x-4 space-y-4">
        <Badge size="xs">XS</Badge>
        <Badge size="sm">SM</Badge>
        <Badge size="md">MD</Badge>
        <Badge size="lg">LG</Badge>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-lg">
        <Badge color="gray">Gray</Badge>
        <Badge color="blue">Blue</Badge>
        <Badge color="green">Green</Badge>
        <Badge color="orange">Orange</Badge>
        <Badge color="red">Red</Badge>
        <Badge color="purple">Purple</Badge>
        <Badge color="white">White</Badge>
        <Badge color="surface">Surface</Badge>
        <Badge color="white-destructive">White Destructive</Badge>
        <Badge color="surface-destructive">Surface Destructive</Badge>
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-x-4 space-y-4">
        <Badge shape="rounded">Rounded</Badge>
        <Badge shape="pill">Pill</Badge>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-lg">
        <Badge icon="circle-check" color="gray">
          Gray
        </Badge>
        <Badge icon="circle-check" color="blue">
          Blue
        </Badge>
        <Badge icon="circle-check" color="green">
          Green
        </Badge>
        <Badge icon="circle-check" color="orange">
          Orange
        </Badge>
        <Badge icon="circle-check" color="red">
          Red
        </Badge>
        <Badge icon="circle-check" color="purple">
          Purple
        </Badge>
        <Badge icon="circle-check" color="white">
          White
        </Badge>
        <Badge icon="circle-check" color="surface">
          Surface
        </Badge>
        <Badge icon="circle-check" color="white-destructive">
          White Destructive
        </Badge>
        <Badge icon="circle-check" color="surface-destructive">
          Surface Destructive
        </Badge>
      </div>
    </div>
  ),
};

export const WithStroke: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-lg">
        <Badge stroke color="gray">
          Gray
        </Badge>
        <Badge stroke color="blue">
          Blue
        </Badge>
        <Badge stroke color="green">
          Green
        </Badge>
        <Badge stroke color="orange">
          Orange
        </Badge>
        <Badge stroke color="red">
          Red
        </Badge>
        <Badge stroke color="purple">
          Purple
        </Badge>
        <Badge stroke color="white">
          White
        </Badge>
        <Badge stroke color="surface">
          Surface
        </Badge>
        <Badge stroke color="white-destructive">
          White Destructive
        </Badge>
        <Badge stroke color="surface-destructive">
          Surface Destructive
        </Badge>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-lg">
        <Badge
          disabled
          color="gray"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Gray
        </Badge>
        <Badge
          disabled
          color="blue"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Blue
        </Badge>
        <Badge
          disabled
          color="green"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Green
        </Badge>
        <Badge
          disabled
          color="orange"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Orange
        </Badge>
        <Badge
          disabled
          color="red"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Red
        </Badge>
        <Badge
          disabled
          color="purple"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Purple
        </Badge>
        <Badge
          disabled
          color="white"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          White
        </Badge>
        <Badge
          disabled
          color="surface"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Surface
        </Badge>
        <Badge
          disabled
          color="white-destructive"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          White Destructive
        </Badge>
        <Badge
          disabled
          color="surface-destructive"
          icon={{ icon: "lock", iconLibrary: "lucide" }}
        >
          Surface Destructive
        </Badge>
      </div>
    </div>
  ),
};

export const InlineInText: Story = {
  render: () => (
    <div className="w-full flex items-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-y-4">
        <p>
          This is a paragraph with an inline <Badge size="sm">badge</Badge> that
          flows naturally with the text.
        </p>
        <p>
          You can use badges inline like this{" "}
          <Badge color="blue" size="sm">
            blue badge
          </Badge>{" "}
          or this{" "}
          <Badge color="green" size="sm">
            green badge
          </Badge>{" "}
          to highlight important terms or statuses.
        </p>
        <p>
          Badges work well with icons too:{" "}
          <Badge
            icon={{ icon: "check", iconType: "solid" }}
            color="green"
            size="sm"
          >
            Verified
          </Badge>{" "}
          or{" "}
          <Badge
            icon={{ icon: "star", iconType: "solid" }}
            color="orange"
            size="sm"
          >
            Featured
          </Badge>
          .
        </p>
        <p>
          You can also use different sizes inline: <Badge size="xs">XS</Badge>,{" "}
          <Badge size="sm">SM</Badge>, <Badge size="md">MD</Badge>, and{" "}
          <Badge size="lg">LG</Badge> badges.
        </p>
      </div>
    </div>
  ),
};

export const InlineWithLongText: Story = {
  render: () => (
    <div className="w-full flex items-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-y-4">
        <p>
          When writing documentation or articles, you might want to highlight
          certain concepts inline. For example, you can mention that this
          feature requires{" "}
          <Badge color="orange" size="sm">
            Premium
          </Badge>{" "}
          subscription, or that this API endpoint returns{" "}
          <Badge color="green" size="sm">
            JSON
          </Badge>{" "}
          format. Badges help readers quickly identify important information
          without breaking the flow of reading.
        </p>
        <p>
          Status indicators work great inline too:{" "}
          <Badge
            icon={{ icon: "check-circle", iconType: "solid" }}
            color="green"
            size="sm"
          >
            Active
          </Badge>
          ,{" "}
          <Badge
            icon={{ icon: "clock", iconType: "solid" }}
            color="orange"
            size="sm"
          >
            Pending
          </Badge>
          , and{" "}
          <Badge
            icon={{ icon: "ban", iconType: "solid" }}
            color="red"
            size="sm"
          >
            Failed
          </Badge>
          .
        </p>
      </div>
    </div>
  ),
};

export const Combinations: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="space-x-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            icon={{ icon: "star", iconType: "solid" }}
            color="blue"
            size="lg"
            shape="pill"
          >
            Premium Feature
          </Badge>
          <Badge
            icon={{ icon: "check", iconType: "solid" }}
            color="green"
            stroke
          >
            Verified
          </Badge>
          <Badge
            icon={{ icon: "warning", iconType: "solid" }}
            color="orange"
            size="sm"
          >
            Beta
          </Badge>
          <Badge color="red" shape="pill" size="xs">
            New
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            icon={{ icon: "lock", iconType: "solid" }}
            color="surface"
            disabled
          >
            Locked
          </Badge>
          <Badge
            icon={{ icon: "heart", iconType: "solid" }}
            color="purple"
            size="md"
            shape="pill"
          >
            Favorite
          </Badge>
          <Badge color="white-destructive" stroke>
            Delete
          </Badge>
        </div>
      </div>
    </div>
  ),
};
