import type { Meta, StoryObj } from "@storybook/react-vite";
import { Property } from "./property";

const meta: Meta<typeof Property> = {
    title: "Components/Property",
    component: Property,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Property>;

export const Default: Story = {
    args: {},
};
