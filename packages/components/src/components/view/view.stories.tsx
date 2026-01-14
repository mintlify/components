import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { View } from "./view";

const meta: Meta<typeof View> = {
  title: "Components/View",
  component: View,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title identifier for this view",
    },
    visible: {
      control: "boolean",
      description: "Controls whether this view is visible",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof View>;

export const Default: Story = {
  args: {
    title: "default-view",
    children: (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Default View</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This is the default view content. The view is visible by default.
        </p>
      </div>
    ),
  },
};

export const Visible: Story = {
  args: {
    title: "visible-view",
    visible: true,
    children: (
      <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">
          Visible View
        </h3>
        <p className="text-green-600 dark:text-green-300">
          This view has visible=true and is displayed.
        </p>
      </div>
    ),
  },
};

export const Hidden: Story = {
  args: {
    title: "hidden-view",
    visible: false,
    children: (
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Hidden View</h3>
        <p>This content should not be visible because visible=false.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "When visible is set to false, the View component renders nothing.",
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    title: "styled-view",
    className: "border-2 border-blue-500 rounded-xl p-6 bg-blue-50 dark:bg-blue-900",
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
          Custom Styled View
        </h3>
        <p className="text-blue-600 dark:text-blue-300">
          This view has custom styling applied via the className prop.
        </p>
      </div>
    ),
  },
};

export const MultipleViews: Story = {
  render: () => {
    const [activeView, setActiveView] = useState("view-1");

    return (
      <div className="space-y-4">
        <div className="flex gap-2" role="tablist" aria-label="View selection">
          <button
            role="tab"
            aria-selected={activeView === "view-1"}
            aria-controls="panel-view-1"
            id="tab-view-1"
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "view-1"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setActiveView("view-1")}
          >
            View 1
          </button>
          <button
            role="tab"
            aria-selected={activeView === "view-2"}
            aria-controls="panel-view-2"
            id="tab-view-2"
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "view-2"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setActiveView("view-2")}
          >
            View 2
          </button>
          <button
            role="tab"
            aria-selected={activeView === "view-3"}
            aria-controls="panel-view-3"
            id="tab-view-3"
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "view-3"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setActiveView("view-3")}
          >
            View 3
          </button>
        </div>

        <div className="min-h-[100px]">
          <View title="view-1" visible={activeView === "view-1"} id="panel-view-1" role="tabpanel" aria-labelledby="tab-view-1">
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-800 dark:text-purple-200">
                First View
              </h3>
              <p className="text-purple-600 dark:text-purple-300">
                Content for the first view panel.
              </p>
            </div>
          </View>

          <View title="view-2" visible={activeView === "view-2"} id="panel-view-2" role="tabpanel" aria-labelledby="tab-view-2">
            <div className="p-4 bg-teal-100 dark:bg-teal-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-teal-800 dark:text-teal-200">
                Second View
              </h3>
              <p className="text-teal-600 dark:text-teal-300">
                Content for the second view panel.
              </p>
            </div>
          </View>

          <View title="view-3" visible={activeView === "view-3"} id="panel-view-3" role="tabpanel" aria-labelledby="tab-view-3">
            <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-800 dark:text-orange-200">
                Third View
              </h3>
              <p className="text-orange-600 dark:text-orange-300">
                Content for the third view panel.
              </p>
            </div>
          </View>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple View components can be controlled by parent state to create tabbed or switchable content layouts.",
      },
    },
  },
};

export const WithRichContent: Story = {
  args: {
    title: "rich-content-view",
    children: (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Rich Content Example
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Views can contain any React content, including complex layouts,
          images, and interactive elements.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4">
          <li>Support for nested components</li>
          <li>Full styling flexibility</li>
          <li>Conditional rendering</li>
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Example Button
        </button>
      </div>
    ),
  },
};

export const CodeExampleViews: Story = {
  render: () => {
    const [language, setLanguage] = useState("javascript");

    return (
      <div className="space-y-4 w-full max-w-lg">
        <div className="flex gap-2" role="tablist" aria-label="Code language selection">
          <button
            role="tab"
            aria-selected={language === "javascript"}
            aria-controls="panel-javascript"
            id="tab-javascript"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              language === "javascript"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setLanguage("javascript")}
          >
            JavaScript
          </button>
          <button
            role="tab"
            aria-selected={language === "python"}
            aria-controls="panel-python"
            id="tab-python"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              language === "python"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setLanguage("python")}
          >
            Python
          </button>
          <button
            role="tab"
            aria-selected={language === "ruby"}
            aria-controls="panel-ruby"
            id="tab-ruby"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              language === "ruby"
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setLanguage("ruby")}
          >
            Ruby
          </button>
        </div>

        <View title="javascript" visible={language === "javascript"} id="panel-javascript" role="tabpanel" aria-labelledby="tab-javascript">
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto font-mono text-sm">
{`// JavaScript Example
const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
};`}
          </pre>
        </View>

        <View title="python" visible={language === "python"} id="panel-python" role="tabpanel" aria-labelledby="tab-python">
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto font-mono text-sm">
{`# Python Example
import requests

def fetch_data():
    response = requests.get('/api/data')
    return response.json()`}
          </pre>
        </View>

        <View title="ruby" visible={language === "ruby"} id="panel-ruby" role="tabpanel" aria-labelledby="tab-ruby">
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto font-mono text-sm">
{`# Ruby Example
require 'net/http'
require 'json'

def fetch_data
  uri = URI('/api/data')
  response = Net::HTTP.get(uri)
  JSON.parse(response)
end`}
          </pre>
        </View>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A practical example showing how View can be used to switch between code examples in different programming languages.",
      },
    },
  },
};

export const WithDataAttributes: Story = {
  render: () => (
    <View
      title="data-view"
      data-testid="custom-view"
      data-analytics="view-section"
    >
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">View with Data Attributes</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This view has custom data attributes passed through props. The title is
          automatically set as data-title on the element.
        </p>
      </div>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The View component supports all standard HTML data attributes which are spread to the root element.",
      },
    },
  },
};

export const ResponsiveContent: Story = {
  args: {
    title: "responsive-view",
    className: "w-full",
    children: (
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">
          Responsive View
        </h3>
        <p className="text-sm md:text-base lg:text-lg opacity-90">
          The View component works seamlessly with responsive designs. Content
          inside can use any Tailwind responsive modifiers.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <span className="px-3 py-1 bg-white/20 rounded text-sm">Mobile First</span>
          <span className="px-3 py-1 bg-white/20 rounded text-sm">Tablet Ready</span>
          <span className="px-3 py-1 bg-white/20 rounded text-sm">Desktop Optimized</span>
        </div>
      </div>
    ),
  },
};
