import type { Meta, StoryObj } from "@storybook/react-vite";
import { Frame } from "./frame";

const meta: Meta<typeof Frame> = {
  title: "Components/Frame",
  component: Frame,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title displayed above the frame content with an icon",
    },
    description: {
      control: "text",
      description: "Description/caption displayed below the frame content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the frame container",
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS classes for the outer wrapper",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Frame>;

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60"
        alt="Abstract gradient artwork"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: "Preview",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60"
        alt="Abstract gradient artwork"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

export const WithDescription: Story = {
  args: {
    description: "Screenshot of the application dashboard",
    children: (
      <img
        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60"
        alt="Dashboard screenshot"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    title: "Dashboard Overview",
    description: "The main dashboard showing key metrics and analytics",
    children: (
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60"
        alt="Analytics dashboard"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

// Content Type Examples
export const WithPlaceholder: Story = {
  args: {
    title: "Placeholder Content",
    description: "This frame contains a simple colored placeholder",
    children: (
      <div
        style={{
          width: "400px",
          height: "250px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Placeholder Content
      </div>
    ),
  },
};

export const WithCode: Story = {
  args: {
    title: "Code Example",
    description: "A simple React component example",
    children: (
      <pre
        style={{
          background: "#1e1e1e",
          color: "#d4d4d4",
          padding: "24px",
          borderRadius: "8px",
          fontSize: "14px",
          margin: 0,
          overflow: "auto",
          maxWidth: "500px",
        }}
      >
        {`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`}
      </pre>
    ),
  },
};

export const WithSVG: Story = {
  args: {
    title: "Logo Design",
    description: "Company logo in SVG format",
    children: (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="200" height="200" rx="20" fill="#6366f1" />
        <path
          d="M60 100L90 130L140 70"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

// Video Examples
export const WithVideo: Story = {
  args: {
    title: "Video Demo",
    description: "A sample video demonstration",
    children: (
      <video
        width="500"
        height="280"
        controls
        poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop&q=60"
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
    ),
  },
};

export const WithAutoplayVideo: Story = {
  args: {
    title: "Autoplay Video",
    description: "Video with autoplay automatically gets playsInline, loop, and muted props",
    children: (
      <video
        width="500"
        height="280"
        autoPlay
        poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop&q=60"
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "When a video element has the `autoPlay` prop, the Frame component automatically adds `playsInline`, `loop`, and `muted` props for better browser compatibility.",
      },
    },
  },
};

// Styling Examples
export const WithCustomClassName: Story = {
  args: {
    title: "Custom Styled Frame",
    description: "This frame has custom styling via className",
    className: "shadow-xl",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60"
        alt="Abstract artwork"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

export const WithContainerClassName: Story = {
  args: {
    title: "Container Styled Frame",
    description: "The outer container has custom padding",
    containerClassName: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-3xl",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60"
        alt="Abstract artwork"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

export const WithCustomStyle: Story = {
  args: {
    title: "Inline Styled Frame",
    description: "This frame has custom inline styles",
    style: {
      maxWidth: "400px",
      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    },
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60"
        alt="Abstract artwork"
        style={{ width: "100%", height: "auto" }}
      />
    ),
  },
};

// Size Variations
export const SmallFrame: Story = {
  args: {
    title: "Small Preview",
    description: "A compact frame for smaller content",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&auto=format&fit=crop&q=60"
        alt="Small preview"
        style={{ width: "200px", height: "auto" }}
      />
    ),
  },
};

export const LargeFrame: Story = {
  args: {
    title: "Large Preview",
    description: "A larger frame for detailed content",
    children: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&auto=format&fit=crop&q=60"
        alt="Large preview"
        style={{ width: "100%", maxWidth: "800px", height: "auto" }}
      />
    ),
  },
};

// Multiple Frames Example
export const MultipleFrames: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "600px" }}>
      <Frame title="Step 1" description="Create your account">
        <div
          style={{
            width: "100%",
            height: "150px",
            background: "#f0f9ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          Account Creation Form
        </div>
      </Frame>
      <Frame title="Step 2" description="Configure your settings">
        <div
          style={{
            width: "100%",
            height: "150px",
            background: "#f0fdf4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          Settings Panel
        </div>
      </Frame>
      <Frame title="Step 3" description="Start using the app">
        <div
          style={{
            width: "100%",
            height: "150px",
            background: "#fefce8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          Dashboard View
        </div>
      </Frame>
    </div>
  ),
};

// Documentation Use Case
export const DocumentationScreenshot: Story = {
  args: {
    title: "API Response",
    description: "Example response from the /users endpoint showing user data",
    children: (
      <pre
        style={{
          background: "#0d1117",
          color: "#c9d1d9",
          padding: "20px",
          borderRadius: "8px",
          fontSize: "13px",
          margin: 0,
          overflow: "auto",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {JSON.stringify(
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            createdAt: "2024-01-15T10:30:00Z",
          },
          null,
          2
        )}
      </pre>
    ),
  },
};

// Empty State
export const EmptyFrame: Story = {
  args: {
    title: "Empty Preview",
    description: "No content has been added yet",
    children: (
      <div
        style={{
          width: "400px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: "14px",
          border: "2px dashed #e5e7eb",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        No preview available
      </div>
    ),
  },
};

// Long Description
export const LongDescription: Story = {
  args: {
    title: "Feature Overview",
    description:
      "This frame demonstrates how longer descriptions are handled. The description text wraps naturally within the frame container, maintaining readability while providing additional context about the displayed content.",
    children: (
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60"
        alt="Feature overview"
        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
      />
    ),
  },
};

// Grid Layout Example
export const FrameGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        maxWidth: "800px",
      }}
    >
      <Frame description="Light theme preview">
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Light Theme
        </div>
      </Frame>
      <Frame description="Dark theme preview">
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "#1f2937",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          Dark Theme
        </div>
      </Frame>
      <Frame description="Blue variant">
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "#3b82f6",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          Blue
        </div>
      </Frame>
      <Frame description="Green variant">
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "#22c55e",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          Green
        </div>
      </Frame>
    </div>
  ),
};
