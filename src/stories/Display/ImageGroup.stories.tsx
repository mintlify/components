import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { ImageGroup } from '../../ImageGroup';

export default {
  title: 'Display/ImageGroup',
  component: ImageGroup,
} as ComponentMeta<typeof ImageGroup>;

const Template: ComponentStory<typeof ImageGroup> = (args) => <ImageGroup {...args} />;

const ThreeCards = (
  <>
    <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80" />
    <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" />
  </>
);

export const OneColumn = Template.bind({});
OneColumn.args = {
  cols: 1,
  children: ThreeCards,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  cols: 2,
  children: ThreeCards,
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  cols: 3,
  children: ThreeCards,
};
