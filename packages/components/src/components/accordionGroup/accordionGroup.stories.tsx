import type { Meta, StoryObj } from "@storybook/react-vite";
import { AccordionGroup } from "./accordionGroup";

const meta: Meta<typeof AccordionGroup> = {
  title: "Components/AccordionGroup",
  component: AccordionGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccordionGroup>;

export const Default: Story = {
  args: {},
};
