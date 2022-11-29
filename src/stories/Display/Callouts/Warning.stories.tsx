import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Warning } from "../../../Callouts";

export default {
  title: "Display/Callouts/Warning",
  component: Warning,
} as ComponentMeta<typeof Warning>;

const Template: ComponentStory<typeof Warning> = (args) => (
  <Warning {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex condimentum.",
};
