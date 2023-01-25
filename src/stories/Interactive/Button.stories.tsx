import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../../Button";

export default {
  title: "Interactive/Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button Text",
};

export const Indigo = Template.bind({});
Indigo.args = {
  href: "https://mintlify.com",
  children: "Button Text",
  color: "indigo",
};

export const WithCustomClasses = Template.bind({});
WithCustomClasses.args = {
  title: "Card Title",
  children: "Button Text",
  href: "https://mintlify.com",
  color: "pink",
  className:
    "bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-800 dark:border-red-600 dark:hover:border-red-400",
};
