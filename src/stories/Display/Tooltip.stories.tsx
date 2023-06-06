import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';

export default {
  title: 'Display/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className="ml-16 mt-8">
    <Tooltip {...args} />
  </div>
);

export const WrappingText = Template.bind({});
WrappingText.args = {
  tip: 'Text shows on hover. We are making it long to see how text wraps.',
  children: 'Text should be a dotted underline',
};

export const LongTooltip = Template.bind({});
LongTooltip.args = {
  tip: 'Text shows on hover. We are making this one extra long to show how the tooltip wraps when the text inside it is longer than a certain length.',
  children: 'Text should be a dotted underline',
};

export const WrappingLetter = Template.bind({});
WrappingLetter.args = {
  tip: 'Text shows on hover',
  children: 'A',
};

export const WrappingAnElement = Template.bind({});
WrappingAnElement.args = {
  tip: 'Text shows on hover',
  children: <Button href="https://mintlify.com">Hover Me</Button>,
};
