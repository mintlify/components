import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "./banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {},
};
