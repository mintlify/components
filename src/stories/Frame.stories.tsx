import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Frame } from "../Frame";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Frame",
  component: Frame,
} as ComponentMeta<typeof Frame>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Frame> = (args) => <Frame {...args} />;

const TestContent = (
  <article style={{ lineHeight: "64px" }}>
    <div style={{ width: "50%", textAlign: "center", display: "inline-block" }}>
      <p>First Half</p>
    </div>
    <div style={{ width: "50%", textAlign: "center", display: "inline-block" }}>
      <p>Second Half</p>
    </div>
  </article>
);

export const Default = Template.bind({});
Default.args = {
  children: TestContent,
};
