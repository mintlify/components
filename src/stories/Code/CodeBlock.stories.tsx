import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CodeBlock } from "../../Code";

export default {
  title: "Interactive/Code/CodeBlock",
  component: CodeBlock,
} as ComponentMeta<typeof CodeBlock>;

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args}>
    <p>Example Code</p>
  </CodeBlock>
);

export const WithFileName = Template.bind({});
WithFileName.args = {
  filename: "Example File Name",
};

export const FileNameGreenAccents = Template.bind({});
FileNameGreenAccents.args = {
  filename: "Example File Name",
  filenameColor: "#00ff00",
};

export const NoFileName = Template.bind({});
NoFileName.args = {};
