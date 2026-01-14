import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultTabIndex: {
      control: { type: 'number', min: 0 },
      description: 'Index of the initially active tab (0-based)',
    },
    borderBottom: {
      control: 'boolean',
      description: 'Whether to show a border at the bottom of the tabs container',
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback fired when a tab is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Item title="First Tab">
        <p>This is the content of the first tab. You can put any content here.</p>
      </Tabs.Item>
      <Tabs.Item title="Second Tab">
        <p>This is the content of the second tab. It can contain different information.</p>
      </Tabs.Item>
      <Tabs.Item title="Third Tab">
        <p>This is the content of the third tab. Tabs are great for organizing content.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithDefaultTab: Story = {
  render: () => (
    <Tabs defaultTabIndex={1}>
      <Tabs.Item title="First Tab">
        <p>Content of the first tab.</p>
      </Tabs.Item>
      <Tabs.Item title="Second Tab (Default)">
        <p>This tab is shown by default because defaultTabIndex is set to 1.</p>
      </Tabs.Item>
      <Tabs.Item title="Third Tab">
        <p>Content of the third tab.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Home" icon="home">
        <p>Welcome to the home tab with a home icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Settings" icon="gear">
        <p>Configure your settings in this tab.</p>
      </Tabs.Item>
      <Tabs.Item title="User" icon="user">
        <p>View user profile information here.</p>
      </Tabs.Item>
      <Tabs.Item title="Messages" icon="envelope">
        <p>Check your messages in this tab.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithIconTypes: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Solid" icon="star" iconType="solid">
        <p>This tab uses a solid star icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Regular" icon="star" iconType="regular">
        <p>This tab uses a regular star icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Light" icon="star" iconType="light">
        <p>This tab uses a light star icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Duotone" icon="star" iconType="duotone">
        <p>This tab uses a duotone star icon.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithLucideIcons: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Dashboard" icon="layout-dashboard" iconLibrary="lucide">
        <p>Dashboard view with Lucide icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Analytics" icon="bar-chart-3" iconLibrary="lucide">
        <p>Analytics data with Lucide icon.</p>
      </Tabs.Item>
      <Tabs.Item title="Settings" icon="settings" iconLibrary="lucide">
        <p>Settings panel with Lucide icon.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithBorderBottom: Story = {
  render: () => (
    <Tabs borderBottom>
      <Tabs.Item title="Overview">
        <p>This tabs container has a border at the bottom.</p>
      </Tabs.Item>
      <Tabs.Item title="Details">
        <p>The borderBottom prop adds visual separation.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithCustomIds: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Custom ID Tab" id="custom-tab-1">
        <p>This tab has a custom ID: custom-tab-1</p>
      </Tabs.Item>
      <Tabs.Item title="Another Custom" id="custom-tab-2">
        <p>This tab has a custom ID: custom-tab-2</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Code Example">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>{`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`}</code>
        </pre>
      </Tabs.Item>
      <Tabs.Item title="List Content">
        <ul>
          <li>First item in the list</li>
          <li>Second item in the list</li>
          <li>Third item in the list</li>
          <li>Fourth item in the list</li>
        </ul>
      </Tabs.Item>
      <Tabs.Item title="Mixed Content">
        <h3 className="text-lg font-semibold mb-2">Section Title</h3>
        <p className="mb-4">
          This tab demonstrates mixed content with headings, paragraphs, and other elements.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">Tag 1</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-sm">Tag 2</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded text-sm">Tag 3</span>
        </div>
      </Tabs.Item>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Tab 1">Content 1</Tabs.Item>
      <Tabs.Item title="Tab 2">Content 2</Tabs.Item>
      <Tabs.Item title="Tab 3">Content 3</Tabs.Item>
      <Tabs.Item title="Tab 4">Content 4</Tabs.Item>
      <Tabs.Item title="Tab 5">Content 5</Tabs.Item>
      <Tabs.Item title="Tab 6">Content 6</Tabs.Item>
      <Tabs.Item title="Tab 7">Content 7</Tabs.Item>
      <Tabs.Item title="Tab 8">Content 8</Tabs.Item>
    </Tabs>
  ),
};

export const LongTabTitles: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="This is a very long tab title">
        <p>Content for the tab with a long title.</p>
      </Tabs.Item>
      <Tabs.Item title="Another lengthy tab title here">
        <p>Content for another tab with a long title.</p>
      </Tabs.Item>
      <Tabs.Item title="Short">
        <p>Content for a short-titled tab.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const WithCallback: Story = {
  render: () => (
    <Tabs onTabChange={(index) => console.log(`Tab changed to index: ${index}`)}>
      <Tabs.Item title="First">
        <p>Click different tabs and check the console for callback output.</p>
      </Tabs.Item>
      <Tabs.Item title="Second">
        <p>The onTabChange callback receives the new tab index.</p>
      </Tabs.Item>
      <Tabs.Item title="Third">
        <p>This is useful for analytics or state management.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const CustomClassName: Story = {
  render: () => (
    <Tabs className="bg-gray-50 dark:bg-gray-900 rounded-t-lg px-4">
      <Tabs.Item title="Styled Tab List">
        <p>The tab list has custom styling applied via className.</p>
      </Tabs.Item>
      <Tabs.Item title="Another Tab">
        <p>The className prop allows for custom styling of the tab list container.</p>
      </Tabs.Item>
    </Tabs>
  ),
};

export const APIDocumentationExample: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="cURL" icon="terminal">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'`}</code>
        </pre>
      </Tabs.Item>
      <Tabs.Item title="JavaScript" icon="code">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});

const data = await response.json();`}</code>
        </pre>
      </Tabs.Item>
      <Tabs.Item title="Python" icon="code">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`import requests

response = requests.post(
    'https://api.example.com/users',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json={
        'name': 'John Doe',
        'email': 'john@example.com'
    }
)

data = response.json()`}</code>
        </pre>
      </Tabs.Item>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item title="Tab A">
        <p>Content for Tab A</p>
      </Tabs.Item>
      <Tabs.Item title="Tab B">
        <p>Content for Tab B</p>
      </Tabs.Item>
    </Tabs>
  ),
};
