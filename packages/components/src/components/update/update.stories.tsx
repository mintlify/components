import type { Meta, StoryObj } from "@storybook/react-vite";
import { Update } from "./update";

const meta: Meta<typeof Update> = {
  title: "Components/Update",
  component: Update,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    isVisible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Update>;

export const Default: Story = {
  args: {
    id: "update-1",
    label: "Jan 15, 2024",
    children: <p>Added support for dark mode across all components.</p>,
  },
};

export const WithDescription: Story = {
  args: {
    id: "update-2",
    label: "Jan 10, 2024",
    description: "Bug fixes and improvements",
    children: (
      <p>
        Resolved a bug where search results were not being properly filtered
        when using special characters.
      </p>
    ),
  },
};

export const WithTags: Story = {
  args: {
    id: "update-3",
    label: "Jan 5, 2024",
    tags: ["performance", "backend"],
    children: (
      <p>Optimized database queries to improve response times by 40%.</p>
    ),
  },
};

export const WithAllFeatures: Story = {
  args: {
    id: "update-4",
    label: "Jan 1, 2024",
    description: "Major release",
    tags: ["release", "breaking"],
    children: (
      <div>
        <p>Implemented new features:</p>
        <ul>
          <li>Redesigned user interface</li>
          <li>New API endpoints</li>
          <li>Improved performance</li>
        </ul>
      </div>
    ),
  },
};

export const Changelog: Story = {
  render: () => (
    <div className="flex flex-col divide-y">
      <Update id="v2.1.0" isVisible label="Feb 1, 2024" tags={["feature"]}>
        <p>Added new authentication options.</p>
      </Update>
      <Update
        description="Security patch"
        id="v2.0.1"
        isVisible
        label="Jan 20, 2024"
        tags={["security"]}
      >
        <p>Fixed critical vulnerability in session handling.</p>
      </Update>
      <Update
        description="Major release"
        id="v2.0.0"
        isVisible
        label="Jan 1, 2024"
        tags={["release", "breaking"]}
      >
        <div>
          <p>Breaking changes:</p>
          <ul>
            <li>Updated API response format</li>
            <li>Removed deprecated endpoints</li>
          </ul>
        </div>
      </Update>
    </div>
  ),
};
