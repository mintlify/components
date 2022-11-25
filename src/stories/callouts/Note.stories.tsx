import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Note } from "../../Callouts";
import { CodeBlock, CodeGroup } from "../../Code";

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

export const WithCodeGroup = Template.bind({});
WithCodeGroup.args = {
  children: [
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam
      sapien et leo suscipit, at elementum ex condimentum. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit,
      at elementum ex condimentum. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex
      condimentum.
    </p>,
    <CodeGroup>
      <CodeBlock filename="Filename">
        <pre>
          This is a code block. This is a code block. This is a code block. This
          is a code block. This is a code block. This is a code block.
        </pre>
      </CodeBlock>
    </CodeGroup>,
  ],
};
