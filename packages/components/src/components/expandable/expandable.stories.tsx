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
  args: {},
};
