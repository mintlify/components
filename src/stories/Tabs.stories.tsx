import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tab, Tabs } from "../Tabs";

export default {
  title: "Display/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs>{args.children}</Tabs>
);

export const TwoTabs = Template.bind({});
TwoTabs.args = {
  children: [
    <Tab title="Lorem Titalis 1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Tab>,
    <Tab title="Ipsum Titalis 2">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </Tab>,
  ],
};
