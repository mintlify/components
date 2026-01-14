import type { Meta, StoryObj } from "@storybook/react-vite";
import { Columns } from "./columns";

const meta: Meta<typeof Columns> = {
  title: "Components/Columns",
  component: Columns,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
      description: "Number of columns to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Columns>;

const DemoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{children}</p>
  </div>
);

export const Default: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <DemoCard title="Column 1">This is the first column content.</DemoCard>
        <DemoCard title="Column 2">This is the second column content.</DemoCard>
        <DemoCard title="Column 3">This is the third column content.</DemoCard>
        <DemoCard title="Column 4">This is the fourth column content.</DemoCard>
      </>
    ),
  },
};

export const SingleColumn: Story = {
  args: {
    cols: 1,
    children: (
      <>
        <DemoCard title="Item 1">Full width content in a single column.</DemoCard>
        <DemoCard title="Item 2">Each item spans the entire width.</DemoCard>
        <DemoCard title="Item 3">Useful for stacked layouts.</DemoCard>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <DemoCard title="Feature A">Description for feature A.</DemoCard>
        <DemoCard title="Feature B">Description for feature B.</DemoCard>
        <DemoCard title="Feature C">Description for feature C.</DemoCard>
        <DemoCard title="Feature D">Description for feature D.</DemoCard>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        <DemoCard title="Plan Basic">Ideal for individuals.</DemoCard>
        <DemoCard title="Plan Pro">Best for small teams.</DemoCard>
        <DemoCard title="Plan Enterprise">For large organizations.</DemoCard>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    children: (
      <>
        <DemoCard title="Step 1">Get started.</DemoCard>
        <DemoCard title="Step 2">Configure settings.</DemoCard>
        <DemoCard title="Step 3">Test integration.</DemoCard>
        <DemoCard title="Step 4">Go live!</DemoCard>
      </>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    cols: 2,
    className: "gap-6",
    children: (
      <>
        <DemoCard title="Custom Gap">This example uses a custom gap class.</DemoCard>
        <DemoCard title="Larger Spacing">Notice the increased spacing between items.</DemoCard>
      </>
    ),
  },
};

export const MixedContent: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            Styled Card
          </h3>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            Cards with custom backgrounds.
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <h3 className="font-semibold text-green-900 dark:text-green-100">
            Another Style
          </h3>
          <p className="mt-1 text-sm text-green-700 dark:text-green-300">
            Different color scheme.
          </p>
        </div>
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Dashed Border
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Placeholder style card.
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-950 dark:to-pink-950">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">
            Gradient
          </h3>
          <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
            With gradient background.
          </p>
        </div>
      </>
    ),
  },
};

export const StringColumnCount: Story = {
  name: "String Column Count (MDX compatibility)",
  args: {
    cols: "3",
    children: (
      <>
        <DemoCard title="One">First item.</DemoCard>
        <DemoCard title="Two">Second item.</DemoCard>
        <DemoCard title="Three">Third item.</DemoCard>
      </>
    ),
  },
};
