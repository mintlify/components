import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Note } from "../../Callouts";
import { CodeBlock } from "../../Code";

export default {
  title: "Display/Callouts/Note",
  component: Note,
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = (args) => <Note {...args} />;

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
    <CodeBlock>This is a code block.</CodeBlock>,
  ],
};
