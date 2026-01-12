import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {},
};
