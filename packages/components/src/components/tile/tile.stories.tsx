import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tile } from "./tile";
import { Zap, Heart, Package, Star, Rocket, Code, FileText, Globe, Shield } from "lucide-react";

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tile>;

// Basic Variants
export const Default: Story = {
  args: {
    title: "Integration",
    description: "Connect your services",
    children: <Package className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

export const WithTitleOnly: Story = {
  args: {
    title: "Getting Started",
    children: <Rocket className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    description: "A brief description of this tile",
    children: <FileText className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

export const ContentOnly: Story = {
  args: {
    children: <Star className="w-16 h-16 text-yellow-500" />,
  },
};

// Link Variants
export const AsInternalLink: Story = {
  args: {
    title: "Documentation",
    description: "Read our docs",
    href: "/docs",
    children: <FileText className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

export const AsExternalLink: Story = {
  args: {
    title: "GitHub",
    description: "View source code",
    href: "https://github.com",
    children: <Code className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

// Content Type Variants
export const WithSVGIcon: Story = {
  args: {
    title: "Features",
    description: "Explore capabilities",
    children: <Zap className="w-12 h-12 text-blue-500" />,
  },
};

export const WithImage: Story = {
  args: {
    title: "Company Logo",
    description: "Partner integration",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=100&h=100&fit=crop"
        alt="Example logo"
        className="w-16 h-16 rounded-lg object-cover"
      />
    ),
  },
};

export const WithColoredIcon: Story = {
  args: {
    title: "Favorites",
    description: "Your liked items",
    children: <Heart className="w-12 h-12 text-red-500 fill-red-500" />,
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "Status",
    description: "System health",
    children: (
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
        <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
    ),
  },
};

// Text Handling
export const LongTitle: Story = {
  args: {
    title: "This is a very long title that should be truncated when it exceeds the container width",
    description: "Short description",
    children: <Globe className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

export const LongDescription: Story = {
  args: {
    title: "Normal Title",
    description: "This is a much longer description that demonstrates how the component handles text overflow with truncation",
    children: <Globe className="w-12 h-12 text-gray-600 dark:text-gray-400" />,
  },
};

// Custom Styling
export const WithCustomClassName: Story = {
  args: {
    title: "Custom Styles",
    description: "With extra styling",
    className: "shadow-lg",
    children: <Star className="w-12 h-12 text-yellow-500" />,
  },
};

// Grid Layout Examples
export const TileGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 200px)", gap: "16px" }}>
      <Tile title="React" description="UI Library" href="/docs/react">
        <Code className="w-12 h-12 text-blue-500" />
      </Tile>
      <Tile title="TypeScript" description="Type Safety" href="/docs/typescript">
        <FileText className="w-12 h-12 text-blue-700" />
      </Tile>
      <Tile title="Node.js" description="Runtime" href="/docs/nodejs">
        <Globe className="w-12 h-12 text-green-600" />
      </Tile>
      <Tile title="GraphQL" description="Query Language" href="/docs/graphql">
        <Zap className="w-12 h-12 text-pink-500" />
      </Tile>
      <Tile title="Docker" description="Containers" href="/docs/docker">
        <Package className="w-12 h-12 text-blue-400" />
      </Tile>
      <Tile title="AWS" description="Cloud Services" href="https://aws.amazon.com">
        <Rocket className="w-12 h-12 text-orange-500" />
      </Tile>
    </div>
  ),
};

export const TwoColumnGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)", gap: "16px" }}>
      <Tile title="Quick Start" href="/quickstart">
        <Rocket className="w-12 h-12 text-indigo-500" />
      </Tile>
      <Tile title="API Reference" href="/api">
        <Code className="w-12 h-12 text-gray-600 dark:text-gray-400" />
      </Tile>
      <Tile title="Examples" href="/examples">
        <FileText className="w-12 h-12 text-gray-600 dark:text-gray-400" />
      </Tile>
      <Tile title="Community" href="https://discord.gg/example">
        <Heart className="w-12 h-12 text-red-500" />
      </Tile>
    </div>
  ),
};

// Custom Link Component Example
export const WithCustomLinkComponent: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    // Mock Next.js Link component for demonstration
    const NextLink = ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
      <a href={href} {...props}>
        {children}
      </a>
    );

    return (
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ width: "200px" }}>
          <Tile
            title="Using Custom Link"
            description="With Next.js Link"
            href="/custom-route"
            as={NextLink}
          >
            <Package className="w-12 h-12 text-gray-600 dark:text-gray-400" />
          </Tile>
        </div>
        <div style={{ width: "200px" }}>
          <Tile
            title="Standard Link"
            description="With native anchor"
            href="/standard-route"
          >
            <Globe className="w-12 h-12 text-gray-600 dark:text-gray-400" />
          </Tile>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use the `as` prop to pass a custom Link component (e.g., Next.js Link, React Router Link). The component will receive all standard link props including `href`.",
      },
    },
  },
};

// Dark Mode Preview (relies on Storybook dark mode addon)
export const DarkModePreview: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    title: "Dark Mode",
    description: "Optimized for dark themes",
    children: <Star className="w-12 h-12 text-yellow-400" />,
  },
};

// Logo Showcase Example
export const LogoShowcase: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 150px)", gap: "12px" }}>
      <Tile title="Stripe" href="https://stripe.com">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </Tile>
      <Tile title="Vercel" href="https://vercel.com">
        <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-lg">V</span>
        </div>
      </Tile>
      <Tile title="GitHub" href="https://github.com">
        <div className="w-10 h-10 bg-gray-800 dark:bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-white dark:text-gray-800 font-bold text-lg">G</span>
        </div>
      </Tile>
      <Tile title="Slack" href="https://slack.com">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">#</span>
        </div>
      </Tile>
    </div>
  ),
};
