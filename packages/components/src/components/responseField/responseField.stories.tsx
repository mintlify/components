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
      description: "Response field name",
    },
    type: {
      control: "text",
      description: "Field type (e.g., string, number, boolean)",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required in the response",
    },
    deprecated: {
      control: "boolean",
      description: "Whether the field is deprecated",
    },
    hidden: {
      control: "boolean",
      description: "Whether to hide the field",
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

export const StringField: Story = {
  args: {
    name: "name",
    type: "string",
    children: "The name of the resource.",
  },
};

export const IntegerField: Story = {
  args: {
    name: "count",
    type: "integer",
    children: "Total number of items.",
  },
};

export const BooleanField: Story = {
  args: {
    name: "is_active",
    type: "boolean",
    default: true,
    children: "Whether the resource is currently active.",
  },
};

export const ObjectField: Story = {
  args: {
    name: "user",
    type: "object",
    children: "The user object containing profile information.",
  },
};

export const ArrayField: Story = {
  args: {
    name: "items",
    type: "array",
    children: "An array of item objects.",
  },
};

export const DatetimeField: Story = {
  args: {
    name: "created_at",
    type: "datetime",
    children: "ISO 8601 timestamp when the resource was created.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    name: "status",
    type: "string",
    default: "pending",
    children: "Current status of the resource.",
  },
};

export const RequiredField: Story = {
  args: {
    name: "id",
    type: "string",
    required: true,
    children: "This field is always present in the response.",
  },
};

export const DeprecatedField: Story = {
  args: {
    name: "legacy_id",
    type: "string",
    deprecated: true,
    children: "Use 'id' instead. Will be removed in v3.0.",
  },
};

export const WithPreMetadata: Story = {
  args: {
    name: "new_field",
    type: "string",
    pre: ["v2.0"],
    children: "This field was introduced in version 2.0.",
  },
};

export const WithPostMetadata: Story = {
  args: {
    name: "nested_data",
    type: "object",
    post: ["expandable", "nullable"],
    children: "Nested data that can be expanded with ?expand=nested_data.",
  },
};

export const NullableField: Story = {
  args: {
    name: "optional_value",
    type: "string",
    post: ["nullable"],
    children: "This field may be null if not set.",
  },
};

export const ExpandableField: Story = {
  args: {
    name: "relationships",
    type: "object",
    post: ["expandable"],
    children: "Related resources. Include ?expand=relationships to populate.",
  },
};

export const HiddenField: Story = {
  args: {
    name: "internal_field",
    type: "string",
    hidden: true,
    children: "This field should not be visible.",
  },
};

export const ComplexField: Story = {
  args: {
    name: "metadata",
    type: "object",
    pre: ["beta"],
    post: ["nullable", "expandable"],
    default: {},
    children: (
      <div>
        <p>Additional metadata associated with the resource.</p>
        <ul>
          <li>Can contain arbitrary key-value pairs</li>
          <li>Keys must be strings</li>
          <li>Values can be strings, numbers, or booleans</li>
        </ul>
      </div>
    ),
  },
};

export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-0">
      <ResponseField name="id" type="string" required>
        Unique identifier for the resource.
      </ResponseField>
      <ResponseField name="name" type="string" required>
        Display name of the resource.
      </ResponseField>
      <ResponseField name="description" type="string" post={["nullable"]}>
        Optional description text.
      </ResponseField>
      <ResponseField name="created_at" type="datetime" required>
        Creation timestamp in ISO 8601 format.
      </ResponseField>
      <ResponseField name="updated_at" type="datetime">
        Last update timestamp.
      </ResponseField>
      <ResponseField name="metadata" type="object" post={["expandable"]}>
        Additional metadata.
      </ResponseField>
    </div>
  ),
};

export const ApiResponseExample: Story = {
  render: () => (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        GET /api/users/:id Response
      </h3>
      <div className="space-y-0">
        <ResponseField name="id" type="string" required>
          The unique identifier for the user (UUID format).
        </ResponseField>
        <ResponseField name="email" type="string" required>
          The user&apos;s email address.
        </ResponseField>
        <ResponseField name="name" type="string">
          The user&apos;s display name.
        </ResponseField>
        <ResponseField name="avatar_url" type="string" post={["nullable"]}>
          URL to the user&apos;s avatar image.
        </ResponseField>
        <ResponseField name="role" type="string" default="member">
          User role. One of: admin, member, guest.
        </ResponseField>
        <ResponseField name="is_verified" type="boolean" default={false}>
          Whether the user&apos;s email has been verified.
        </ResponseField>
        <ResponseField name="created_at" type="datetime" required>
          When the user account was created.
        </ResponseField>
        <ResponseField name="last_login" type="datetime" post={["nullable"]}>
          Timestamp of the user&apos;s last login.
        </ResponseField>
      </div>
    </div>
  ),
};

export const WithCustomLabels: Story = {
  args: {
    name: "campo",
    type: "string",
    required: true,
    deprecated: true,
    default: "valor",
    labels: {
      required: "requerido",
      deprecated: "obsoleto",
      default: "predeterminado: ",
    },
    children: "Campo de respuesta con etiquetas en espanol.",
  },
};

export const WithCustomClassName: Story = {
  args: {
    name: "styled_response",
    type: "object",
    className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4",
    children: "This response field has custom styling.",
  },
};
