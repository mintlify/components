import type { Meta, StoryObj } from "@storybook/react-vite"
import { Columns } from "./columns"
import { COL_OPTIONS } from "./constants"
import React from "react"

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div className="h-24 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm text-zinc-500">
    {children}
  </div>
)

const meta: Meta<typeof Columns> = {
  title: "Components/Columns",
  component: Columns,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
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
}

export default meta
type Story = StoryObj<typeof Columns>

export const Default: Story = {}

export const SingleColumn: Story = {
  args: { cols: 1 },
}

export const TwoColumns: Story = {
  args: { cols: 2 },
}

export const ThreeColumns: Story = {
  args: { cols: 3 },
}

export const FourColumns: Story = {
  args: { cols: 4 },
}

export const WithCustomClassName: Story = {
  args: {
    cols: 2,
    className: "gap-8",
  },
}
