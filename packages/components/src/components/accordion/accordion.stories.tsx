import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Accordion, getInitialOpenState, updateAndCopyUrl } from "./index";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: "What is Mintlify?",
    defaultOpen: false,
    children: (
      <div>
        <p>
          Mintlify is a platform for creating beautiful documentation for your products.
        </p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Getting Started",
    defaultOpen: true,
    children: (
      <div>
        <p>
          To get started with Mintlify, follow these steps:
        </p>
        <ol>
          <li>Install the CLI</li>
          <li>Initialize your project</li>
          <li>Start the dev server</li>
        </ol>
      </div>
    ),
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion
        title="Installation"
        description="Learn how to install Mintlify"
        defaultOpen={false}
      >
        <p>Run the following command to install Mintlify:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
          npm install -g mintlify
        </pre>
      </Accordion>
      <Accordion
        title="Configuration"
        description="Configure your Mintlify project"
        defaultOpen={false}
      >
        <p>Create a mint.json file in your project root with the following structure:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
          {`{
  "name": "My Documentation",
  "navigation": []
}`}
        </pre>
      </Accordion>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion
        title="API Reference"
        icon="code"
        iconType="solid"
        defaultOpen={false}
      >
        <p>View the complete API reference for all available endpoints.</p>
      </Accordion>
      <Accordion
        title="Quick Start Guide"
        icon="rocket"
        iconType="solid"
        defaultOpen={false}
      >
        <p>Get up and running with Mintlify in under 5 minutes.</p>
      </Accordion>
      <Accordion
        title="Troubleshooting"
        icon="circle-question"
        iconType="regular"
        defaultOpen={false}
      >
        <p>Common issues and how to resolve them.</p>
      </Accordion>
      <Accordion
        title="Best Practices"
        icon="lightbulb"
        iconType="solid"
        defaultOpen={false}
      >
        <p>Tips and tricks for creating great documentation.</p>
      </Accordion>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion
        title="Custom SVG Icon"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        }
        defaultOpen={false}
      >
        <p>This accordion uses a custom SVG icon instead of a Font Awesome icon.</p>
      </Accordion>
      <Accordion
        title="Another Custom Icon"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        defaultOpen={false}
      >
        <p>You can pass any React component as the icon prop.</p>
      </Accordion>
    </div>
  ),
};

export const MultipleAccordions: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion title="Introduction" defaultOpen={true}>
        <p>Welcome to our documentation. Here you'll find everything you need to know.</p>
      </Accordion>
      <Accordion title="Getting Started" defaultOpen={false}>
        <p>Follow these steps to get started with our product.</p>
      </Accordion>
      <Accordion title="API Documentation" defaultOpen={false}>
        <p>Comprehensive API reference and examples.</p>
      </Accordion>
      <Accordion title="Examples" defaultOpen={false}>
        <p>Real-world examples and use cases.</p>
      </Accordion>
      <Accordion title="FAQ" defaultOpen={false}>
        <p>Frequently asked questions and answers.</p>
      </Accordion>
    </div>
  ),
};

export const NestedAccordions: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion title="Parent Accordion" defaultOpen={true}>
        <p className="mb-3">This is the parent accordion content.</p>
        <div className="space-y-3">
          <Accordion title="Nested Child 1" defaultOpen={false}>
            <p>This is nested inside the parent accordion.</p>
          </Accordion>
          <Accordion title="Nested Child 2" defaultOpen={false}>
            <p>You can nest accordions to create hierarchical content.</p>
          </Accordion>
        </div>
      </Accordion>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion
        title="Custom Shadow"
        className="shadow-lg"
        defaultOpen={false}
      >
        <p>This accordion has a custom shadow applied via className.</p>
      </Accordion>
      <Accordion
        title="Custom Spacing"
        className="my-8"
        defaultOpen={false}
      >
        <p>This accordion has custom margin spacing.</p>
      </Accordion>
      <Accordion
        title="Custom Border"
        className="border-4 border-blue-500"
        defaultOpen={false}
      >
        <p>This accordion has a custom thick blue border.</p>
      </Accordion>
    </div>
  ),
};

export const WithURLManagement: Story = {
  render: () => {
    const [currentUrl, setCurrentUrl] = useState(
      typeof window !== "undefined" ? window.location.href : ""
    );
    const getInitialOpen = getInitialOpenState();
    const handleUrlChange = updateAndCopyUrl();

    const customUrlChange = (
      isOpen: boolean,
      id: string | undefined,
      parentIds: string[]
    ) => {
      handleUrlChange(isOpen, id, parentIds);
      setTimeout(() => {
        setCurrentUrl(window.location.href);
      }, 0);
    };

    return (
      <div className="space-y-3 max-w-2xl">
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Current URL (Storybook iframe):
          </p>
          <code className="text-xs break-all text-gray-700 dark:text-gray-300">
            {currentUrl}
          </code>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          These accordions sync with the URL hash. Open an accordion and watch
          the URL update above. The URL is also copied to your clipboard
          automatically!
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          <strong>Note:</strong> In Storybook's iframe environment, URL changes
          aren't visible in the browser's address bar, but the feature works in
          production. The simulated URL display above shows what's happening.
        </p>
        <Accordion
          title="URL Synced Accordion 1"
          description="This accordion state is reflected in the URL"
          defaultOpen={false}
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
        >
          <p>
            When you open this accordion, the URL hash will update to include
            its ID.
          </p>
          <p className="mt-2">
            Try refreshing the page - the accordion will maintain its state!
          </p>
        </Accordion>
        <Accordion
          title="URL Synced Accordion 2"
          description="This one also syncs with the URL"
          defaultOpen={false}
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
        >
          <p>Each accordion has its own unique ID in the URL.</p>
        </Accordion>
        <Accordion
          title="URL Synced Accordion 3"
          defaultOpen={false}
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
        >
          <p>
            Deep linking works too - share the URL with someone and they'll see
            the same state.
          </p>
        </Accordion>
      </div>
    );
  },
};

export const WithCallbacks: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Open the browser console to see the callback logs.
      </p>
      <Accordion
        title="Accordion with Callbacks"
        description="This accordion logs when opened or closed"
        defaultOpen={false}
        trackOpen={(event) => console.log("Accordion opened:", event)}
        trackClose={(event) => console.log("Accordion closed:", event)}
        onMount={() => console.log("Accordion mounted")}
      >
        <p>Check the browser console to see the logs when you open or close this accordion.</p>
      </Accordion>
    </div>
  ),
};

export const AllFeaturesCombined: Story = {
  render: () => {
    const getInitialOpen = getInitialOpenState();
    const handleUrlChange = updateAndCopyUrl();

    return (
      <div className="space-y-3 max-w-2xl">
        <Accordion
          title="Feature-Rich Accordion"
          description="This accordion showcases all available features"
          icon="star"
          iconType="solid"
          defaultOpen={false}
          className="shadow-md"
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={handleUrlChange}
          trackOpen={(event) => console.log("Opened:", event)}
          trackClose={(event) => console.log("Closed:", event)}
          onMount={() => console.log("Mounted with all features")}
        >
          <div>
            <p className="font-semibold">This accordion includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Title and description</li>
              <li>Font Awesome icon</li>
              <li>URL state management</li>
              <li>Custom className for styling</li>
              <li>Open/close tracking callbacks</li>
              <li>Mount lifecycle callback</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Check the browser console to see callback logs, and notice how the URL updates when you toggle this accordion!
            </p>
          </div>
        </Accordion>
      </div>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Accordion
        title="Code Examples"
        icon="code"
        iconType="solid"
        defaultOpen={false}
      >
        <div>
          <p className="mb-3">Here's how to use the Accordion component:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm">
            {`<Accordion
  title="My Accordion"
  defaultOpen={false}
>
  <p>Content goes here</p>
</Accordion>`}
          </pre>
        </div>
      </Accordion>
      <Accordion
        title="Lists and Tables"
        icon="list"
        iconType="solid"
        defaultOpen={false}
      >
        <div>
          <h4 className="font-semibold mb-2">Available Props:</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2 pr-4">title</td>
                <td className="py-2 pr-4">string</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2 pr-4">defaultOpen</td>
                <td className="py-2 pr-4">boolean</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-2 pr-4">description</td>
                <td className="py-2 pr-4">string</td>
                <td className="py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Accordion>
      <Accordion
        title="Images and Media"
        icon="image"
        iconType="solid"
        defaultOpen={false}
      >
        <div>
          <p className="mb-3">Accordions can contain any type of content, including images:</p>
          <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Image placeholder</span>
          </div>
        </div>
      </Accordion>
    </div>
  ),
};
