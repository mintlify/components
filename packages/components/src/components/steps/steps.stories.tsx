import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./steps";
import { CheckCircle, Zap, Settings } from "lucide-react";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    titleSize: {
      control: "select",
      options: ["p", "h2", "h3", "h4"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

// Basic Usage
export const Default: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="First Step">
        This is the content of the first step. It can contain any text or elements.
      </Steps.Item>
      <Steps.Item title="Second Step">
        This is the content of the second step. Steps are numbered automatically.
      </Steps.Item>
      <Steps.Item title="Third Step">
        This is the content of the third step. The last step has a fading line.
      </Steps.Item>
    </Steps>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Setup" icon="gear">
        Configure your environment and install dependencies.
      </Steps.Item>
      <Steps.Item title="Build" icon="hammer">
        Build your application with the provided tools.
      </Steps.Item>
      <Steps.Item title="Deploy" icon="rocket">
        Deploy your application to production.
      </Steps.Item>
    </Steps>
  ),
};

// With Custom React Icons
export const WithCustomReactIcons: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Configure" icon={<Settings className="h-3 w-3" />}>
        Set up your configuration file with the required options.
      </Steps.Item>
      <Steps.Item title="Initialize" icon={<Zap className="h-3 w-3" />}>
        Initialize the project with your settings.
      </Steps.Item>
      <Steps.Item title="Complete" icon={<CheckCircle className="h-3 w-3" />}>
        Your setup is complete and ready to use.
      </Steps.Item>
    </Steps>
  ),
};

// Different Title Sizes
export const TitleSizeParagraph: Story = {
  render: () => (
    <Steps titleSize="p">
      <Steps.Item title="Paragraph Title">
        Using paragraph (p) size for the title. This is the default size.
      </Steps.Item>
      <Steps.Item title="Another Step">
        Content for the second step.
      </Steps.Item>
    </Steps>
  ),
};

export const TitleSizeH2: Story = {
  render: () => (
    <Steps titleSize="h2">
      <Steps.Item title="H2 Title">
        Using h2 size for the title. This creates larger, more prominent headings.
      </Steps.Item>
      <Steps.Item title="Another Step">
        Content for the second step.
      </Steps.Item>
    </Steps>
  ),
};

export const TitleSizeH3: Story = {
  render: () => (
    <Steps titleSize="h3">
      <Steps.Item title="H3 Title">
        Using h3 size for the title.
      </Steps.Item>
      <Steps.Item title="Another Step">
        Content for the second step.
      </Steps.Item>
    </Steps>
  ),
};

export const TitleSizeH4: Story = {
  render: () => (
    <Steps titleSize="h4">
      <Steps.Item title="H4 Title">
        Using h4 size for the title.
      </Steps.Item>
      <Steps.Item title="Another Step">
        Content for the second step.
      </Steps.Item>
    </Steps>
  ),
};

// Custom Step Numbers
export const CustomStepNumbers: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Starting Point" stepNumber={0}>
        You can customize the step number. This one starts at 0.
      </Steps.Item>
      <Steps.Item title="Continue" stepNumber={5}>
        This step is numbered 5, skipping ahead.
      </Steps.Item>
      <Steps.Item title="Final Step" stepNumber={10}>
        And this step is numbered 10.
      </Steps.Item>
    </Steps>
  ),
};

// Icon Types
export const IconTypes: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Regular Icon" icon="star" iconType="regular">
        Using the regular icon type (default).
      </Steps.Item>
      <Steps.Item title="Solid Icon" icon="star" iconType="solid">
        Using the solid icon type for a filled appearance.
      </Steps.Item>
      <Steps.Item title="Light Icon" icon="star" iconType="light">
        Using the light icon type for a thinner appearance.
      </Steps.Item>
    </Steps>
  ),
};

// Rich Content
export const WithRichContent: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Install Dependencies">
        <p>Run the following command in your terminal:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
          <code>npm install @mintlify/components</code>
        </pre>
      </Steps.Item>
      <Steps.Item title="Import the Component">
        <p>Add the import statement to your file:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
          <code>{`import { Steps } from '@mintlify/components';`}</code>
        </pre>
      </Steps.Item>
      <Steps.Item title="Use in Your App">
        <p>Now you can use the Steps component:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
          <code>{`<Steps>
  <Steps.Item title="Step 1">Content</Steps.Item>
</Steps>`}</code>
        </pre>
      </Steps.Item>
    </Steps>
  ),
};

// Long Content
export const LongContent: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Getting Started with Our Platform">
        Welcome to our comprehensive guide. This step will walk you through everything
        you need to know to get started. We recommend reading through this entire section
        before proceeding to the next steps. Our platform offers a wide range of features
        that will help you build amazing applications quickly and efficiently.
      </Steps.Item>
      <Steps.Item title="Configuration Options">
        There are many configuration options available. You can customize the appearance,
        behavior, and functionality of your application. Each option is documented in
        detail in our API reference. Take your time to explore all the possibilities
        and find the configuration that best suits your needs.
      </Steps.Item>
      <Steps.Item title="Deployment and Beyond">
        Once you have completed the setup and configuration, you are ready to deploy.
        Our deployment process is streamlined and straightforward. Follow the instructions
        in this step carefully to ensure a smooth deployment experience.
      </Steps.Item>
    </Steps>
  ),
};

// Single Step
export const SingleStep: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Only One Step">
        Sometimes you might only need a single step. The component handles this case
        gracefully with proper styling.
      </Steps.Item>
    </Steps>
  ),
};

// Many Steps
export const ManySteps: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Step 1: Planning">
        Define your project requirements and goals.
      </Steps.Item>
      <Steps.Item title="Step 2: Design">
        Create wireframes and mockups for your application.
      </Steps.Item>
      <Steps.Item title="Step 3: Development">
        Write the code and implement the features.
      </Steps.Item>
      <Steps.Item title="Step 4: Testing">
        Test your application thoroughly.
      </Steps.Item>
      <Steps.Item title="Step 5: Review">
        Get feedback and make improvements.
      </Steps.Item>
      <Steps.Item title="Step 6: Deployment">
        Deploy your application to production.
      </Steps.Item>
      <Steps.Item title="Step 7: Monitoring">
        Monitor your application for issues.
      </Steps.Item>
      <Steps.Item title="Step 8: Maintenance">
        Keep your application up to date.
      </Steps.Item>
    </Steps>
  ),
};

// With Custom ClassName
export const WithCustomClassName: Story = {
  render: () => (
    <Steps className="border-l-2 border-blue-500 pl-4">
      <Steps.Item title="Custom Styled Steps" className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
        Both the Steps container and individual Step items support className for custom styling.
      </Steps.Item>
      <Steps.Item title="Another Custom Step" className="bg-green-50 dark:bg-green-900/20 rounded p-2">
        Each step can have its own unique styling.
      </Steps.Item>
    </Steps>
  ),
};

// Without Children (Empty Content)
export const WithoutContent: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Step with no content" />
      <Steps.Item title="Another step with no content" />
      <Steps.Item title="Final step" />
    </Steps>
  ),
};

// Mixed Icons and Numbers
export const MixedIconsAndNumbers: Story = {
  render: () => (
    <Steps>
      <Steps.Item title="Numbered Step">
        This step uses the default number indicator.
      </Steps.Item>
      <Steps.Item title="Icon Step" icon="bolt">
        This step uses a FontAwesome icon.
      </Steps.Item>
      <Steps.Item title="Custom Icon Step" icon={<CheckCircle className="h-3 w-3 text-green-500" />}>
        This step uses a custom React icon.
      </Steps.Item>
      <Steps.Item title="Back to Numbers">
        And back to using a number again.
      </Steps.Item>
    </Steps>
  ),
};
