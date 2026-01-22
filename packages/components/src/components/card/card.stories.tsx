import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, Package, Zap } from "lucide-react";
import type React from "react";
import { MINTLIFY_ICONS_CDN_URL } from "@/constants";
import { Card } from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconType: {
      control: "select",
      options: [
        "brands",
        "duotone",
        "light",
        "regular",
        "sharp-solid",
        "solid",
        "thin",
      ],
    },
    iconLibrary: {
      control: "select",
      options: ["fontawesome", "lucide"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Variants
export const Default: Story = {
  args: {
    title: "Default Card",
    children: "This is a basic card with just a title and content.",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Card with Icon",
    icon: "cat",
    children: "This card includes an icon from the icon library.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Card with Custom Icon",
    icon: <Zap />,
    children: "This card uses a custom React component as the icon.",
  },
};

export const WithImageIcon: Story = {
  args: {
    title: "Card with Image Icon",
    icon: `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/regular/cat.svg`,
    children: "This card uses an image URL as the icon.",
  },
};

export const WithColor: Story = {
  args: {
    title: "Card with Colored Icon",
    icon: "heart",
    color: "#ef4444",
    children: "This card has a custom colored icon.",
  },
};

// Icon Type Variants
export const IconTypeRegular: Story = {
  args: {
    title: "Regular Icon",
    icon: "cat",
    iconType: "regular",
    children: "Card with regular icon type.",
  },
};

export const IconTypeSolid: Story = {
  args: {
    title: "Solid Icon",
    icon: "cat",
    iconType: "solid",
    children: "Card with solid icon type.",
  },
};

export const IconTypeLight: Story = {
  args: {
    title: "Light Icon",
    icon: "cat",
    iconType: "light",
    children: "Card with light icon type.",
  },
};

// Layout Variants
export const Horizontal: Story = {
  args: {
    title: "Horizontal Card",
    icon: "bolt",
    horizontal: true,
    children: "This card displays content in a horizontal layout.",
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Header Image",
    img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=60",
    children: "This card includes a header image above the content.",
  },
};

export const WithImageAndIcon: Story = {
  args: {
    title: "Complete Card",
    img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=60",
    icon: "bolt",
    children: "This card has both a header image and an icon.",
  },
};

// Link Variants
export const AsLink: Story = {
  args: {
    title: "Clickable Card",
    icon: "cat",
    href: "/docs/getting-started",
    children: "This card is a link. Click it to navigate (in a real app).",
  },
};

export const ExternalLink: Story = {
  args: {
    title: "External Link Card",
    icon: "bolt",
    href: "https://example.com",
    children: "This card links to an external site. Notice the arrow icon.",
  },
};

export const ExternalLinkNoArrow: Story = {
  args: {
    title: "External Link Without Arrow",
    icon: "heart",
    href: "https://example.com",
    arrow: false,
    children: "This external link card has the arrow icon disabled.",
  },
};

export const InternalLinkWithArrow: Story = {
  args: {
    title: "Internal Link with Arrow",
    icon: "fire",
    href: "/docs",
    arrow: true,
    children: "This internal link card has the arrow icon explicitly enabled.",
  },
};

// CTA Variants
export const WithCTA: Story = {
  args: {
    title: "Card with Call to Action",
    icon: "bolt",
    cta: "Learn more",
    children: "This card includes a call-to-action button at the bottom.",
  },
};

export const WithCTAAndLink: Story = {
  args: {
    title: "CTA Card as Link",
    icon: "cat",
    href: "/docs/guide",
    cta: "Read the guide",
    children: "This card is both clickable and has a visible CTA.",
  },
};

// State Variants
export const Disabled: Story = {
  args: {
    title: "Disabled Card",
    icon: "heart",
    href: "/some-page",
    cta: "Try to click",
    disabled: true,
    children: "This card is disabled and cannot be clicked.",
  },
};

// Complex Examples
export const FullyFeatured: Story = {
  args: {
    title: "Premium Feature",
    icon: "fire",
    color: "#f59e0b",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    href: "/premium",
    cta: "Upgrade now",
    arrow: true,
    children: "Get access to all premium features with our upgraded plan.",
  },
};

export const HorizontalWithLink: Story = {
  args: {
    title: "Quick Start Guide",
    icon: <Package />,
    horizontal: true,
    href: "/docs/quickstart",
    children: "Get up and running in minutes with our quick start guide.",
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}
    >
      <Card href="/docs" icon="cat" title="Documentation">
        Read our comprehensive documentation.
      </Card>
      <Card href="/api" icon="bolt" title="API Reference">
        Explore the API reference.
      </Card>
      <Card
        href="https://github.com"
        icon="github"
        iconType="brands"
        title="GitHub"
      >
        View the source code on GitHub.
      </Card>
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        maxWidth: "800px",
      }}
    >
      <Card cta="Begin" href="/start" icon={<Zap />} title="Getting Started">
        Start building with our platform.
      </Card>
      <Card cta="Explore" href="/features" icon="fire" title="Features">
        Discover all the powerful features.
      </Card>
      <Card cta="Join" href="/community" icon={<Heart />} title="Community">
        Join our growing community.
      </Card>
      <Card cta="Get Help" href="/support" icon="circle-check" title="Support">
        Get help when you need it.
      </Card>
    </div>
  ),
};

// Custom ClassName Example
export const WithCustomClassName: Story = {
  args: {
    title: "Card with Custom Styles",
    icon: "heart",
    className: "shadow-lg border-4 border-blue-500",
    children: "This card has custom styling applied via the className prop.",
  },
};

// Custom Link Component Example
export const WithCustomLinkComponent: Story = {
  render: () => {
    // Mock Next.js Link component for demonstration
    const NextLink = ({
      href,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"a">) => (
      <a href={href} {...props}>
        {children}
      </a>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <Card
          as={NextLink}
          href="/custom-route"
          icon="bolt"
          title="Using Custom Link Component"
        >
          This card uses a custom Link component (like Next.js Link) via the
          &quot;as&quot; prop.
        </Card>
        <Card href="/standard-route" icon="cat" title="Standard Link">
          This card uses the standard &lt;a&gt; tag for comparison.
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the `as` prop to pass a custom Link component (e.g., Next.js Link, React Router Link). The component will receive all standard link props including `href`.",
      },
    },
  },
};
