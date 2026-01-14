import type { Meta, StoryObj } from "@storybook/react-vite";
import { Update } from "./update";

const meta: Meta<typeof Update> = {
  title: "Components/Update",
  component: Update,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label displayed in the sticky section (e.g., date or version)",
    },
    description: {
      control: "text",
      description: "Description of the update, displayed below the label",
    },
    tags: {
      control: "object",
      description: "Tags associated with the update for categorization",
    },
    anchorAriaLabel: {
      control: "text",
      description: "Accessible label for the anchor link",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Update>;

// Basic Examples
export const Default: Story = {
  args: {
    id: "update-default",
    label: "March 15, 2024",
    children: (
      <div>
        <h3>New Feature Release</h3>
        <p>
          We have released a new feature that allows you to customize your dashboard.
          This includes new widgets, themes, and layout options.
        </p>
      </div>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    id: "update-with-description",
    label: "v2.0.0",
    description: "Major release with breaking changes",
    children: (
      <div>
        <h3>Version 2.0 Released</h3>
        <p>
          This major release includes significant improvements to the API,
          new authentication methods, and performance optimizations.
        </p>
        <ul>
          <li>New REST API endpoints</li>
          <li>OAuth 2.0 support</li>
          <li>50% faster response times</li>
        </ul>
      </div>
    ),
  },
};

export const WithTags: Story = {
  args: {
    id: "update-with-tags",
    label: "February 28, 2024",
    tags: ["Feature", "API"],
    children: (
      <div>
        <h3>API Improvements</h3>
        <p>
          We have added new endpoints for managing user preferences and
          improved rate limiting for better performance.
        </p>
      </div>
    ),
  },
};

export const WithMultipleTags: Story = {
  args: {
    id: "update-multiple-tags",
    label: "January 10, 2024",
    tags: ["Feature", "Bug Fix", "Security", "Performance"],
    description: "Quarterly update",
    children: (
      <div>
        <h3>Q1 2024 Updates</h3>
        <p>
          This quarterly release includes multiple improvements across
          different areas of the platform.
        </p>
      </div>
    ),
  },
};

export const WithLongDescription: Story = {
  args: {
    id: "update-long-description",
    label: "December 1, 2023",
    description: "This is a longer description that will wrap to multiple lines in the sidebar",
    children: (
      <div>
        <h3>End of Year Updates</h3>
        <p>
          As we wrap up the year, we are excited to share all the improvements
          we have made to the platform.
        </p>
      </div>
    ),
  },
};

// Content Variations
export const WithRichContent: Story = {
  args: {
    id: "update-rich-content",
    label: "November 15, 2023",
    tags: ["Feature"],
    children: (
      <div>
        <h3>Rich Content Support</h3>
        <p>
          The Update component supports any React content, including:
        </p>
        <ul>
          <li>Headings and paragraphs</li>
          <li>Lists (ordered and unordered)</li>
          <li>Code blocks</li>
          <li>Images and media</li>
        </ul>
        <pre>
          <code>{`const example = "code block";`}</code>
        </pre>
        <blockquote>
          <p>Blockquotes are also supported for highlighting important information.</p>
        </blockquote>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    id: "update-minimal",
    label: "Oct 1",
    children: <p>Minor bug fixes and improvements.</p>,
  },
};

// Changelog Example
export const ChangelogEntry: Story = {
  args: {
    id: "changelog-2024-03",
    label: "March 2024",
    description: "Monthly changelog",
    tags: ["Changelog"],
    children: (
      <div>
        <h3>March 2024 Changelog</h3>

        <h4>New Features</h4>
        <ul>
          <li>Added dark mode support across all components</li>
          <li>New dashboard widgets for analytics</li>
          <li>Improved search functionality with filters</li>
        </ul>

        <h4>Improvements</h4>
        <ul>
          <li>40% reduction in bundle size</li>
          <li>Faster initial page load</li>
          <li>Better mobile responsiveness</li>
        </ul>

        <h4>Bug Fixes</h4>
        <ul>
          <li>Fixed navigation issue on Safari</li>
          <li>Resolved date picker timezone bug</li>
          <li>Corrected alignment in card components</li>
        </ul>
      </div>
    ),
  },
};

// Multiple Updates Example
export const MultipleUpdates: Story = {
  render: () => (
    <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
      <Update
        id="update-march-2024"
        label="March 15, 2024"
        tags={["Feature"]}
      >
        <div>
          <h3>Dashboard Redesign</h3>
          <p>
            Complete overhaul of the dashboard with new widgets,
            improved navigation, and better performance.
          </p>
        </div>
      </Update>

      <Update
        id="update-march-2024-hotfix"
        label="March 12, 2024"
        tags={["Bug Fix"]}
      >
        <div>
          <h3>Hotfix Release</h3>
          <p>
            Fixed critical bug in the authentication flow that
            affected some users on mobile devices.
          </p>
        </div>
      </Update>

      <Update
        id="update-march-2024-security"
        label="March 1, 2024"
        tags={["Security"]}
        description="Critical security patch"
      >
        <div>
          <h3>Security Update</h3>
          <p>
            Applied security patches to address vulnerabilities
            identified in our security audit.
          </p>
        </div>
      </Update>
    </div>
  ),
};

// Version-based Updates
export const VersionUpdate: Story = {
  args: {
    id: "v1-5-0",
    label: "v1.5.0",
    description: "Feature release",
    tags: ["Release"],
    children: (
      <div>
        <h3>Version 1.5.0 Release Notes</h3>
        <p>
          This release includes new features and improvements based on
          community feedback.
        </p>
        <h4>Breaking Changes</h4>
        <p>None in this release.</p>
        <h4>New Features</h4>
        <ul>
          <li>Added support for custom themes</li>
          <li>New API endpoints for batch operations</li>
        </ul>
      </div>
    ),
  },
};

// With Custom Styling
export const WithCustomClassName: Story = {
  args: {
    id: "update-custom-style",
    label: "Custom Styled",
    className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4",
    children: (
      <div>
        <h3>Custom Styled Update</h3>
        <p>
          This update entry has custom styling applied via the className prop.
          You can use this to highlight important updates or create visual
          distinction between different types of entries.
        </p>
      </div>
    ),
  },
};

// Accessibility Example
export const WithCustomAriaLabel: Story = {
  args: {
    id: "accessible-update",
    label: "Accessibility Update",
    anchorAriaLabel: "Navigate to accessibility improvements section",
    tags: ["Accessibility"],
    children: (
      <div>
        <h3>Accessibility Improvements</h3>
        <p>
          This update has a custom aria-label for the anchor link,
          providing better context for screen reader users.
        </p>
        <ul>
          <li>Improved keyboard navigation</li>
          <li>Better screen reader support</li>
          <li>Enhanced focus indicators</li>
        </ul>
      </div>
    ),
  },
};

// Empty/Edge Cases
export const EmptyTags: Story = {
  args: {
    id: "update-empty-tags",
    label: "April 1, 2024",
    tags: [],
    children: (
      <div>
        <h3>Update Without Tags</h3>
        <p>This update has an empty tags array, so no tags are displayed.</p>
      </div>
    ),
  },
};

export const WhitespaceTags: Story = {
  args: {
    id: "update-whitespace-tags",
    label: "April 2, 2024",
    tags: ["  Feature  ", "", "  Bug Fix  "],
    children: (
      <div>
        <h3>Tags with Whitespace</h3>
        <p>
          Tags with leading/trailing whitespace are trimmed, and empty tags
          are filtered out.
        </p>
      </div>
    ),
  },
};
