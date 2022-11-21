import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CodeBlock } from "../CodeBlock";

export default {
  title: "Interactive/CodeBlock",
  component: CodeBlock,
} as ComponentMeta<typeof CodeBlock>;

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args} />
);

export const WithFileName = Template.bind({});
WithFileName.args = {
  filename: "Example File Name",
  children: <p>Example Code</p>,
};
