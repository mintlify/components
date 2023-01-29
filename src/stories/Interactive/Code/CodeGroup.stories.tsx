import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Accordion } from "../../../Accordion";
import { CodeBlock, CodeGroup } from "../../../Code";

export default {
  title: "Interactive/Code/CodeGroup",
  component: CodeGroup,
  decorators: [
    (Story) => (
      <div className={"mt-6"}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CodeGroup>;

const Template: ComponentStory<typeof CodeGroup> = ({ children, ...props }) => (
  <CodeGroup {...props}>{children}</CodeGroup>
);

const TemplateInsideAccordion: ComponentStory<typeof CodeGroup> = ({
  children,
  ...props
}) => (
  <Accordion
    title="Accordion"
    description="Testing to see the CodeGroup shrinks to fit inside an Accordion"
    defaultOpen={true}
  >
    <CodeGroup {...props}>{children}</CodeGroup>
  </Accordion>
);

export const OneChild = Template.bind({});
OneChild.args = {
  selectedColor: "#ffff00",
  copiedTooltipColor: "#0000ff",
  children: (
    <CodeBlock filename="Very Very Very Long Filename">
      <p>Example Code</p>
    </CodeBlock>
  ),
};

export const ThreeChildren = Template.bind({});
ThreeChildren.args = {
  selectedColor: "#ffff00",
  copiedTooltipColor: "#0000ff",
  children: [
    <CodeBlock filename="Name 1">
      <p>First Page of Code</p>
    </CodeBlock>,
    <CodeBlock filename="Duplicated Name, But Different Content">
      <p>Second Page of Code</p>
      <p>The next line of code is as long as possible to test scrolling:</p>
      <p>
        Loremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsum
      </p>
    </CodeBlock>,
    <CodeBlock filename="Duplicated Name, But Different Content">
      <p>Third Page of Code</p>
      <p>Second Line on Third Page of Code</p>
    </CodeBlock>,
  ],
};

export const InsideAccordionWithTwoChildren = TemplateInsideAccordion.bind({});
InsideAccordionWithTwoChildren.args = {
  selectedColor: "#ffff00",
  copiedTooltipColor: "#0000ff",
  children: [
    <CodeBlock filename="Name 1">
      <p>First Page of Code</p>
    </CodeBlock>,
    <CodeBlock filename="Name 2">
      <p>Second Page of Code</p>
      <p>Second Line on Second Page of Code</p>
    </CodeBlock>,
  ],
};
