import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResponseField } from "./responseField";

const meta: Meta<typeof ResponseField> = {
  title: "Components/ResponseField",
  component: ResponseField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name of the response field",
    },
    type: {
      control: "text",
      description: "The type of the field (e.g., string, number, object)",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    deprecated: {
      control: "boolean",
      description: "Whether the field is deprecated",
    },
    hidden: {
      control: "boolean",
      description: "Whether the field is hidden",
    },
    default: {
      control: "text",
      description: "Default value for the field",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResponseField>;

export const Default: Story = {
  args: {
    name: "id",
    type: "string",
    children: "The unique identifier for the resource.",
  },
};

export const WithAllMetadata: Story = {
  args: {
    name: "status",
    type: "string",
    required: true,
    default: "active",
    children:
      "The current status of the resource. Can be one of: active, inactive, pending.",
  },
};

export const Deprecated: Story = {
  args: {
    name: "legacy_id",
    type: "string",
    deprecated: true,
    children:
      "This field is deprecated. Use the 'id' field instead for new integrations.",
  },
};

export const Required: Story = {
  args: {
    name: "email",
    type: "string",
    required: true,
    children: "The email address of the user. Must be a valid email format.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    name: "page_size",
    type: "integer",
    default: 20,
    children:
      "The number of items to return per page. Must be between 1 and 100.",
  },
};

export const WithEmptyStringDefault: Story = {
  args: {
    name: "prefix",
    type: "string",
    default: "",
    children: "Optional prefix to prepend to the output.",
  },
};

export const WithObjectDefault: Story = {
  args: {
    name: "config",
    type: "object",
    default: { enabled: true, retries: 3 },
    children: "Configuration object for the service.",
  },
};

export const WithPreLabels: Story = {
  args: {
    name: "data",
    type: "array",
    pre: ["readonly"],
    children: "The array of data items returned by the API.",
  },
};

export const WithPostLabels: Story = {
  args: {
    name: "created_at",
    type: "string",
    post: ["ISO 8601"],
    children: "The timestamp when the resource was created.",
  },
};

export const WithPreAndPostLabels: Story = {
  args: {
    name: "metadata",
    type: "object",
    pre: ["readonly"],
    post: ["nullable"],
    children: "Additional metadata associated with the resource.",
  },
};

export const WithLongDescription: Story = {
  args: {
    name: "callback_url",
    type: "string",
    children: (
      <div>
        <p>
          The URL that will receive webhook notifications when the resource
          state changes. This URL must be publicly accessible and respond with a
          200 status code within 30 seconds.
        </p>
        <p className="mt-2">
          The webhook payload will include the resource ID, the new state, and a
          timestamp. You can verify the authenticity of the webhook using the
          signature header.
        </p>
      </div>
    ),
  },
};

export const Hidden: Story = {
  args: {
    name: "internal_id",
    type: "string",
    hidden: true,
    children: "This field should not be visible.",
  },
  render: (args) => (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        The ResponseField below is hidden (hidden=true). Nothing should appear:
      </p>
      <ResponseField {...args} />
      <p className="text-sm text-gray-500 mt-4">End of hidden field area.</p>
    </div>
  ),
};

export const CustomId: Story = {
  args: {
    name: "user_id",
    type: "string",
    id: "response-user-id",
    children: "This field has a custom ID for anchor linking.",
  },
};

export const ComplexTypes: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="items" type="array<object>">
        An array of item objects.
      </ResponseField>
      <ResponseField name="metadata" type="Record<string, any>">
        A key-value map of metadata.
      </ResponseField>
      <ResponseField name="coordinates" type="[number, number]">
        A tuple representing latitude and longitude.
      </ResponseField>
      <ResponseField name="handler" type="(event: Event) => void">
        A callback function for handling events.
      </ResponseField>
    </div>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="id" type="string" required>
        The unique identifier for the user.
      </ResponseField>
      <ResponseField name="email" type="string" required>
        The email address of the user.
      </ResponseField>
      <ResponseField name="name" type="string">
        The display name of the user.
      </ResponseField>
      <ResponseField name="avatar_url" type="string">
        URL to the user's avatar image.
      </ResponseField>
      <ResponseField name="created_at" type="string" post={["ISO 8601"]}>
        When the user account was created.
      </ResponseField>
      <ResponseField name="updated_at" type="string" post={["ISO 8601"]}>
        When the user account was last updated.
      </ResponseField>
      <ResponseField name="legacy_username" type="string" deprecated>
        The old username field. Use 'name' instead.
      </ResponseField>
    </div>
  ),
};

export const NestedResponseStructure: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="data" type="object" required>
        The response data object containing the requested resource.
      </ResponseField>
      <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
        <ResponseField name="data.id" type="string" required>
          The unique identifier.
        </ResponseField>
        <ResponseField name="data.attributes" type="object">
          The resource attributes.
        </ResponseField>
        <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
          <ResponseField name="data.attributes.title" type="string">
            The title of the resource.
          </ResponseField>
          <ResponseField name="data.attributes.description" type="string">
            A detailed description.
          </ResponseField>
        </div>
      </div>
      <ResponseField name="meta" type="object">
        Metadata about the response.
      </ResponseField>
      <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
        <ResponseField name="meta.total" type="integer">
          Total number of items available.
        </ResponseField>
        <ResponseField name="meta.page" type="integer" default={1}>
          Current page number.
        </ResponseField>
      </div>
    </div>
  ),
};

export const APIErrorResponse: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="error" type="object" required>
        Error object returned when the request fails.
      </ResponseField>
      <div className="pl-6 border-l-2 border-red-200 dark:border-red-900 ml-2">
        <ResponseField name="error.code" type="string" required>
          A machine-readable error code (e.g., "invalid_request",
          "unauthorized").
        </ResponseField>
        <ResponseField name="error.message" type="string" required>
          A human-readable error message describing what went wrong.
        </ResponseField>
        <ResponseField name="error.details" type="array<object>">
          Additional details about the error, such as validation failures.
        </ResponseField>
        <ResponseField name="error.request_id" type="string">
          A unique identifier for this request, useful for debugging.
        </ResponseField>
      </div>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    name: "custom_styled",
    type: "string",
    className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4",
    children: "This field has custom styling applied via className.",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="basic_field" type="string">
        A basic field with just name and type.
      </ResponseField>
      <ResponseField name="required_field" type="string" required>
        A required field.
      </ResponseField>
      <ResponseField name="deprecated_field" type="string" deprecated>
        A deprecated field.
      </ResponseField>
      <ResponseField name="required_deprecated" type="string" required deprecated>
        A field that is both required and deprecated.
      </ResponseField>
      <ResponseField name="with_default" type="number" default={42}>
        A field with a default value.
      </ResponseField>
      <ResponseField
        name="all_metadata"
        type="string"
        required
        deprecated
        default="example"
        pre={["readonly"]}
        post={["nullable"]}
      >
        A field with all possible metadata displayed.
      </ResponseField>
    </div>
  ),
};
