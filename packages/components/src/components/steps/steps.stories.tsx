import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./steps";
import { Settings } from "lucide-react";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Step 1">
        This is the content of the first step.
      </Steps.Item>
    </Steps>
  ),
};

export const WithCustomNumber: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Step 2" stepNumber={5}>
        This step has a custom step number.
      </Steps.Item>
    </Steps>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Getting Started" icon="rocket">
        Launch your project with this step.
      </Steps.Item>
    </Steps>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Configuration" icon={<Settings />}>
        Configure your settings in this step.
      </Steps.Item>
    </Steps>
  ),
};

export const WithLargeTitle: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Important Step" titleSize="h2">
        This step should have a larger title
      </Steps.Item>
    </Steps>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Advanced Setup">
        <div className="space-y-4">
          <p>This step contains complex content including:</p>
          <ul className="list-disc pl-4">
            <li>Multiple paragraphs</li>
            <li>Lists</li>
            <li>And other HTML elements</li>
          </ul>
        </div>
      </Steps.Item>
    </Steps>
  ),
};

export const LastStep: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Final Step" isLast={true}>
        This is the last step in the sequence.
      </Steps.Item>
    </Steps>
  ),
};

export const WithCustomIconType: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Custom Icon Type" icon="user-check" iconType="solid">
        This step uses a solid icon type.
      </Steps.Item>
    </Steps>
  ),
};

export const WithReactNodeTitle: Story = {
  render: () => (
    <Steps>
      <Steps.Item title={<span className="text-blue-600 dark:text-blue-400">Custom Styled Title</span>}>
        This step has a custom styled title using ReactNode.
      </Steps.Item>
    </Steps>
  ),
};

export const BasicSteps: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="First Step">This is the first step in the sequence.</Steps.Item>
      <Steps.Item title="Second Step">This is the second step in the sequence.</Steps.Item>
      <Steps.Item title="Third Step">This is the final step in the sequence.</Steps.Item>
    </Steps>
  ),
};

export const StepsWithIcons: Story = {
  render: () => (
    <Steps>
      <Steps.Item icon="rocket" title="Getting Started">
        Launch your project with this step.
      </Steps.Item>
      <Steps.Item icon="puzzle" title="Configuration">
        Set up your preferences and configuration.
      </Steps.Item>
      <Steps.Item icon="circle-check" title="Complete">
        You're all set! Your project is ready to go.
      </Steps.Item>
    </Steps>
  ),
};

export const StepsWithCustomNumbers: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Step 5" stepNumber={5}>
        This step has a custom number.
      </Steps.Item>
      <Steps.Item title="Step 6" stepNumber={6}>
        This step continues the custom numbering.
      </Steps.Item>
      <Steps.Item title="Step 7" stepNumber={7}>
        This is the last step with custom numbering.
      </Steps.Item>
    </Steps>
  ),
};

export const StepsWithMixedContent: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Installation">
        <div className="space-y-2">
          <p>Install the required dependencies:</p>
          <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded">npm install</code>
        </div>
      </Steps.Item>
      <Steps.Item title="Configuration">
        <div className="space-y-2">
          <p>Configure your settings:</p>
          <ul className="list-disc pl-4">
            <li>Set up your API keys</li>
            <li>Configure your database</li>
            <li>Set up environment variables</li>
          </ul>
        </div>
      </Steps.Item>
      <Steps.Item title="Deployment">
        <div className="space-y-2">
          <p>Deploy your application:</p>
          <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded">npm run deploy</code>
        </div>
      </Steps.Item>
    </Steps>
  ),
};

export const StepsWithLargeTitles: Story = {
  render: () => (
    <Steps titleSize="h2">
      <Steps.Item title="Important First Step">This step should have a larger title.</Steps.Item>
      <Steps.Item title="Important Second Step">This step also should have a larger title.</Steps.Item>
      <Steps.Item title="Important Final Step">The final step should have a larger title size.</Steps.Item>
    </Steps>
  ),
};

export const StepsWithCustomClassName: Story = {
  render: () => (
    <Steps className="border-2 border-gray-200 rounded-md p-4">
      <Steps.Item title="Important First Step" className="bg-blue-500">This step should have a custom class name.</Steps.Item>
      <Steps.Item title="Important Second Step" className="bg-green-500">This step also should have a custom class name.</Steps.Item>
      <Steps.Item title="Important Final Step" className="bg-yellow-500">The final step should have a custom class name.</Steps.Item>
    </Steps>
  ),
};
