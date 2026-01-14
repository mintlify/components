import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeGroup } from "./codeGroup";

const meta: Meta<typeof CodeGroup> = {
  title: "Components/CodeGroup",
  component: CodeGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeGroup>;

export const Default: Story = {
  args: {},
};
