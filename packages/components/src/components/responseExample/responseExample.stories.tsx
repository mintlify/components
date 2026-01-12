import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponseExample } from "./responseExample";

const meta: Meta<typeof ResponseExample> = {
  title: "Components/ResponseExample",
  component: ResponseExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResponseExample>;

export const Default: Story = {
  args: {},
};
