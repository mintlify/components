import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout } from "./callout";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {},
};
