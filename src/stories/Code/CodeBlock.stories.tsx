import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Accordion } from "../../Accordion";
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

const TemplateInsideAccordion: ComponentStory<typeof CodeBlock> = (args) => (
  <Accordion
    title="Accordion"
    description="Testing to see the CodeBlock shrinks to fit inside an Accordion"
    defaultOpen={true}
  >
    <CodeBlock {...args}>
      <p>Example Code</p>
    </CodeBlock>
  </Accordion>
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

export const InsideAccordionNoFileName = TemplateInsideAccordion.bind({});

export const InsideAccordionWithFileName = TemplateInsideAccordion.bind({});
InsideAccordionWithFileName.args = {
  filename: "Example File Name",
  filenameColor: "#00ff00",
};
