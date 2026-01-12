import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParamField } from "./paramField";

const meta: Meta<typeof ParamField> = {
  title: "Components/ParamField",
  component: ParamField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ParamField>;

export const Default: Story = {
  args: {},
};
