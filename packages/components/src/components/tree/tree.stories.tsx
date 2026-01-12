import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree } from "./tree";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Default: Story = {
  args: {},
};
