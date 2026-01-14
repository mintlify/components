import type { Meta, StoryObj } from "@storybook/react-vite";
import { Color } from "./color";

const meta: Meta<typeof Color> = {
  title: "Components/Color",
  component: Color,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["compact", "table"],
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Color>;

export const Default: Story = {
  args: {
    variant: "compact",
    theme: "light",
  },
  render: (args) => (
    <Color {...args}>
      <Color.Item value="#FF5733" name="Sunset Orange" />
      <Color.Item value="#3498DB" name="Ocean Blue" />
      <Color.Item value="#2ECC71" name="Emerald Green" />
    </Color>
  ),
};

export const CompactVariant: Story = {
  render: () => (
    <Color variant="compact">
      <Color.Item value="#FF5733" name="Sunset Orange" />
      <Color.Item value="#3498DB" name="Ocean Blue" />
      <Color.Item value="#2ECC71" name="Emerald Green" />
      <Color.Item value="#9B59B6" name="Amethyst Purple" />
      <Color.Item value="#F39C12" name="Sunflower Yellow" />
    </Color>
  ),
};

export const TableVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <Color variant="table">
        <Color.Row title="Primary">
          <Color.Item value="#3498DB" />
          <Color.Item value="#2980B9" />
          <Color.Item value="#1ABC9C" />
          <Color.Item value="#16A085" />
        </Color.Row>
        <Color.Row title="Secondary">
          <Color.Item value="#9B59B6" />
          <Color.Item value="#8E44AD" />
          <Color.Item value="#E74C3C" />
          <Color.Item value="#C0392B" />
        </Color.Row>
        <Color.Row title="Neutral">
          <Color.Item value="#ECF0F1" />
          <Color.Item value="#BDC3C7" />
          <Color.Item value="#95A5A6" />
          <Color.Item value="#7F8C8D" />
        </Color.Row>
      </Color>
    </div>
  ),
};

export const WithLightDarkValues: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Light Theme
        </h3>
        <Color variant="compact" theme="light">
          <Color.Item
            value={{ light: "#FFFFFF", dark: "#1A1A1A" }}
            name="Background"
          />
          <Color.Item
            value={{ light: "#1A1A1A", dark: "#FFFFFF" }}
            name="Foreground"
          />
          <Color.Item
            value={{ light: "#3498DB", dark: "#5DADE2" }}
            name="Primary"
          />
        </Color>
      </div>
      <div className="dark bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Dark Theme</h3>
        <Color variant="compact" theme="dark">
          <Color.Item
            value={{ light: "#FFFFFF", dark: "#1A1A1A" }}
            name="Background"
          />
          <Color.Item
            value={{ light: "#1A1A1A", dark: "#FFFFFF" }}
            name="Foreground"
          />
          <Color.Item
            value={{ light: "#3498DB", dark: "#5DADE2" }}
            name="Primary"
          />
        </Color>
      </div>
    </div>
  ),
};

export const TableWithLightDarkValues: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="w-[400px]">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Light Theme
        </h3>
        <Color variant="table" theme="light">
          <Color.Row title="Surface">
            <Color.Item value={{ light: "#FFFFFF", dark: "#1A1A1A" }} />
            <Color.Item value={{ light: "#F5F5F5", dark: "#262626" }} />
            <Color.Item value={{ light: "#E5E5E5", dark: "#404040" }} />
          </Color.Row>
          <Color.Row title="Text">
            <Color.Item value={{ light: "#1A1A1A", dark: "#FFFFFF" }} />
            <Color.Item value={{ light: "#525252", dark: "#D4D4D4" }} />
            <Color.Item value={{ light: "#A3A3A3", dark: "#737373" }} />
          </Color.Row>
        </Color>
      </div>
      <div className="w-[400px] dark bg-gray-900 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Dark Theme</h3>
        <Color variant="table" theme="dark">
          <Color.Row title="Surface">
            <Color.Item value={{ light: "#FFFFFF", dark: "#1A1A1A" }} />
            <Color.Item value={{ light: "#F5F5F5", dark: "#262626" }} />
            <Color.Item value={{ light: "#E5E5E5", dark: "#404040" }} />
          </Color.Row>
          <Color.Row title="Text">
            <Color.Item value={{ light: "#1A1A1A", dark: "#FFFFFF" }} />
            <Color.Item value={{ light: "#525252", dark: "#D4D4D4" }} />
            <Color.Item value={{ light: "#A3A3A3", dark: "#737373" }} />
          </Color.Row>
        </Color>
      </div>
    </div>
  ),
};

export const WithoutNames: Story = {
  render: () => (
    <Color variant="compact">
      <Color.Item value="#FF5733" />
      <Color.Item value="#3498DB" />
      <Color.Item value="#2ECC71" />
      <Color.Item value="#9B59B6" />
    </Color>
  ),
};

export const SingleColor: Story = {
  render: () => (
    <Color variant="compact">
      <Color.Item value="#3498DB" name="Brand Blue" />
    </Color>
  ),
};

export const BrandPalette: Story = {
  render: () => (
    <div className="w-[500px]">
      <Color variant="table">
        <Color.Row title="Blue">
          <Color.Item value="#E3F2FD" />
          <Color.Item value="#90CAF9" />
          <Color.Item value="#42A5F5" />
          <Color.Item value="#1E88E5" />
          <Color.Item value="#1565C0" />
          <Color.Item value="#0D47A1" />
        </Color.Row>
        <Color.Row title="Green">
          <Color.Item value="#E8F5E9" />
          <Color.Item value="#A5D6A7" />
          <Color.Item value="#66BB6A" />
          <Color.Item value="#43A047" />
          <Color.Item value="#2E7D32" />
          <Color.Item value="#1B5E20" />
        </Color.Row>
        <Color.Row title="Red">
          <Color.Item value="#FFEBEE" />
          <Color.Item value="#EF9A9A" />
          <Color.Item value="#EF5350" />
          <Color.Item value="#E53935" />
          <Color.Item value="#C62828" />
          <Color.Item value="#B71C1C" />
        </Color.Row>
        <Color.Row title="Gray">
          <Color.Item value="#FAFAFA" />
          <Color.Item value="#E0E0E0" />
          <Color.Item value="#9E9E9E" />
          <Color.Item value="#616161" />
          <Color.Item value="#424242" />
          <Color.Item value="#212121" />
        </Color.Row>
      </Color>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          With Custom className on Root
        </h3>
        <Color variant="compact" className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Color.Item value="#FF5733" name="Orange" />
          <Color.Item value="#3498DB" name="Blue" />
          <Color.Item value="#2ECC71" name="Green" />
        </Color>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          With Custom className on Items
        </h3>
        <Color variant="compact">
          <Color.Item value="#FF5733" name="Orange" className="scale-110" />
          <Color.Item value="#3498DB" name="Blue" className="opacity-75" />
          <Color.Item value="#2ECC71" name="Green" className="shadow-lg" />
        </Color>
      </div>
    </div>
  ),
};

export const RGBAndHSLValues: Story = {
  render: () => (
    <Color variant="compact">
      <Color.Item value="rgb(255, 87, 51)" name="RGB Orange" />
      <Color.Item value="hsl(204, 70%, 53%)" name="HSL Blue" />
      <Color.Item value="rgba(46, 204, 113, 0.8)" name="RGBA Green" />
      <Color.Item value="hsla(283, 39%, 53%, 0.9)" name="HSLA Purple" />
    </Color>
  ),
};
