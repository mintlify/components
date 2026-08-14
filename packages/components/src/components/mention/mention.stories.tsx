import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mention } from "./mention";

const meta: Meta<typeof Mention> = {
  title: "Components/Mention",
  component: Mention,
  parameters: {
    layout: "centered",
  },
  // Wrap all stories in text-xs so existing story appearances are preserved now
  // that the component inherits font-size from context rather than hardcoding it.
  decorators: [
    (Story) => (
      <div className="text-xs">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The display label shown inside the mention pill.",
    },
    path: {
      control: "text",
      description:
        "Page path for a **page mention**. When set, the component renders as an `<a>` link and shows the page icon by default. Use either `path` or `user`, not both.",
    },
    user: {
      control: "text",
      description:
        "Username or identifier for a **user mention**. When set, the component shows the person icon by default. Use either `path` or `user`, not both.",
    },
    icon: {
      control: "text",
      description:
        "Optional icon override. Accepts a **FontAwesome or Lucide icon name** (e.g. `plane`, `bed`, `circle-check`), an **image URL** rendered as a circular avatar, or any **React node** for fully custom icon content. Omit to use the default page or person icon.",
    },
    color: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "feature", "error"],
      description: "Color variant. Defaults to `neutral`.",
    },
    iconType: {
      control: "select",
      options: [
        "regular",
        "solid",
        "light",
        "duotone",
        "thin",
        "brands",
        "sharp-solid",
        "sharp-light",
        "sharp-regular",
        "sharp-thin",
        "sharp-duotone-solid",
      ],
      description:
        "FontAwesome icon style. Only applies when `icon` is a string icon name and `iconLibrary` is `fontawesome`. Defaults to `regular`.",
    },
    iconLibrary: {
      control: "select",
      options: ["fontawesome", "lucide"],
      description:
        "Icon library used to resolve the `icon` string. Defaults to `fontawesome`. Pass a React node to `icon` to bypass this entirely.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Mention>;

// ─── Interactive playground ─────────────────────────────────────────────────
// Use the Controls panel (below) to experiment with every prop.
// • Set `path` for a page mention, `user` for a user mention (not both).
// • `icon` accepts a FontAwesome name (e.g. "plane"), a Lucide name with
//   iconLibrary="lucide", or a full image URL for an avatar.

export const Default: Story = {
  args: {
    children: "Getting Started",
    path: "/getting-started",
    color: "neutral",
  },
};

// ─── Page mentions ─────────────────────────────────────────────────────────

export const PageMention: Story = {
  name: "Page mention (default icon)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention path="/getting-started">Getting Started</Mention>
      <Mention path="/api-reference">API Reference</Mention>
      <Mention path="/changelog">Changelog</Mention>
    </div>
  ),
};

export const PageMentionCustomIcon: Story = {
  name: "Page mention (custom icon)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention color="info" icon="plane" path="/travel">
        Travel
      </Mention>
      <Mention color="info" icon="bed" path="/accommodation">
        Accommodation &amp; Meals
      </Mention>
      <Mention color="success" icon="leaf" path="/sustainability">
        Sustainability
      </Mention>
      <Mention color="warning" icon="triangle-exclamation" path="/warnings">
        Warnings
      </Mention>
    </div>
  ),
};

// ─── User mentions ──────────────────────────────────────────────────────────

export const UserMention: Story = {
  name: "User mention (default icon)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention color="info" user="james-baduor">
        James Baduor
      </Mention>
      <Mention user="alex-chen">Alex Chen</Mention>
      <Mention color="feature" user="sara-kim">
        Sara Kim
      </Mention>
    </div>
  ),
};

export const UserMentionWithAvatar: Story = {
  name: "User mention (avatar URL)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention
        color="info"
        icon="https://api.dicebear.com/7.x/avataaars/svg?seed=james"
        user="james-baduor"
      >
        James Baduor
      </Mention>
      <Mention
        color="neutral"
        icon="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        user="alex-chen"
      >
        Alex Chen
      </Mention>
    </div>
  ),
};

// ─── Color variants ─────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention color="neutral" path="/page">
        Neutral
      </Mention>
      <Mention color="info" path="/page">
        Info
      </Mention>
      <Mention color="success" path="/page">
        Success
      </Mention>
      <Mention color="warning" path="/page">
        Warning
      </Mention>
      <Mention color="feature" path="/page">
        Feature
      </Mention>
      <Mention color="error" path="/page">
        Error
      </Mention>
    </div>
  ),
};

export const ColorsWithUser: Story = {
  name: "Colors (user mentions)",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention color="neutral" user="person">
        Neutral
      </Mention>
      <Mention color="info" user="person">
        Info
      </Mention>
      <Mention color="success" user="person">
        Success
      </Mention>
      <Mention color="warning" user="person">
        Warning
      </Mention>
      <Mention color="feature" user="person">
        Feature
      </Mention>
      <Mention color="error" user="person">
        Error
      </Mention>
    </div>
  ),
};

// ─── Sizes ──────────────────────────────────────────────────────────────────
// Because every dimension (icon, padding, gap, radius) is expressed in em,
// the component scales proportionally with whatever font-size surrounds it.

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-3 text-stone-700">
      <p className="text-xs">
        Extra small — refer to <Mention path="/docs">Documentation</Mention> or
        ask <Mention user="alex">Alex Chen</Mention>
      </p>
      <p className="text-sm">
        Small — refer to <Mention path="/docs">Documentation</Mention> or ask{" "}
        <Mention user="alex">Alex Chen</Mention>
      </p>
      <p className="text-base">
        Base — refer to <Mention path="/docs">Documentation</Mention> or ask{" "}
        <Mention user="alex">Alex Chen</Mention>
      </p>
      <p className="text-lg">
        Large — refer to <Mention path="/docs">Documentation</Mention> or ask{" "}
        <Mention user="alex">Alex Chen</Mention>
      </p>
      <p className="text-xl">
        Extra large — refer to <Mention path="/docs">Documentation</Mention> or
        ask <Mention user="alex">Alex Chen</Mention>
      </p>
    </div>
  ),
};

// ─── In-context usage ───────────────────────────────────────────────────────

export const InlineInProse: Story = {
  name: "Inline in prose (checklist context)",
  render: () => (
    <div className="max-w-md space-y-3 font-sans text-sm text-stone-800">
      <label className="flex items-start gap-2">
        <input
          checked
          className="mt-0.5 accent-green-600"
          readOnly
          type="checkbox"
        />
        <span>
          Help us plan the activities in{" "}
          <Mention color="info" icon="plane" path="/travel">
            Travel
          </Mention>{" "}
          and party for the team
        </span>
      </label>
      <label className="flex items-start gap-2">
        <input
          checked
          className="mt-0.5 accent-green-600"
          readOnly
          type="checkbox"
        />
        <span>Book your trip and reserve a rental car</span>
      </label>
      <label className="flex items-start gap-2">
        <input className="mt-0.5" readOnly type="checkbox" />
        <span>
          Fill the surveys on meals &rarr;{" "}
          <Mention color="info" icon="bed" path="/accommodation">
            Accommodation &amp; Meals
          </Mention>
        </span>
      </label>
      <label className="flex items-start gap-2">
        <input className="mt-0.5" readOnly type="checkbox" />
        <span>
          Enter report details for further assessment &rarr;{" "}
          <Mention color="info" user="james-baduor">
            James Baduor
          </Mention>
        </span>
      </label>
    </div>
  ),
};

// ─── Icon library ───────────────────────────────────────────────────────────

export const LucideIcons: Story = {
  name: "Lucide icon library",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Mention color="info" icon="map" iconLibrary="lucide" path="/travel">
        Travel
      </Mention>
      <Mention color="success" icon="leaf" iconLibrary="lucide" path="/eco">
        Eco
      </Mention>
      <Mention color="feature" icon="sparkles" iconLibrary="lucide" path="/new">
        New
      </Mention>
    </div>
  ),
};

// ─── Wrapping ───────────────────────────────────────────────────────────────

export const LongLabelWrapping: Story = {
  name: "Long label (wrapping)",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-stone-400 text-xs uppercase tracking-wide">
          Natural wrap inside a narrow container
        </p>
        <div className="w-36">
          <Mention color="info" icon="bed" path="/accommodation">
            Accommodation &amp; Meals Planning Guide
          </Mention>
        </div>
      </div>

      <div>
        <p className="mb-3 text-stone-400 text-xs uppercase tracking-wide">
          Forced line break via &lt;br /&gt;
        </p>
        <div className="flex flex-col gap-2">
          <Mention color="feature" path="/page">
            Q4 Product Roadmap
            <br />
            Planning &amp; Review
          </Mention>
          <Mention color="success" icon="leaf" path="/sustainability">
            Sustainability
            <br />
            Guidelines
          </Mention>
        </div>
      </div>

      <div>
        <p className="mb-3 text-stone-400 text-xs uppercase tracking-wide">
          Inline in prose with wrapping label
        </p>
        <p className="max-w-xs text-sm text-stone-700">
          Please review the{" "}
          <Mention color="info" icon="file-lines" path="/compliance">
            Compliance &amp; Legal
            <br />
            Documentation
          </Mention>{" "}
          before proceeding.
        </p>
      </div>
    </div>
  ),
};

// ─── All badge variants (design reference) ──────────────────────────────────

export const DesignReference: Story = {
  name: "Design reference — all variants",
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-stone-400 text-xs uppercase tracking-wide">
          Page mentions
        </p>
        <div className="flex flex-wrap gap-2">
          <Mention color="info" path="/page">
            Page
          </Mention>
          <Mention color="success" path="/page">
            Page
          </Mention>
          <Mention color="warning" path="/page">
            Page
          </Mention>
          <Mention color="feature" path="/page">
            Page
          </Mention>
          <Mention color="error" path="/page">
            Page
          </Mention>
          <Mention color="neutral" path="/page">
            Page
          </Mention>
        </div>
      </div>
      <div>
        <p className="mb-2 text-stone-400 text-xs uppercase tracking-wide">
          Person mentions
        </p>
        <div className="flex flex-wrap gap-2">
          <Mention color="info" user="person">
            Person
          </Mention>
          <Mention color="success" user="person">
            Person
          </Mention>
          <Mention color="warning" user="person">
            Person
          </Mention>
          <Mention color="feature" user="person">
            Person
          </Mention>
          <Mention color="error" user="person">
            Person
          </Mention>
          <Mention color="neutral" user="person">
            Person
          </Mention>
        </div>
      </div>
    </div>
  ),
};
