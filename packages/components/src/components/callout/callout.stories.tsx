import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout, Info, Warning, Note, Tip, Check, Danger } from "./callout";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "note", "tip", "check", "danger", "custom"],
      description: "Predefined callout variant",
    },
    icon: {
      control: "text",
      description: "Icon name or custom React node (for custom variant)",
    },
    iconType: {
      control: "select",
      options: ["solid", "regular", "brands", "duotone", "light", "thin"],
      description: "Icon type for FontAwesome icons (for custom variant)",
    },
    color: {
      control: "color",
      description: "Custom color for the callout (for custom variant)",
    },
    ariaLabel: {
      control: "text",
      description: "Aria label for the icon (for accessibility)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the callout",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

// Variant-based stories (NEW API)
export const InfoVariant: Story = {
  args: {
    variant: "info",
    children: <p>This is an informational callout using the variant prop.</p>,
  },
};

export const WarningVariant: Story = {
  args: {
    variant: "warning",
    children: <p>This is a warning callout using the variant prop.</p>,
  },
};

export const NoteVariant: Story = {
  args: {
    variant: "note",
    children: <p>This is a note callout using the variant prop.</p>,
  },
};

export const TipVariant: Story = {
  args: {
    variant: "tip",
    children: <p>This is a tip callout using the variant prop.</p>,
  },
};

export const CheckVariant: Story = {
  args: {
    variant: "check",
    children: <p>This is a success/check callout using the variant prop.</p>,
  },
};

export const DangerVariant: Story = {
  args: {
    variant: "danger",
    children: <p>This is a danger callout using the variant prop.</p>,
  },
};

export const CustomVariantDefault: Story = {
  args: {
    variant: "custom",
    children: <p>This is a custom callout with default styling (no icon or color).</p>,
  },
};

export const CustomVariantWithColor: Story = {
  args: {
    variant: "custom",
    color: "#9333ea",
    children: <p>This is a custom callout with a purple color.</p>,
  },
};

export const CustomVariantWithIcon: Story = {
  args: {
    variant: "custom",
    icon: "cat",
    iconType: "solid",
    iconLibrary: "lucide",
    color: "#3b82f6",
    children: <p>This is a custom callout with a cat icon and blue color.</p>,
  },
};

// Variant with aria label
export const InfoVariantWithAriaLabel: Story = {
  args: {
    variant: "info",
    ariaLabel: "معلومات",
    children: <p>This info callout has a custom aria label (Arabic "Information").</p>,
  },
};

// Variant with custom className
export const InfoVariantWithClassName: Story = {
  args: {
    variant: "info",
    className: "shadow-lg",
    children: <p>This callout has additional custom classes applied.</p>,
  },
};

// All Variants Together
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
      <Callout variant="info">
        <p><strong>Info:</strong> This is an informational callout.</p>
      </Callout>
      <Callout variant="warning">
        <p><strong>Warning:</strong> This is a warning callout.</p>
      </Callout>
      <Callout variant="note">
        <p><strong>Note:</strong> This is a note callout.</p>
      </Callout>
      <Callout variant="tip">
        <p><strong>Tip:</strong> This is a tip callout.</p>
      </Callout>
      <Callout variant="check">
        <p><strong>Check:</strong> This is a success callout.</p>
      </Callout>
      <Callout variant="danger">
        <p><strong>Danger:</strong> This is a danger callout.</p>
      </Callout>
      <Callout variant="custom" icon="star" iconType="solid" color="#f59e0b">
        <p><strong>Custom:</strong> This is a custom callout with a star icon.</p>
      </Callout>
    </div>
  ),
};

// Complex content examples
export const InfoWithMultipleElements: Story = {
  args: {
    variant: "info",
    children: (
      <>
        <p><strong>Important information:</strong></p>
        <p>This callout can contain multiple paragraphs and formatted text.</p>
        <ul>
          <li>It supports lists</li>
          <li>And other HTML elements</li>
          <li>With proper styling</li>
        </ul>
      </>
    ),
  },
};

export const CustomWithMultipleElements: Story = {
  args: {
    variant: "custom",
    icon: "cat",
    color: "#FF00FF",
    children: (
      <>
        <p><strong>Important information:</strong></p>
        <p>This callout can contain multiple paragraphs and formatted text.</p>
        <ul>
          <li>It supports lists</li>
          <li>And other HTML elements</li>
          <li>With proper styling</li>
        </ul>
      </>
    ),
  },
};

export const NoteWithLink: Story = {
  args: {
    variant: "note",
    children: (
      <p>For more details, see the <a href="#documentation">documentation</a>.</p>
    ),
  },
};

export const TipWithSteps: Story = {
  args: {
    variant: "tip",
    children: (
      <>
        <p><strong>Pro tip:</strong> Follow these steps:</p>
        <ol>
          <li>First, read the documentation</li>
          <li>Then, try the example</li>
          <li>Finally, build your own implementation</li>
        </ol>
      </>
    ),
  },
};

// Backward Compatibility - Component exports (OLD API)
export const BackwardCompatibilityInfo: Story = {
  render: () => (
    <Info>
      <p>The old component API still works for backward compatibility.</p>
    </Info>
  ),
};

export const BackwardCompatibilityWarning: Story = {
  render: () => (
    <Warning>
      <p>You can still use the old named components like Warning, Info, etc.</p>
    </Warning>
  ),
};

export const BackwardCompatibilityAllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
      <Info>
        <p><strong>Info component</strong> (backward compatible)</p>
      </Info>
      <Warning>
        <p><strong>Warning component</strong> (backward compatible)</p>
      </Warning>
      <Note>
        <p><strong>Note component</strong> (backward compatible)</p>
      </Note>
      <Tip>
        <p><strong>Tip component</strong> (backward compatible)</p>
      </Tip>
      <Check>
        <p><strong>Check component</strong> (backward compatible)</p>
      </Check>
      <Danger>
        <p><strong>Danger component</strong> (backward compatible)</p>
      </Danger>
    </div>
  ),
};
