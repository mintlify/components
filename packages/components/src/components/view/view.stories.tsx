import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "./view";

const meta: Meta<typeof View> = {
  title: "Components/View",
  component: View,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof View>;

export const Default: Story = {
  args: {},
};
