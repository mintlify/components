import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mermaid } from "./mermaid";

const meta: Meta<typeof Mermaid> = {
  title: "Components/Mermaid",
  component: Mermaid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Mermaid>;

export const Default: Story = {
  args: {},
};
