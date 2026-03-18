import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { Columns } from "./columns";
import { COL_OPTIONS } from "./constants";

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex h-24 items-center justify-center rounded-lg bg-stone-200 font-medium text-sm text-stone-500 dark:bg-stone-800">
    {children}
  </div>
);

const sixItems = (
  <>
    <Box>1</Box>
    <Box>2</Box>
    <Box>3</Box>
    <Box>4</Box>
    <Box>5</Box>
    <Box>6</Box>
  </>
);

const meta: Meta<typeof Columns> = {
  title: "Components/Columns",
  component: Columns,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    children: sixItems,
  },
  argTypes: {
    cols: {
      control: "select",
      options: [...COL_OPTIONS],
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Columns>;

export const Default: Story = {};

export const SingleColumn: Story = {
  args: { cols: 1 },
};

export const TwoColumns: Story = {
  args: { cols: 2 },
};

export const ThreeColumns: Story = {
  args: { cols: 3 },
};

export const FourColumns: Story = {
  args: { cols: 4 },
};

/**
 * When placed inside a container query context, columns respond to the
 * container width instead of the viewport width.
 */
export const InsideContainer: StoryObj = {
  render: () => (
    <div style={{ containerType: "inline-size" }}>
      <Columns cols={3}>{sixItems}</Columns>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    cols: 2,
    className: "gap-8",
  },
};
