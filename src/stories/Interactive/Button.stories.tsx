import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, ButtonProps } from "../../Button";
import { forwardRef, useRef } from "react";

export default {
  title: "Interactive/Button",
  component: Button,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Lorem ipsum",
};

export const Indigo = Template.bind({});
Indigo.args = {
  href: "https://mintlify.com",
  children: "Button Text",
  color: "indigo",
};

const RefButton = forwardRef<"button", ButtonProps<"button">>((args, ref) => (
  <Button {...args} mRef={ref} />
));
RefButton.displayName = "RefButton";
const RefTemplate: ComponentStory<typeof RefButton> = (args) => {
  const ref = useRef<"button">();
  return (
    <RefButton
      {...args}
      ref={ref}
      onClick={(e) => {
        args.onClick?.(e);
        console.log(ref.current);
      }}
    />
  );
};

export const WithCustomClassesAndRef = RefTemplate.bind({});
WithCustomClassesAndRef.args = {
  title: "Card Title",
  children: "Button Text",
  className:
    "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700 focus:ring-purple-500 " +
    "text-purple-500 group-hover:text-purple-600",
};
