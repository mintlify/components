import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequestExample } from "./requestExample";

const meta: Meta<typeof RequestExample> = {
  title: "Components/RequestExample",
  component: RequestExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RequestExample>;

export const Default: Story = {
  args: {},
};
