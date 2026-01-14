import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ParamField,
  ResponseField,
  Property,
  InfoPill,
  RequiredPill,
  DeprecatedPill,
} from "./paramField";

const meta: Meta<typeof ParamField> = {
  title: "Components/ParamField",
  component: ParamField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    query: {
      control: "text",
      description: "Query parameter name",
    },
    path: {
      control: "text",
      description: "Path parameter name",
    },
    body: {
      control: "text",
      description: "Body parameter name",
    },
    header: {
      control: "text",
      description: "Header parameter name",
    },
    type: {
      control: "text",
      description: "Parameter type (e.g., string, number, boolean)",
    },
    required: {
      control: "boolean",
      description: "Whether the parameter is required",
    },
    deprecated: {
      control: "boolean",
      description: "Whether the parameter is deprecated",
    },
    hidden: {
      control: "boolean",
      description: "Whether to hide the parameter",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParamField>;

// ----- ParamField Stories -----

export const Default: Story = {
  args: {
    body: "user_id",
    type: "string",
    children: "The unique identifier for the user.",
  },
};

export const QueryParam: Story = {
  args: {
    query: "page",
    type: "integer",
    default: 1,
    children: "The page number for pagination.",
  },
};

export const PathParam: Story = {
  args: {
    path: "id",
    type: "string",
    required: true,
    children: "The unique identifier for the resource.",
  },
};

export const BodyParam: Story = {
  args: {
    body: "email",
    type: "string",
    required: true,
    children: "The email address of the user.",
  },
};

export const HeaderParam: Story = {
  args: {
    header: "Authorization",
    type: "string",
    required: true,
    children: "Bearer token for authentication.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    query: "limit",
    type: "integer",
    default: 10,
    children: "Maximum number of items to return.",
  },
};

export const RequiredField: Story = {
  args: {
    body: "name",
    type: "string",
    required: true,
    children: "The name is required for creating a new resource.",
  },
};

export const DeprecatedField: Story = {
  args: {
    query: "old_param",
    type: "string",
    deprecated: true,
    children:
      "This parameter is deprecated and will be removed in a future version. Use new_param instead.",
  },
};

export const RequiredAndDeprecated: Story = {
  args: {
    body: "legacy_id",
    type: "string",
    required: true,
    deprecated: true,
    children:
      "Still required but deprecated. Will be removed in v2.0.",
  },
};

export const HiddenField: Story = {
  args: {
    body: "internal_field",
    type: "string",
    hidden: true,
    children: "This should not be visible.",
  },
};

export const WithLocation: Story = {
  args: {
    body: "data",
    type: "object",
    location: "body",
    children: "The request payload.",
  },
};

export const WithPreMetadata: Story = {
  args: {
    body: "user_id",
    type: "string",
    pre: ["v2.0"],
    children: "Introduced in version 2.0.",
  },
};

export const WithPostMetadata: Story = {
  args: {
    body: "status",
    type: "string",
    post: ["read-only"],
    children: "The current status of the resource.",
  },
};

export const WithPreAndPostMetadata: Story = {
  args: {
    body: "metadata",
    type: "object",
    pre: ["beta"],
    post: ["nullable", "expandable"],
    children: "Additional metadata for the resource.",
  },
};

export const ComplexField: Story = {
  args: {
    body: "address",
    type: "object",
    required: true,
    pre: ["v2.0"],
    post: ["expandable"],
    default: { city: "New York" },
    children: (
      <div>
        <p>The address object containing location information.</p>
        <ul>
          <li>street - Street address</li>
          <li>city - City name</li>
          <li>country - Country code</li>
        </ul>
      </div>
    ),
  },
};

export const WithRichContent: Story = {
  args: {
    body: "options",
    type: "array",
    children: (
      <div className="prose prose-sm dark:prose-invert">
        <p>An array of option objects. Each option can have:</p>
        <ul>
          <li>
            <code>id</code> - Unique identifier
          </li>
          <li>
            <code>label</code> - Display label
          </li>
          <li>
            <code>value</code> - Option value
          </li>
        </ul>
        <p>
          <strong>Note:</strong> At least one option must be provided.
        </p>
      </div>
    ),
  },
};

// ----- ResponseField Stories -----

export const ResponseFieldDefault: StoryObj<typeof ResponseField> = {
  render: () => (
    <ResponseField name="id" type="string">
      The unique identifier for the created resource.
    </ResponseField>
  ),
};

export const ResponseFieldWithAllOptions: StoryObj<typeof ResponseField> = {
  render: () => (
    <ResponseField
      name="data"
      type="object"
      required
      pre={["v2.0"]}
      post={["nullable"]}
      default={{ status: "active" }}
    >
      The response data object containing the resource details.
    </ResponseField>
  ),
};

// ----- Property Namespace Stories -----

export const PropertyParamUsage: Story = {
  render: () => (
    <Property.Param body="email" type="string" required>
      User email address for notifications.
    </Property.Param>
  ),
};

export const PropertyResponseUsage: Story = {
  render: () => (
    <Property.Response name="created_at" type="datetime">
      The timestamp when the resource was created.
    </Property.Response>
  ),
};

// ----- Pills Stories -----

export const InfoPillStory: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <InfoPill>string</InfoPill>
      <InfoPill>integer</InfoPill>
      <InfoPill>boolean</InfoPill>
      <InfoPill>object</InfoPill>
      <InfoPill>array</InfoPill>
      <InfoPill prefix="default: ">null</InfoPill>
      <InfoPill prefix="max: ">100</InfoPill>
    </div>
  ),
};

export const RequiredPillStory: Story = {
  render: () => (
    <div className="flex gap-2">
      <RequiredPill />
      <RequiredPill label="required *" />
      <RequiredPill label="mandatory" />
    </div>
  ),
};

export const DeprecatedPillStory: Story = {
  render: () => (
    <div className="flex gap-2">
      <DeprecatedPill />
      <DeprecatedPill label="deprecated (v2.0)" />
      <DeprecatedPill label="legacy" />
    </div>
  ),
};

// ----- Multiple Fields Story -----

export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-0">
      <ParamField body="name" type="string" required>
        The name of the resource.
      </ParamField>
      <ParamField body="description" type="string">
        An optional description for the resource.
      </ParamField>
      <ParamField body="tags" type="array" default={[]}>
        Array of tags to categorize the resource.
      </ParamField>
      <ParamField body="metadata" type="object" post={["expandable"]}>
        Additional metadata as key-value pairs.
      </ParamField>
    </div>
  ),
};

export const MixedParamAndResponseFields: Story = {
  render: () => (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Request Parameters
      </h3>
      <div className="space-y-0 mb-8">
        <ParamField body="name" type="string" required>
          The name of the user.
        </ParamField>
        <ParamField body="email" type="string" required>
          The email address.
        </ParamField>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Response Fields
      </h3>
      <div className="space-y-0">
        <ResponseField name="id" type="string">
          The unique identifier.
        </ResponseField>
        <ResponseField name="created_at" type="datetime">
          Creation timestamp.
        </ResponseField>
        <ResponseField name="status" type="string" default="pending">
          Current status.
        </ResponseField>
      </div>
    </div>
  ),
};

// ----- Custom Labels Story -----

export const WithCustomLabels: Story = {
  args: {
    body: "nombre",
    type: "string",
    required: true,
    deprecated: true,
    default: "Usuario",
    labels: {
      required: "requerido",
      deprecated: "obsoleto",
      default: "predeterminado: ",
      navigateToHeader: "Navegar a esta seccion",
    },
    children: "Nombre del usuario (etiquetas personalizadas en espanol).",
  },
};

// ----- Custom Styling Story -----

export const WithCustomClassName: Story = {
  args: {
    body: "styled_field",
    type: "string",
    className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4",
    children: "This field has custom styling applied via className.",
  },
};
