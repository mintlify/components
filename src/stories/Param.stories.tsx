import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Param } from "../Param";

export default {
  title: "Display/Param",
  component: Param,
} as ComponentMeta<typeof Param>;

const Template: ComponentStory<typeof Param> = (args) => <Param {...args} />;

export const JustNameAndType = Template.bind({});
JustNameAndType.args = {
  name: "param_name",
  type: "body",
  children: "Param description.",
};

export const IsRequired = Template.bind({});
IsRequired.args = {
  name: "param_name",
  type: "body",
  required: true,
  children: "Param description.",
};

export const HasDefaultValue = Template.bind({});
HasDefaultValue.args = {
  name: "param_name",
  type: "body",
  defaultValue: "123",
  children: "Param description.",
};
