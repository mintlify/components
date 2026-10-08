import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "check", "warning", "danger"],
      description: "Predefined toast variant",
    },
    action: {
      control: "object",
      description:
        "Optional call to action. Pressing it runs onClick and closes the toast",
    },
    dismissible: {
      control: "boolean",
      description: "Show a close button that dismisses the toast",
    },
    onDismiss: {
      action: "dismissed",
      description: "Called when the close button is pressed",
    },
    dismissLabel: {
      control: "text",
      description: "Accessible label for the close button",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the toast",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const action = { label: "Continue", onClick: () => undefined };

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Your unsaved changes will be discarded.",
    action,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["info", "check", "warning", "danger"] as const).map((variant) => (
        <Toast action={action} key={variant} variant={variant}>
          A toast with the {variant} variant.
        </Toast>
      ))}
    </div>
  ),
};

export const LongText: Story = {
  args: {
    variant: "warning",
    children:
      "Long messages wrap beside the icon while the action and close button stay centered on the first line of text, even when the message runs onto several lines.",
    action,
  },
};

export const Narrow: Story = {
  render: () => (
    <div className="w-72">
      <Toast action={action} variant="warning">
        In a narrow container, the action and close button move below the
        message.
      </Toast>
    </div>
  ),
};

export const EdgeToEdge: Story = {
  args: {
    variant: "warning",
    children: "Remove the rounding to run the toast edge to edge.",
    action,
    className: "rounded-none",
  },
};

export const NotDismissible: Story = {
  args: {
    variant: "warning",
    children: "Only the action can close this toast.",
    action,
    dismissible: false,
  },
};

export const DismissOnly: Story = {
  args: {
    variant: "info",
    children: "A toast without an action.",
  },
};
