import type { Meta, StoryObj } from "@storybook/react-vite"
import { Columns } from "./columns"
import React from "react"

const meta: Meta<typeof Columns> = {
  title: "Components/Columns",
  component: Columns,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4],
    },
  },
}

export default meta
type Story = StoryObj<typeof Columns>

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div className="h-24 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm text-zinc-500">
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <Columns>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Columns>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <Columns cols={2}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </Columns>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <Columns cols={3}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Columns>
  ),
}

export const FourColumns: Story = {
  render: () => (
    <Columns cols={4}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </Columns>
  ),
}

export const SingleColumn: Story = {
  render: () => (
    <Columns cols={1}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Columns>
  ),
}

export const WithCustomClassName: Story = {
  render: () => (
    <Columns cols={2} className="gap-8">
      <Box>1</Box>
      <Box>2</Box>
    </Columns>
  ),
}
