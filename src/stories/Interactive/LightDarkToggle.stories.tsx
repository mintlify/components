import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LightDarkToggle } from "../../LightDarkToggle";

export default {
  title: "Interactive/LightDarkToggle",
  component: LightDarkToggle,
} as ComponentMeta<typeof LightDarkToggle>;

// The story is not interactive because we can't control Storybook's theme from the component.
const Template: ComponentStory<typeof LightDarkToggle> = (args) => {
  // Force darkmode when testing that mode
  return (
    <div
      className={
        args.defaultChecked ? "dark bg-slate-900 h-16 w-16 pt-5 pl-4" : ""
      }
    >
      <LightDarkToggle
        defaultChecked={args.defaultChecked}
        onChange={() => {}}
      />
    </div>
  );
};

export const Dark = Template.bind({});
Dark.args = {
  defaultChecked: true,
};

export const Light = Template.bind({});
Light.args = {
  defaultChecked: false,
};
