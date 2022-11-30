import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PillSelect } from "../../PillSelect";

export default {
  title: "Interactive/PillSelect",
  component: PillSelect,
} as ComponentMeta<typeof PillSelect>;

const Template: ComponentStory<typeof PillSelect> = (args) => (
  <PillSelect {...args} />
);

export const ThreeOptions = Template.bind({});
ThreeOptions.args = {
  options: ["Option 1", "Option 2", "Extremely long option 3"],
};
