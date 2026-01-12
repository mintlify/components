import type { Meta, StoryObj } from "@storybook/react-vite";
import { Frame } from "./frame";

const meta: Meta<typeof Frame> = {
  title: "Components/Frame",
  component: Frame,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Default: Story = {
  args: {},
};
