import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CodeBlock, CodeGroup } from "../../Code";

export default {
  title: "Interactive/Code/CodeGroup",
  component: CodeGroup,
} as ComponentMeta<typeof CodeGroup>;

const Template: ComponentStory<typeof CodeGroup> = (args) => (
  <CodeGroup {...args} />
);

export const OneChild = Template.bind({});
OneChild.args = {
  children: (
    <CodeBlock filename="Very Very Very Long Filename" filenameColor="#00ff00">
      <p>Example Code</p>
    </CodeBlock>
  ),
};

export const TwoChildren = Template.bind({});
TwoChildren.args = {
  children: [
    <CodeBlock filename="Name 1" filenameColor="#00ff00">
      <p>First Page of Code</p>
    </CodeBlock>,
    <CodeBlock filename="Name 2" filenameColor="#ffff00">
      <p>Second Page of Code</p>
    </CodeBlock>,
  ],
};
