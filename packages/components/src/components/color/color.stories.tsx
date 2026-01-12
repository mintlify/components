import type { Meta, StoryObj } from "@storybook/react-vite";
import { Color } from "./color";

const meta: Meta<typeof Color> = {
  title: "Components/Color",
  component: Color,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Color>;

export const Default: Story = {
  args: {},
};
