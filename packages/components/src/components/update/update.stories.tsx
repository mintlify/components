import type { Meta, StoryObj } from "@storybook/react-vite";
import { Update } from "./update";

const meta: Meta<typeof Update> = {
  title: "Components/Update",
  component: Update,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Update>;

export const Default: Story = {
  args: {},
};
