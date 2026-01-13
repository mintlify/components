import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Icon } from "./icon";
import { MINTLIFY_ICONS_CDN_URL } from "@/constants";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconType: {
      control: "select",
      options: ["brands", "duotone", "light", "regular", "sharp-solid", "solid", "thin"],
    },
    iconLibrary: {
      control: "select",
      options: ["fontawesome", "lucide"],
    },
    pageType: {
      control: "select",
      options: ["pdf", undefined],
    },
    size: {
      control: { type: "range", min: 12, max: 64, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "cat",
    size: 24,
  },
};

// Icon Type Variants
export const Regular: Story = {
  args: {
    icon: "cat",
    iconType: "regular",
    size: 32,
  },
};

export const Solid: Story = {
  args: {
    icon: "cat",
    iconType: "solid",
    size: 32,
  },
};

export const Light: Story = {
  args: {
    icon: "cat",
    iconType: "light",
    size: 32,
  },
};

export const Thin: Story = {
  args: {
    icon: "cat",
    iconType: "thin",
    size: 32,
  },
};

export const Duotone: Story = {
  args: {
    icon: "cat",
    iconType: "duotone",
    size: 32,
  },
};

export const SharpSolid: Story = {
  args: {
    icon: "cat",
    iconType: "sharp-solid",
    size: 32,
  },
};

export const Brands: Story = {
  args: {
    icon: "github",
    iconType: "brands",
    size: 32,
  },
};

// Size Variants
export const Small: Story = {
  args: {
    icon: "cat",
    size: 16,
  },
};

export const Medium: Story = {
  args: {
    icon: "cat",
    size: 24,
  },
};

export const Large: Story = {
  args: {
    icon: "cat",
    size: 48,
  },
};

// Color Variants
export const CustomColor: Story = {
  args: {
    icon: "heart",
    size: 32,
    colorLight: "#ef4444",
    colorDark: "#fca5a5",
  },
};

export const NoColor: Story = {
  args: {
    icon: "cat",
    size: 32,
  },
};

export const WithOverrideColor: Story = {
  render: () => (
    <div
      style={
        {
          backgroundColor: "#e3eafd",
          padding: "16px",
          borderRadius: "8px",
          // Using CSS custom property like Badge does
          "--color-text": "#133a9a",
        } as React.CSSProperties
      }
      className="[&_svg]:bg-[--color-text]"
    >
      <Icon
        icon="cat"
        size={32}
        overrideColor={true}
      />
    </div>
  ),
};

// Icon Library Variants
export const FontAwesome: Story = {
  args: {
    icon: "cat",
    iconLibrary: "fontawesome",
    size: 32,
  },
};

export const Lucide: Story = {
  args: {
    icon: "cat",
    iconLibrary: "lucide",
    size: 32,
  },
};

// Relative Path Icon (with basePath)
export const RelativePath: Story = {
  args: {
    icon: "/cat.svg",
    size: 32,
    basePath: "/src/components/icon",
  },
  parameters: {
    docs: {
      description: {
        story: "Icons loaded from relative paths render as `<img>` elements and do not support dynamic color changes in light/dark mode.",
      },
    },
  },
};

export const MintlifyCDN: Story = {
  args: {
    icon: `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/regular/check.svg`,
    size: 32,
  },
};

// PDF PageType
export const PDFMode: Story = {
  args: {
    icon: "cat",
    pageType: "pdf",
    size: 32,
  },
  parameters: {
    docs: {
      description: {
        story: "PDF mode renders icons as `<img>` elements for PDF compatibility. Dynamic coloring via SVG masks is not available in this mode.",
      },
    },
  },
};

export const PDFModeWithColor: Story = {
  args: {
    icon: "cat",
    pageType: "pdf",
    size: 32,
    colorLight: "#3b82f6",
    colorDark: "#93c5fd",
  },
  parameters: {
    docs: {
      description: {
        story: "PDF mode with color props. Note: Renders as `<img>` element, so colorLight/colorDark props won't affect the display in PDF mode.",
      },
    },
  },
};

// With Custom ClassName
export const WithClassName: Story = {
  args: {
    icon: "cat",
    size: 32,
    className: "opacity-50 hover:opacity-100 transition-opacity",
  },
};

// Multiple Icons Showcase (with custom colors to demonstrate variety)
export const MultipleIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon icon="cat" size={24} colorLight="#fbbf24" colorDark="#fde047" />
      <Icon icon="heart" size={24} colorLight="#ef4444" colorDark="#fca5a5" />
      <Icon icon="circle-check" size={24} colorLight="#22c55e" colorDark="#86efac" />
      <Icon icon="bolt" size={24} colorLight="#3b82f6" colorDark="#93c5fd" />
      <Icon icon="fire" size={24} colorLight="#f97316" colorDark="#fdba74" />
    </div>
  ),
};
