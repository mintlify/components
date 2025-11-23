import type { Meta, StoryObj } from "@storybook/react-vite";

import { Frame } from "./frame";

const meta: Meta<typeof Frame> = {
  title: "Components/Frame",
  component: Frame,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Frame>;

export const Basic: Story = {
  args: {
    style: { width: "400px", height: "200px" },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    children: <div className="p-4">Basic frame content</div>,
  },
};

export const WithCaption: Story = {
  args: {
    style: { width: "400px", height: "200px" },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    caption: "This is a frame caption",
    children: <div className="p-4">Frame with caption</div>,
  },
};

export const WithHint: Story = {
  args: {
    style: { width: "400px", height: "200px" },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    hint: "This is a helpful hint",
    children: <div className="p-4">Frame with hint</div>,
  },
};

export const WithCustomStyle: Story = {
  args: {
    style: {
      width: "400px",
      height: "200px",
      background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    children: (
      <div className="p-4 text-white">Frame with custom background</div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    style: { width: "400px", height: "200px" },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Frame Content</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This frame contains structured content with a heading and paragraph.
        </p>
      </div>
    ),
  },
};

export const WithAllFeatures: Story = {
  args: {
    style: { width: "400px", height: "200px" },
    className: "bg-white dark:bg-gray-800",
    containerClassName: "w-full",
    caption: "Complete frame example",
    hint: "This frame shows all available features",
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Complete Example</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This frame demonstrates all available features including caption,
          hint, and custom styling.
        </p>
      </div>
    ),
  },
};

export const CompoundBasic: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <div className="p-4 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold">Compound Components</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Using Frame.Root, Frame.Wrapper and Frame.Content
            </p>
          </div>
        </Frame.Content>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundWithCaption: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <div className="p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">Product Title</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is a product description that appears inside the frame.
            </p>
          </div>
        </Frame.Content>
        <Frame.Caption>
          <p>Product showcase with custom caption styling</p>
        </Frame.Caption>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundWithHint: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Hint
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ width: "1rem", height: "1rem" }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Preview Mode
      </Frame.Hint>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <div className="p-6 bg-white dark:bg-gray-800 text-center">
            <h3 className="text-lg font-semibold mb-2">Preview Content</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This frame has a custom hint above it
            </p>
          </div>
        </Frame.Content>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundFullComposition: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Hint
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ width: "1rem", height: "1rem" }}
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Interactive Demo
      </Frame.Hint>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <div className="p-8 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Full Composition
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This example demonstrates all compound components working
                together with custom styling and icons.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Click Me
              </button>
            </div>
          </div>
        </Frame.Content>
        <Frame.Caption>
          <p className="font-medium">
            Built with Frame.Root, Frame.Wrapper, Frame.Content, Frame.Caption,
            and Frame.Hint
          </p>
        </Frame.Caption>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundMultipleFrames: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-6">
      <Frame.Root>
        <Frame.Hint>Card 1</Frame.Hint>
        <Frame.Wrapper>
          <Frame.Background />
          <Frame.Content>
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                First frame in a series
              </p>
            </div>
          </Frame.Content>
          <Frame.Caption>
            <p className="text-xs">Caption for first card</p>
          </Frame.Caption>
          <Frame.Border />
        </Frame.Wrapper>
      </Frame.Root>

      <Frame.Root>
        <Frame.Hint>Card 2</Frame.Hint>
        <Frame.Wrapper>
          <Frame.Background />
          <Frame.Content>
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Second frame in a series
              </p>
            </div>
          </Frame.Content>
          <Frame.Caption>
            <p className="text-xs">Caption for second card</p>
          </Frame.Caption>
          <Frame.Border />
        </Frame.Wrapper>
      </Frame.Root>
    </div>
  ),
};

export const CompoundWithImage: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Hint>Yellowstone</Frame.Hint>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <img
            src="https://mintlify-assets.b-cdn.net/yellowstone.jpeg"
            alt="Yellowstone landscape"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Frame.Content>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundWithImageAndCaption: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Hint>Yosemite</Frame.Hint>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <img
            src="https://mintlify-assets.b-cdn.net/yosemite.jpg"
            alt="Yosemite landscape"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Frame.Content>
        <Frame.Caption>
          <p>A stunning view of Yosemite National Park</p>
        </Frame.Caption>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundImageGallery: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <Frame.Root>
        <Frame.Wrapper>
          <Frame.Background />
          <Frame.Content>
            <img
              src="https://mintlify-assets.b-cdn.net/yellowstone.jpeg"
              alt="Yellowstone"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Frame.Content>
          <Frame.Caption>
            <p className="text-xs">Yellowstone</p>
          </Frame.Caption>
          <Frame.Border />
        </Frame.Wrapper>
      </Frame.Root>
      <Frame.Root>
        <Frame.Wrapper>
          <Frame.Background />
          <Frame.Content>
            <img
              src="https://mintlify-assets.b-cdn.net/yosemite.jpg"
              alt="Yosemite"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Frame.Content>
          <Frame.Caption>
            <p className="text-xs">Yosemite</p>
          </Frame.Caption>
          <Frame.Border />
        </Frame.Wrapper>
      </Frame.Root>
    </div>
  ),
};

export const CompoundNestedContent: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Wrapper>
        <Frame.Background />
        <Frame.Content>
          <div className="p-6 bg-white dark:bg-gray-800 space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold">Header Section</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subtitle text
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                <p className="text-xs font-medium">Feature 1</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                <p className="text-xs font-medium">Feature 2</p>
              </div>
            </div>
          </div>
        </Frame.Content>
        <Frame.Caption>
          <p>Complex nested content structure</p>
        </Frame.Caption>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};

export const CompoundCustomRender: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Frame.Root>
      <Frame.Wrapper render={<section />}>
        <Frame.Background />
        <Frame.Content>
          <div className="p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">Custom Element</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This frame renders as a {`<section>`} element instead of a{" "}
              {`<div>`}
            </p>
          </div>
        </Frame.Content>
        <Frame.Caption>
          <p>Using the render prop for semantic HTML</p>
        </Frame.Caption>
        <Frame.Border />
      </Frame.Wrapper>
    </Frame.Root>
  ),
};
