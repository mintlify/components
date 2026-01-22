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
          Mintlify is a platform for creating beautiful documentation for your
          products.
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
        <p>To get started with Mintlify, follow these steps:</p>
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
    <div className="max-w-2xl space-y-3">
      <Accordion
        defaultOpen={false}
        description="Learn how to install Mintlify"
        title="Installation"
      >
        <p>Run the following command to install Mintlify:</p>
        <pre className="rounded bg-gray-800 p-3">npm install -g mintlify</pre>
      </Accordion>
      <Accordion
        defaultOpen={false}
        description="Configure your Mintlify project"
        title="Configuration"
      >
        <p>
          Create a mint.json file in your project root with the following
          structure:
        </p>
        <pre className="rounded bg-gray-800 p-3">
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
    <div className="max-w-2xl space-y-3">
      <Accordion
        defaultOpen={false}
        icon="code"
        iconType="solid"
        title="API Reference"
      >
        <p>View the complete API reference for all available endpoints.</p>
      </Accordion>
      <Accordion
        defaultOpen={false}
        icon="rocket"
        iconType="solid"
        title="Quick Start Guide"
      >
        <p>Get up and running with Mintlify in under 5 minutes.</p>
      </Accordion>
      <Accordion
        defaultOpen={false}
        icon="circle-question"
        iconType="regular"
        title="Troubleshooting"
      >
        <p>Common issues and how to resolve them.</p>
      </Accordion>
      <Accordion
        defaultOpen={false}
        icon="lightbulb"
        iconType="solid"
        title="Best Practices"
      >
        <p>Tips and tricks for creating great documentation.</p>
      </Accordion>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Accordion
        defaultOpen={false}
        icon={
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              fillRule="evenodd"
            />
          </svg>
        }
        title="Custom SVG Icon"
      >
        <p>
          This accordion uses a custom SVG icon instead of a Font Awesome icon.
        </p>
      </Accordion>
      <Accordion
        defaultOpen={false}
        icon={
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              clipRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              fillRule="evenodd"
            />
          </svg>
        }
        title="Another Custom Icon"
      >
        <p>You can pass any React component as the icon prop.</p>
      </Accordion>
    </div>
  ),
};

export const MultipleAccordions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Accordion defaultOpen={true} title="Introduction">
        <p>
          Welcome to our documentation. Here you'll find everything you need to
          know.
        </p>
      </Accordion>
      <Accordion defaultOpen={false} title="Getting Started">
        <p>Follow these steps to get started with our product.</p>
      </Accordion>
      <Accordion defaultOpen={false} title="API Documentation">
        <p>Comprehensive API reference and examples.</p>
      </Accordion>
      <Accordion defaultOpen={false} title="Examples">
        <p>Real-world examples and use cases.</p>
      </Accordion>
      <Accordion defaultOpen={false} title="FAQ">
        <p>Frequently asked questions and answers.</p>
      </Accordion>
    </div>
  ),
};

export const NestedAccordions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Accordion defaultOpen={true} title="Parent Accordion">
        <p className="mb-3">This is the parent accordion content.</p>
        <div className="space-y-3">
          <Accordion defaultOpen={false} title="Nested Child 1">
            <p>This is nested inside the parent accordion.</p>
          </Accordion>
          <Accordion defaultOpen={false} title="Nested Child 2">
            <p>You can nest accordions to create hierarchical content.</p>
          </Accordion>
        </div>
      </Accordion>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Accordion
        className="shadow-lg"
        defaultOpen={false}
        title="Custom Shadow"
      >
        <p>This accordion has a custom shadow applied via className.</p>
      </Accordion>
      <Accordion className="my-8" defaultOpen={false} title="Custom Spacing">
        <p>This accordion has custom margin spacing.</p>
      </Accordion>
      <Accordion
        className="border-4 border-blue-500"
        defaultOpen={false}
        title="Custom Border"
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
      <div className="max-w-2xl space-y-3">
        <div className="mb-4 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
          <p className="mb-2 text-gray-500 text-xs dark:text-gray-400">
            Current URL (Storybook iframe):
          </p>
          <code className="break-all text-gray-700 text-xs dark:text-gray-300">
            {currentUrl}
          </code>
        </div>
        <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
          These accordions sync with the URL hash. Open an accordion and watch
          the URL update above. The URL is also copied to your clipboard
          automatically!
        </p>
        <p className="mb-4 text-gray-500 text-xs dark:text-gray-400">
          <strong>Note:</strong> In Storybook's iframe environment, URL changes
          aren't visible in the browser's address bar, but the feature works in
          production. The simulated URL display above shows what's happening.
        </p>
        <Accordion
          defaultOpen={false}
          description="This accordion state is reflected in the URL"
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
          title="URL Synced Accordion 1"
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
          defaultOpen={false}
          description="This one also syncs with the URL"
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
          title="URL Synced Accordion 2"
        >
          <p>Each accordion has its own unique ID in the URL.</p>
        </Accordion>
        <Accordion
          defaultOpen={false}
          getInitialOpenFromUrl={getInitialOpen}
          onUrlStateChange={customUrlChange}
          title="URL Synced Accordion 3"
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
    <div className="max-w-2xl space-y-3">
      <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
        Open the browser console to see the callback logs.
      </p>
      <Accordion
        defaultOpen={false}
        description="This accordion logs when opened or closed"
        onMount={() => console.log("Accordion mounted")}
        title="Accordion with Callbacks"
        trackClose={(event) => console.log("Accordion closed:", event)}
        trackOpen={(event) => console.log("Accordion opened:", event)}
      >
        <p>
          Check the browser console to see the logs when you open or close this
          accordion.
        </p>
      </Accordion>
    </div>
  ),
};

export const AllFeaturesCombined: Story = {
  render: () => {
    const getInitialOpen = getInitialOpenState();
    const handleUrlChange = updateAndCopyUrl();

    return (
      <div className="max-w-2xl space-y-3">
        <Accordion
          className="shadow-md"
          defaultOpen={false}
          description="This accordion showcases all available features"
          getInitialOpenFromUrl={getInitialOpen}
          icon="star"
          iconType="solid"
          onMount={() => console.log("Mounted with all features")}
          onUrlStateChange={handleUrlChange}
          title="Feature-Rich Accordion"
          trackClose={(event) => console.log("Closed:", event)}
          trackOpen={(event) => console.log("Opened:", event)}
        >
          <div>
            <p className="font-semibold">This accordion includes:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Title and description</li>
              <li>Font Awesome icon</li>
              <li>URL state management</li>
              <li>Custom className for styling</li>
              <li>Open/close tracking callbacks</li>
              <li>Mount lifecycle callback</li>
            </ul>
            <p className="mt-3 text-gray-600 text-sm dark:text-gray-400">
              Check the browser console to see callback logs, and notice how the
              URL updates when you toggle this accordion!
            </p>
          </div>
        </Accordion>
      </div>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Accordion
        defaultOpen={false}
        icon="code"
        iconType="solid"
        title="Code Examples"
      >
        <div>
          <p className="mb-3">Here's how to use the Accordion component:</p>
          <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm">
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
        defaultOpen={false}
        icon="list"
        iconType="solid"
        title="Lists and Tables"
      >
        <div>
          <h4 className="mb-2 font-semibold">Available Props:</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 pr-4 text-left">Prop</th>
                <th className="py-2 pr-4 text-left">Type</th>
                <th className="py-2 text-left">Required</th>
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
        defaultOpen={false}
        icon="image"
        iconType="solid"
        title="Images and Media"
      >
        <div>
          <p className="mb-3">
            Accordions can contain any type of content, including images:
          </p>
          <div className="flex h-32 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">
              Image placeholder
            </span>
          </div>
        </div>
      </Accordion>
    </div>
  ),
};

export const AccordionGroupDefault: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion.Group>
        <Accordion defaultOpen={true} title="First Accordion">
          <p>Content of the first accordion.</p>
        </Accordion>
        <Accordion defaultOpen={false} title="Second Accordion">
          <p>Content of the second accordion.</p>
        </Accordion>
        <Accordion defaultOpen={false} title="Third Accordion">
          <p>Content of the third accordion.</p>
        </Accordion>
      </Accordion.Group>
    </div>
  ),
};

export const AccordionGroupWithIcons: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion.Group>
        <Accordion
          defaultOpen={false}
          icon="file"
          iconType="regular"
          title="Documents"
        >
          <p>Document-related content here.</p>
        </Accordion>
        <Accordion
          defaultOpen={false}
          icon="gear"
          iconType="regular"
          title="Settings"
        >
          <p>Settings-related content here.</p>
        </Accordion>
        <Accordion
          defaultOpen={false}
          icon="circle-question"
          iconType="regular"
          title="Help"
        >
          <p>Help and support content here.</p>
        </Accordion>
        <Accordion
          defaultOpen={false}
          icon="user"
          iconType="regular"
          title="Account"
        >
          <p>Account and profile settings here.</p>
        </Accordion>
      </Accordion.Group>
    </div>
  ),
};

export const AccordionGroupWithDescriptions: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion.Group>
        <Accordion
          defaultOpen={false}
          description="Basic introduction and setup"
          title="Getting Started"
        >
          <p>Getting started content here.</p>
          <ol className="mt-2 list-inside list-decimal">
            <li>Install the package</li>
            <li>Configure your project</li>
            <li>Start building</li>
          </ol>
        </Accordion>
        <Accordion
          defaultOpen={false}
          description="Detailed guide to advanced functionality"
          title="Advanced Features"
        >
          <p>Advanced features content here.</p>
          <ul className="mt-2 list-inside list-disc">
            <li>Custom theming</li>
            <li>Plugin system</li>
            <li>Advanced routing</li>
          </ul>
        </Accordion>
        <Accordion
          defaultOpen={false}
          description="Common issues and solutions"
          title="Troubleshooting"
        >
          <p>Troubleshooting content here.</p>
          <p className="mt-2">
            If you encounter issues, check the documentation or contact support.
          </p>
        </Accordion>
      </Accordion.Group>
    </div>
  ),
};

export const AccordionGroupWithRichContent: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion.Group>
        <Accordion
          defaultOpen={true}
          icon="download"
          iconType="solid"
          title="Installation"
        >
          <p className="mb-3">
            Install the package using your preferred package manager:
          </p>
          <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm">
            npm install @mintlify/components
          </pre>
        </Accordion>
        <Accordion
          defaultOpen={false}
          icon="gear"
          iconType="solid"
          title="Configuration"
        >
          <p className="mb-3">Create a configuration file:</p>
          <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm">
            {`{
  "theme": "light",
  "components": ["accordion", "badge"]
}`}
          </pre>
        </Accordion>
        <Accordion
          defaultOpen={false}
          icon="code"
          iconType="solid"
          title="Usage"
        >
          <p className="mb-3">Import and use the components:</p>
          <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm">
            {`import { Accordion } from '@mintlify/components';

<Accordion title="Hello">
  Content here
</Accordion>`}
          </pre>
        </Accordion>
      </Accordion.Group>
    </div>
  ),
};

export const AccordionGroupCustomStyling: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion.Group className="shadow-lg">
        <Accordion defaultOpen={false} title="Item One">
          <p>This AccordionGroup has a custom shadow applied.</p>
        </Accordion>
        <Accordion defaultOpen={false} title="Item Two">
          <p>All accordions share the group styling.</p>
        </Accordion>
        <Accordion defaultOpen={false} title="Item Three">
          <p>The group creates a unified appearance.</p>
        </Accordion>
      </Accordion.Group>
    </div>
  ),
};

export const MultipleAccordionGroups: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-gray-100">
          Documentation
        </h3>
        <Accordion.Group>
          <Accordion
            defaultOpen={false}
            icon="rocket"
            iconType="solid"
            title="Quick Start"
          >
            <p>Get up and running in minutes.</p>
          </Accordion>
          <Accordion
            defaultOpen={false}
            icon="book"
            iconType="solid"
            title="API Reference"
          >
            <p>Complete API documentation.</p>
          </Accordion>
          <Accordion
            defaultOpen={false}
            icon="lightbulb"
            iconType="solid"
            title="Examples"
          >
            <p>Real-world usage examples.</p>
          </Accordion>
        </Accordion.Group>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-gray-100">
          Support
        </h3>
        <Accordion.Group>
          <Accordion
            defaultOpen={false}
            icon="circle-question"
            iconType="solid"
            title="FAQ"
          >
            <p>Frequently asked questions.</p>
          </Accordion>
          <Accordion
            defaultOpen={false}
            icon="envelope"
            iconType="solid"
            title="Contact Us"
          >
            <p>Get in touch with our team.</p>
          </Accordion>
        </Accordion.Group>
      </div>
    </div>
  ),
};
