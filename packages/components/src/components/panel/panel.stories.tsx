import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {},
};
