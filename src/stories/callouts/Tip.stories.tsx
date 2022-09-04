import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tip } from "../../Callouts";

export default {
  title: "Display/Callouts/Tip",
  component: Tip,
} as ComponentMeta<typeof Tip>;

const Template: ComponentStory<typeof Tip> = (args) => <Tip {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex condimentum.",
};
