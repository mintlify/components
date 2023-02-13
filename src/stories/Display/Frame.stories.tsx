import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Frame } from '../../Frame';
import mountain from '../images/mountain.jpeg';

export default {
  title: 'Display/Frame',
  component: Frame,
} as ComponentMeta<typeof Frame>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Frame> = (args) => <Frame {...args} />;

const TestContent = (
  <article style={{ lineHeight: '64px' }}>
    <div style={{ width: '50%', textAlign: 'center', display: 'inline-block' }}>
      <p>Test Content</p>
    </div>
    <div style={{ width: '50%', textAlign: 'center', display: 'inline-block' }}>
      <p>Test Content</p>
    </div>
  </article>
);

const TestParagraph = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

const TestImage = <img src={mountain} />;

export const Default = Template.bind({});
Default.args = {
  children: TestContent,
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: TestParagraph,
};

export const ImageWithCaption = Template.bind({});
ImageWithCaption.args = {
  caption: 'This is a caption',
  children: TestImage,
};
