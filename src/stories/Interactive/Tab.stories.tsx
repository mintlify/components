import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Tab } from '../../Tabs';

export default {
  title: 'Display/Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Tab Title',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const InactiveTab = Template.bind({});
InactiveTab.args = {
  title: 'Inactive Tab Title',
  isActive: false,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
