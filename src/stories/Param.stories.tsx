import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ParamField } from "../Param";

export default {
  title: "Display/Param",
  component: ParamField,
} as ComponentMeta<typeof ParamField>;

const Template: ComponentStory<typeof ParamField> = (args) => (
  <ParamField {...args} />
);

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

export const IsOptional = Template.bind({});
IsOptional.args = {
  name: "param_name",
  type: "body",
  optional: true,
  children: "Param description.",
};

export const IsBothRequiredAndOptional = Template.bind({});
IsBothRequiredAndOptional.args = {
  name: "param_name",
  type: "body",
  required: true,
  optional: true,
  children: "Param description.",
};

export const HasDefaultValue = Template.bind({});
HasDefaultValue.args = {
  name: "param_name",
  type: "body",
  defaultValue: "123",
  children: "Param description.",
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  name: "param_name",
  type: "body",
  defaultValue: "123",
  nameClasses: "text-pink-700 dark:text-pink-300",
  children: "Param description.",
};
