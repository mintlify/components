import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { Steps } from '../../Steps';

export default {
  title: 'Display/Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => (
  <div className="ml-16 mt-8">
    <Steps {...args} />
  </div>
);

export const Default = Template.bind({});
// Default.args = {
//   tip: 'Text shows on hover. We are making it long to see how text wraps.',
//   children: 'Text should be a dotted underline',
// };
