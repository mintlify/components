import type { Meta, StoryObj } from "@storybook/react-vite";
import { Columns } from "./columns";

const meta: Meta<typeof Columns> = {
  title: "Components/Columns",
  component: Columns,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Columns>;

export const Default: Story = {
  args: {},
};
