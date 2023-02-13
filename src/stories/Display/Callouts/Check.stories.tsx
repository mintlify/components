import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Check } from '../../../Callouts';

export default {
  title: 'Display/Callouts/Check',
  component: Check,
} as ComponentMeta<typeof Check>;

const Template: ComponentStory<typeof Check> = (args) => <Check {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam sapien et leo suscipit, at elementum ex condimentum.',
};
