import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../Button";

export default {
  title: "Interactive/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "https://mintlify.com",
  children: "Button Text",
};

export const Indigo = Template.bind({});
Indigo.args = {
  href: "https://mintlify.com",
  children: "Button Text",
  color: "indigo",
};
