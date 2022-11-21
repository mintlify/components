import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CodeBlock } from "../CodeBlock";

export default {
  title: "Interactive/CodeBlock",
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
