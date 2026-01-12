import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./steps";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {},
};
