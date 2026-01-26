import type { Meta, StoryObj } from "@storybook/react-vite";
import { Expandable } from "./expandable";

const meta: Meta<typeof Expandable> = {
  title: "Components/Expandable",
  component: Expandable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Expandable>;

export const Default: Story = {
  args: {
    title: "details",
    children: (
      <div className="py-4">
        <p>This is the expandable content that appears when opened.</p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "details",
    defaultOpen: true,
    children: (
      <div className="py-4">
        <p>This expandable starts in the open state.</p>
      </div>
    ),
  },
};

export const CustomTitle: Story = {
  args: {
    title: "advanced options",
    children: (
      <div className="py-4">
        <p>The title prop customizes what appears after "Show" or "Hide".</p>
      </div>
    ),
  },
};

export const CustomToggleText: Story = {
  args: {
    title: "section",
    openedText: "Collapse",
    closedText: "Expand",
    children: (
      <div className="py-4">
        <p>
          Custom toggle text: "Expand section" when closed, "Collapse section"
          when open.
        </p>
      </div>
    ),
  },
};

export const WithClassName: Story = {
  args: {
    title: "styled content",
    className: "bg-blue-50 dark:bg-blue-950",
    children: (
      <div className="py-4">
        <p>Custom className applied to the root element for styling.</p>
      </div>
    ),
  },
};

export const LazyLoading: Story = {
  args: {
    title: "lazy content",
    lazy: true,
    children: (
      <div className="py-4">
        <p>
          With lazy=true, children are not rendered until the expandable is
          first opened.
        </p>
      </div>
    ),
  },
};

export const WithCallbacks: Story = {
  args: {
    title: "interactive content",
    onChange: (open) => console.log("onChange:", open),
    onOpen: () => console.log("onOpen"),
    onClose: () => console.log("onClose"),
    onMount: () => console.log("onMount"),
    children: (
      <div className="py-4">
        <p>
          Toggle this expandable and check the browser console to see the
          callbacks firing.
        </p>
      </div>
    ),
  },
};

export const WithRichContent: Story = {
  args: {
    title: "API response fields",
    defaultOpen: true,
    children: (
      <div className="space-y-3 py-4">
        <div>
          <code className="font-mono text-pink-600 text-sm dark:text-pink-400">
            id
          </code>
          <span className="ml-2 text-sm text-stone-500">string</span>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Unique identifier for the resource.
          </p>
        </div>
        <div>
          <code className="font-mono text-pink-600 text-sm dark:text-pink-400">
            name
          </code>
          <span className="ml-2 text-sm text-stone-500">string</span>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Display name of the resource.
          </p>
        </div>
        <div>
          <code className="font-mono text-pink-600 text-sm dark:text-pink-400">
            createdAt
          </code>
          <span className="ml-2 text-sm text-stone-500">datetime</span>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Timestamp when the resource was created.
          </p>
        </div>
      </div>
    ),
  },
};

export const TranslatedProps: Story = {
  args: {
    title: "atributos secundarios",
    openedText: "Ocultar",
    closedText: "Mostrar",
    children: (
      <div className="py-4">
        <p>Este es el contenido del componente expandible en español.</p>
      </div>
    ),
  },
};
