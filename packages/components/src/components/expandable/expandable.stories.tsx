import type { Meta, StoryObj } from "@storybook/react-vite";
import { Expandable } from "./expandable";

const meta: Meta<typeof Expandable> = {
  title: "Components/Expandable",
  component: Expandable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Expandable>;

export const Default: Story = {
  args: {
    title: "details",
    children: (
      <div className="py-4">
        <p>This is the expandable content that appears when opened.</p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "details",
    defaultOpen: true,
    children: (
      <div className="py-4">
        <p>This expandable starts in the open state.</p>
      </div>
    ),
  },
};
