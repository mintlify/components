import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApiField } from "./apiField";

const meta: Meta<typeof ApiField> = {
    title: "Components/ApiField",
    component: ApiField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApiField>;

export const Default: Story = {
    args: {},
};
