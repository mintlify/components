import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Info } from "../../../Callouts";
import { CodeBlock } from "../../../Code";

export default {
  title: "Display/Callouts/Info",
  component: Info,
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex condimentum.",
};

export const WithCodeBlock = Template.bind({});
WithCodeBlock.args = {
  children: [
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam
      sapien et leo suscipit, at elementum ex condimentum. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit,
      at elementum ex condimentum. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex
      condimentum.
    </p>,
    <CodeBlock>
      <pre>
        This is a code block. This is a code block. This is a code block. This
        is a code block. This is a code block. This is a code block.
      </pre>
    </CodeBlock>,
  ],
};
