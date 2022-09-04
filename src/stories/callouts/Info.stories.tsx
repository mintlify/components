import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Info } from "../../Callouts";

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
