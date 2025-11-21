import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./callout";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => {
    return (
      <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
        <div className="max-w-2xl w-full">
          <Callout variant="note" {...args} />
        </div>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Basic: Story = {
  args: {
    variant: "note",
    children: "This is a basic note callout component with default styling.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout variant="note">
          This is a note callout for highlighting important information.
        </Callout>
        <Callout variant="warning">
          This is a warning callout to alert users about potential issues.
        </Callout>
        <Callout variant="info">
          This is an informational callout with useful context.
        </Callout>
        <Callout variant="tip">
          This is a tip callout with helpful suggestions.
        </Callout>
        <Callout variant="success">
          This is a success callout to confirm positive outcomes.
        </Callout>
        <Callout variant="danger">
          This is a danger callout for critical warnings or errors.
        </Callout>
      </div>
    </div>
  ),
};

export const NoVariant: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout>No variant prop, so it will use the default variant</Callout>
      </div>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout variant="info" icon="rocket">
          Using a custom icon to represent a launch or deployment.
        </Callout>
        <Callout variant="warning" icon="clock">
          This feature will be deprecated in the next major version.
        </Callout>
        <Callout
          variant="success"
          icon={{ icon: "shield-check", iconType: "solid" }}
        >
          Your account has been secured with two-factor authentication.
        </Callout>
        <Callout variant="tip" icon={{ icon: "sparkles", iconType: "solid" }}>
          Pro tip: Use keyboard shortcuts to speed up your workflow.
        </Callout>
      </div>
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout variant="info">
          <p>
            To authenticate with the API, you need to include your API key in
            the request headers:
          </p>
          <p>
            Use <code>Authorization: Bearer YOUR_API_KEY</code> for all
            requests.
          </p>
          <p>
            Learn more in our{" "}
            <a
              href="https://docs.example.com/auth"
              target="_blank"
              rel="noopener noreferrer"
            >
              authentication guide
            </a>
            .
          </p>
        </Callout>
        <Callout variant="warning">
          <p>Version 2.0 introduces several breaking changes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The <code>oldMethod()</code> has been removed
            </li>
            <li>Configuration format has changed</li>
            <li>Minimum Node.js version is now 18.0.0</li>
          </ul>
        </Callout>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full">
        <Callout variant="note">
          <p>
            Our API implements rate limiting to ensure fair usage and maintain
            service quality for all users. The rate limits are applied per API
            key and vary depending on your subscription tier.
          </p>
          <p>
            Free tier users are limited to 100 requests per hour, while Pro
            users can make up to 10,000 requests per hour. If you exceed your
            rate limit, you'll receive a <code>429 Too Many Requests</code>{" "}
            response.
          </p>
          <p>
            We recommend implementing exponential backoff in your application to
            handle rate limit errors gracefully. For more details, check out our{" "}
            <a
              href="https://docs.example.com/rate-limits"
              target="_blank"
              rel="noopener noreferrer"
            >
              rate limiting documentation
            </a>
            .
          </p>
        </Callout>
      </div>
    </div>
  ),
};

export const InlineInDocumentation: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            Getting Started
          </h2>
          <p className="text-text-primary mb-4">
            Welcome to our comprehensive guide on getting started with the API.
            This tutorial will walk you through the essential steps needed to
            integrate our service into your application.
          </p>

          <Callout variant="tip">
            Before you begin, make sure you have Node.js 18+ and npm installed
            on your system.
          </Callout>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-text-primary">
            Installation
          </h3>
          <p className="text-text-primary mb-4">
            Install the SDK using your preferred package manager:
          </p>

          <Callout variant="info">
            Run <code>npm install @example/sdk</code> to add the SDK to your
            project.
          </Callout>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-text-primary">
            Configuration
          </h3>

          <Callout variant="warning">
            Never commit your API keys to version control. Use environment
            variables or a secure secrets management system.
          </Callout>
        </div>
      </div>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full">
        <Callout variant="info">
          <p>This is the main callout with important information.</p>
          <Callout variant="warning">
            This is a nested warning within the info callout.
          </Callout>
          <p>You can continue with more content after the nested callout.</p>
        </Callout>
      </div>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout variant="info">Simple info message</Callout>
        <Callout variant="success">Operation completed</Callout>
        <Callout variant="danger">Error occurred</Callout>
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout icon={{ icon: "key", iconLibrary: "lucide" }} color="#FFC107">
          This is a custom callout
        </Callout>
        <Callout
          icon="palette"
          style={
            {
              "--callout-bg": "rgba(236, 72, 153, 0.1)",
              "--callout-border": "rgba(236, 72, 153, 0.3)",
              "--callout-text": "rgb(190, 24, 93)",
              "--callout-icon-color": "rgb(236, 72, 153)",
            } as React.CSSProperties
          }
        >
          Custom pink callout with your own colors
        </Callout>
        <Callout
          icon="fire"
          style={
            {
              "--callout-bg": "rgba(249, 115, 22, 0.1)",
              "--callout-border": "rgba(249, 115, 22, 0.3)",
              "--callout-text": "rgb(154, 52, 18)",
              "--callout-icon-color": "rgb(249, 115, 22)",
            } as React.CSSProperties
          }
        >
          Custom orange callout for hot features
        </Callout>
        <Callout
          icon="sparkles"
          style={
            {
              "--callout-bg": "oklch(0.95 0.05 280)",
              "--callout-border": "oklch(0.8 0.1 280)",
              "--callout-text": "oklch(0.3 0.1 280)",
              "--callout-icon-color": "oklch(0.6 0.15 280)",
            } as React.CSSProperties
          }
        >
          Custom purple callout using oklch color space
        </Callout>
      </div>
    </div>
  ),
};

export const CompoundComponent: Story = {
  render: () => (
    <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
      <div className="max-w-2xl w-full space-y-4">
        <Callout.Root variant="info">
          <Callout.Icon icon="rocket" />
          <Callout.Content>
            Using compound components for more control over the structure
          </Callout.Content>
        </Callout.Root>

        <Callout.Root
          style={
            {
              "--callout-bg": "rgba(34, 197, 94, 0.1)",
              "--callout-border": "rgba(34, 197, 94, 0.3)",
              "--callout-text": "rgb(21, 128, 61)",
              "--callout-icon-color": "rgb(34, 197, 94)",
            } as React.CSSProperties
          }
        >
          <Callout.Icon icon="check-circle" />
          <Callout.Content>
            <p className="font-semibold mb-2">Success!</p>
            <p>You can use compound components with custom colors too</p>
          </Callout.Content>
        </Callout.Root>

        <Callout.Root variant="warning">
          <Callout.Icon>
            <svg
              className="mt-callout-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </Callout.Icon>
          <Callout.Content>
            You can even pass custom icon components as children
          </Callout.Content>
        </Callout.Root>
      </div>
    </div>
  ),
};
