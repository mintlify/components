import type { Meta, StoryObj } from "@storybook/react-vite";
import { Color } from "./color";
import { COLOR_VARIANTS } from "./constants";

const meta: Meta<typeof Color> = {
  title: "Components/Color",
  component: Color,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...COLOR_VARIANTS],
      description: "The display variant of the color palette",
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Color>;

export const CompactVariant: Story = {
  args: { variant: "compact" },
  render: () => (
    <Color variant="compact">
      <Color.Item name="blue-500" value="#3B82F6" />
      <Color.Item name="purple-500" value="#8B5CF6" />
      <Color.Item name="green-500" value="#22C55E" />
      <Color.Item name="orange-500" value="#F97316" />
      <Color.Item name="red-500" value="#EF4444" />
      <Color.Item name="yellow-500" value="#EAB308" />
    </Color>
  ),
};

export const TableVariant: Story = {
  args: { variant: "table" },
  render: () => (
    <Color variant="table">
      <Color.Row title="Gray">
        <Color.Item name="gray-900" value="#18181B" />
        <Color.Item name="gray-700" value="#3F3F46" />
        <Color.Item name="gray-500" value="#71717A" />
        <Color.Item name="gray-300" value="#D4D4D8" />
        <Color.Item name="gray-100" value="#F4F4F5" />
      </Color.Row>
      <Color.Row title="Blue">
        <Color.Item name="blue-900" value="#1E3A8A" />
        <Color.Item name="blue-700" value="#1D4ED8" />
        <Color.Item name="blue-500" value="#3B82F6" />
        <Color.Item name="blue-300" value="#93C5FD" />
        <Color.Item name="blue-100" value="#DBEAFE" />
      </Color.Row>
      <Color.Row title="Green">
        <Color.Item name="green-900" value="#14532D" />
        <Color.Item name="green-700" value="#15803D" />
        <Color.Item name="green-500" value="#22C55E" />
        <Color.Item name="green-300" value="#86EFAC" />
        <Color.Item name="green-100" value="#DCFCE7" />
      </Color.Row>
    </Color>
  ),
};

export const ColorFormats: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Color variant="compact">
        <Color.Item name="hex" value="#3B82F6" />
        <Color.Item name="rgb" value="rgb(59, 130, 246)" />
        <Color.Item name="rgba" value="rgba(59, 130, 246, 0.5)" />
        <Color.Item name="hsl" value="hsl(217, 91%, 60%)" />
        <Color.Item name="oklch" value="oklch(62% 0.21 255)" />
      </Color>

      <Color variant="table">
        <Color.Row title="HEX">
          <Color.Item name="red" value="#EF4444" />
          <Color.Item name="green" value="#22C55E" />
          <Color.Item name="blue" value="#3B82F6" />
        </Color.Row>
        <Color.Row title="RGB">
          <Color.Item name="red" value="rgb(239, 68, 68)" />
          <Color.Item name="green" value="rgb(34, 197, 94)" />
          <Color.Item name="blue" value="rgb(59, 130, 246)" />
        </Color.Row>
        <Color.Row title="RGBA">
          <Color.Item name="red-50" value="rgba(239, 68, 68, 0.5)" />
          <Color.Item name="green-50" value="rgba(34, 197, 94, 0.5)" />
          <Color.Item name="blue-50" value="rgba(59, 130, 246, 0.5)" />
        </Color.Row>
        <Color.Row title="HSL">
          <Color.Item name="red" value="hsl(0, 84%, 60%)" />
          <Color.Item name="green" value="hsl(142, 71%, 45%)" />
          <Color.Item name="blue" value="hsl(217, 91%, 60%)" />
        </Color.Row>
        <Color.Row title="OKLCH">
          <Color.Item name="red" value="oklch(63% 0.26 29)" />
          <Color.Item name="green" value="oklch(72% 0.19 142)" />
          <Color.Item name="blue" value="oklch(62% 0.21 255)" />
        </Color.Row>
      </Color>
    </div>
  ),
};

export const ThemeAwareColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Color variant="compact">
        <Color.Item
          name="bg-primary"
          value={{ light: "#FFFFFF", dark: "#000000" }}
        />
        <Color.Item
          name="text-primary"
          value={{ light: "#111827", dark: "#F9FAFB" }}
        />
        <Color.Item
          name="border"
          value={{ light: "#E5E7EB", dark: "#3F3F46" }}
        />
        <Color.Item
          name="surface"
          value={{ light: "#F9FAFB", dark: "#18181B" }}
        />
      </Color>

      <Color variant="table">
        <Color.Row title="Background">
          <Color.Item
            name="bg-default"
            value={{ light: "#FFFFFF", dark: "#09090B" }}
          />
          <Color.Item
            name="bg-subtle"
            value={{ light: "#F4F4F5", dark: "#18181B" }}
          />
          <Color.Item
            name="bg-muted"
            value={{ light: "#E4E4E7", dark: "#27272A" }}
          />
        </Color.Row>
        <Color.Row title="Text">
          <Color.Item
            name="text-default"
            value={{ light: "#09090B", dark: "#FAFAFA" }}
          />
          <Color.Item
            name="text-muted"
            value={{ light: "#71717A", dark: "#A1A1AA" }}
          />
          <Color.Item
            name="text-subtle"
            value={{ light: "#A1A1AA", dark: "#71717A" }}
          />
        </Color.Row>
        <Color.Row title="Border">
          <Color.Item
            name="border-default"
            value={{ light: "#E4E4E7", dark: "#27272A" }}
          />
          <Color.Item
            name="border-muted"
            value={{ light: "#D4D4D8", dark: "#3F3F46" }}
          />
          <Color.Item
            name="border-subtle"
            value={{ light: "#F4F4F5", dark: "#18181B" }}
          />
        </Color.Row>
      </Color>
    </div>
  ),
};

export const WithoutNames: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Color variant="compact">
        <Color.Item value="#EF4444" />
        <Color.Item value="#F97316" />
        <Color.Item value="#EAB308" />
        <Color.Item value="#22C55E" />
        <Color.Item value="#3B82F6" />
        <Color.Item value="#8B5CF6" />
      </Color>

      <Color variant="table">
        <Color.Row>
          <Color.Item value="#EF4444" />
          <Color.Item value="#F97316" />
          <Color.Item value="#EAB308" />
          <Color.Item value="#22C55E" />
          <Color.Item value="#3B82F6" />
          <Color.Item value="#8B5CF6" />
        </Color.Row>
      </Color>
    </div>
  ),
};

export const LongColorNames: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Color variant="compact">
        <Color.Item
          name="very-long-color-name-that-will-truncate"
          value="#3B82F6"
        />
        <Color.Item name="another-extremely-long-name" value="#22C55E" />
        <Color.Item name="short" value="#EF4444" />
      </Color>

      <Color variant="table">
        <Color.Row title="Very Long Row Title That Should Truncate">
          <Color.Item name="color-1" value="#3B82F6" />
          <Color.Item name="color-2" value="#22C55E" />
          <Color.Item name="color-3" value="#EF4444" />
        </Color.Row>
        <Color.Row title="Short Title">
          <Color.Item name="color-1" value="#8B5CF6" />
          <Color.Item name="color-2" value="#F97316" />
        </Color.Row>
      </Color>
    </div>
  ),
};
