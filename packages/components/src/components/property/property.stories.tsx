import type { Meta, StoryObj } from "@storybook/react-vite";
import { Property } from "./property";

const meta: Meta<typeof Property> = {
  title: "Components/Property",
  component: Property,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
    deprecated: {
      control: "boolean",
    },
    hidden: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Property>;

export const Default: Story = {
  args: {
    name: "user_id",
    type: "string",
    children: "The unique identifier for the user.",
  },
};

export const Required: Story = {
  args: {
    name: "api_key",
    type: "string",
    required: true,
    children: "Your API key for authentication. This field is required.",
  },
};

export const Deprecated: Story = {
  args: {
    name: "legacy_token",
    type: "string",
    deprecated: true,
    children: "This field is deprecated. Use api_key instead.",
  },
};

export const WithDefault: Story = {
  args: {
    name: "limit",
    type: "integer",
    default: "10",
    children: "Maximum number of results to return.",
  },
};

export const WithLocation: Story = {
  args: {
    name: "page",
    type: "integer",
    location: "query",
    children: "The page number for pagination.",
  },
};

export const AllPills: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property
        name="complex_field"
        type="object"
        location="body"
        required
        deprecated
        default='{"key": "value"}'
      >
        A complex field showing all available pills and metadata.
      </Property>
    </div>
  ),
};

export const WithPreAndPost: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property
        name="status"
        type="enum"
        pre={["v2"]}
        post={["read-only"]}
      >
        The current status of the resource.
      </Property>
    </div>
  ),
};

export const MultipleProperties: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property name="id" type="string" required>
        Unique identifier for the object.
      </Property>
      <Property name="email" type="string" required>
        The user&apos;s email address.
      </Property>
      <Property name="name" type="string">
        The user&apos;s display name.
      </Property>
      <Property name="created_at" type="timestamp">
        Time at which the object was created.
      </Property>
      <Property name="metadata" type="object">
        Additional key-value pairs attached to the object.
      </Property>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property name="count" type="integer">
        A numeric count value.
      </Property>
      <Property name="price" type="number">
        A decimal price value.
      </Property>
      <Property name="is_active" type="boolean">
        Whether the resource is active.
      </Property>
      <Property name="tags" type="array">
        A list of tags associated with the resource.
      </Property>
      <Property name="config" type="object">
        Configuration settings for the resource.
      </Property>
    </div>
  ),
};

export const Hidden: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property name="visible_field" type="string">
        This field is visible.
      </Property>
      <Property name="hidden_field" type="string" hidden>
        This field is hidden and will not render.
      </Property>
      <Property name="another_visible" type="string">
        Another visible field.
      </Property>
    </div>
  ),
};

export const Locations: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property name="user_id" type="string" location="path" required>
        The user ID in the URL path.
      </Property>
      <Property name="limit" type="integer" location="query" default="20">
        Number of results to return.
      </Property>
      <Property name="Authorization" type="string" location="header" required>
        Bearer token for authentication.
      </Property>
      <Property name="payload" type="object" location="body">
        The request body containing the data to create.
      </Property>
      <Property name="session_id" type="string" location="cookie">
        Session identifier stored in cookies.
      </Property>
    </div>
  ),
};

export const TranslatedLabels: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property
        name="api_key"
        type="string"
        required
        requiredLabel="必填"
      >
        用于身份验证的 API 密钥。
      </Property>
      <Property
        name="limit"
        type="integer"
        default="10"
        defaultLabel="默认值"
      >
        返回结果的最大数量。
      </Property>
      <Property
        name="legacy_token"
        type="string"
        deprecated
        deprecatedLabel="已弃用"
      >
        此字段已弃用，请使用 api_key 代替。
      </Property>
      <Property
        name="complex_field"
        type="object"
        required
        deprecated
        default='{"key": "value"}'
        requiredLabel="必填"
        deprecatedLabel="已弃用"
        defaultLabel="默认值"
      >
        显示所有自定义标签的复杂字段。
      </Property>
    </div>
  ),
};

export const CustomClassName: Story = {
  render: () => (
    <div className="w-[500px]">
      <Property
        name="highlighted"
        type="string"
        className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-4"
      >
        This property has a custom background highlight.
      </Property>
      <Property
        name="bordered"
        type="string"
        className="border-2 border-blue-300 dark:border-blue-700 rounded-lg px-4"
      >
        This property has a custom border style.
      </Property>
      <Property
        name="no_border"
        type="string"
        className="border-b-0"
      >
        This property removes the default bottom border.
      </Property>
    </div>
  ),
};
