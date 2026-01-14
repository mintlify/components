import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponseExample } from "./responseExample";

const meta: Meta<typeof ResponseExample> = {
  title: "Components/ResponseExample",
  component: ResponseExample,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    dropdown: {
      control: "boolean",
      description: "When true, displays multiple examples in a dropdown instead of tabs",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the root element",
    },
    children: {
      control: false,
      description: "Code blocks to display as response examples",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResponseExample>;

// Mock code block component for demonstration
const MockCodeBlock = ({
  filename,
  children,
}: {
  filename?: string;
  children: string;
}) => (
  <div className="rounded-lg bg-zinc-900 text-zinc-100 overflow-hidden">
    {filename && (
      <div className="px-4 py-2 text-xs text-zinc-400 border-b border-zinc-700">
        {filename}
      </div>
    )}
    <pre className="p-4 text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <MockCodeBlock filename="200 OK">
        {`{
  "id": 123,
  "name": "Example User",
  "email": "user@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}`}
      </MockCodeBlock>
    ),
  },
};

export const WithDropdown: Story = {
  args: {
    dropdown: true,
    children: (
      <MockCodeBlock filename="Response">
        {`{
  "status": "success",
  "data": {
    "items": [
      { "id": 1, "name": "Item 1" },
      { "id": 2, "name": "Item 2" }
    ]
  }
}`}
      </MockCodeBlock>
    ),
  },
};

export const MultipleResponses: Story = {
  args: {
    children: (
      <>
        <MockCodeBlock filename="200 OK">
          {`{
  "success": true,
  "data": { "id": 123 }
}`}
        </MockCodeBlock>
        <MockCodeBlock filename="400 Bad Request">
          {`{
  "error": "Invalid request",
  "code": "INVALID_PARAMS"
}`}
        </MockCodeBlock>
        <MockCodeBlock filename="500 Internal Server Error">
          {`{
  "error": "Internal server error",
  "code": "SERVER_ERROR"
}`}
        </MockCodeBlock>
      </>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "border border-zinc-200 dark:border-zinc-700 rounded-xl p-4",
    children: (
      <MockCodeBlock filename="200 OK">
        {`{
  "message": "Custom styled response example"
}`}
      </MockCodeBlock>
    ),
  },
};

export const EmptyResponse: Story = {
  args: {
    children: (
      <MockCodeBlock filename="204 No Content">
        {""}
      </MockCodeBlock>
    ),
  },
};

export const LongResponse: Story = {
  args: {
    children: (
      <MockCodeBlock filename="200 OK">
        {`{
  "users": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "admin",
      "permissions": ["read", "write", "delete"],
      "metadata": {
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-15T12:30:00Z",
        "last_login": "2024-01-15T10:00:00Z"
      }
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob@example.com",
      "role": "user",
      "permissions": ["read"],
      "metadata": {
        "created_at": "2024-01-05T00:00:00Z",
        "updated_at": "2024-01-10T08:15:00Z",
        "last_login": "2024-01-14T16:45:00Z"
      }
    },
    {
      "id": 3,
      "name": "Carol Williams",
      "email": "carol@example.com",
      "role": "moderator",
      "permissions": ["read", "write"],
      "metadata": {
        "created_at": "2024-01-08T00:00:00Z",
        "updated_at": "2024-01-12T14:20:00Z",
        "last_login": "2024-01-15T09:30:00Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 3,
    "total_pages": 1
  }
}`}
      </MockCodeBlock>
    ),
  },
};

export const XMLResponse: Story = {
  args: {
    children: (
      <MockCodeBlock filename="200 OK (XML)">
        {`<?xml version="1.0" encoding="UTF-8"?>
<response>
  <status>success</status>
  <data>
    <user>
      <id>123</id>
      <name>Example User</name>
      <email>user@example.com</email>
    </user>
  </data>
</response>`}
      </MockCodeBlock>
    ),
  },
};

export const PlainTextResponse: Story = {
  args: {
    children: (
      <MockCodeBlock filename="200 OK (Plain Text)">
        {`Operation completed successfully.
Transaction ID: TXN-2024-001234
Timestamp: 2024-01-15T10:30:00Z`}
      </MockCodeBlock>
    ),
  },
};

// Story showing all response codes together
export const AllResponseCodes: Story = {
  render: () => (
    <div className="space-y-6">
      <ResponseExample>
        <MockCodeBlock filename="200 OK">
          {`{ "status": "success" }`}
        </MockCodeBlock>
      </ResponseExample>
      <ResponseExample>
        <MockCodeBlock filename="201 Created">
          {`{ "id": 123, "created": true }`}
        </MockCodeBlock>
      </ResponseExample>
      <ResponseExample>
        <MockCodeBlock filename="400 Bad Request">
          {`{ "error": "Invalid input" }`}
        </MockCodeBlock>
      </ResponseExample>
      <ResponseExample>
        <MockCodeBlock filename="401 Unauthorized">
          {`{ "error": "Authentication required" }`}
        </MockCodeBlock>
      </ResponseExample>
      <ResponseExample>
        <MockCodeBlock filename="404 Not Found">
          {`{ "error": "Resource not found" }`}
        </MockCodeBlock>
      </ResponseExample>
      <ResponseExample>
        <MockCodeBlock filename="500 Internal Server Error">
          {`{ "error": "Internal server error" }`}
        </MockCodeBlock>
      </ResponseExample>
    </div>
  ),
};
