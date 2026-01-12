import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tile } from "./tile";

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const Default: Story = {
  args: {},
};
