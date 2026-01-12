import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponseField } from "./responseField";

const meta: Meta<typeof ResponseField> = {
  title: "Components/ResponseField",
  component: ResponseField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResponseField>;

export const Default: Story = {
  args: {},
};
