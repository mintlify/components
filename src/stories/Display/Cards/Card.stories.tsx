import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';
import { forwardRef, useRef } from 'react';

import { Card, CardProps } from '../../../Card';

export default {
  title: 'Display/Cards/Card',
  component: Card,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;
const defaultText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae porta arcu. Nam nec congue tellus. Nunc eleifend fermentum tortor, nec consectetur libero molestie eget. Nulla rhoncus elit eu mi auctor fringilla. Quisque et mattis eros, eu hendrerit libero. Mauris in erat ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque velit nisi, ornare at tincidunt ac, euismod sit amet ligula. In sodales ligula quis vestibulum lacinia. Pellentesque ut elit lectus. Sed tristique nunc nulla, non ultricies turpis eleifend non. Quisque viverra mauris vel sapien dictum, et elementum ante accumsan.';

export const Default = Template.bind({});
Default.args = {
  title: defaultText.substring(0, 26),
  children: defaultText,
};

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const imageIcon = 'https://avatars.githubusercontent.com/u/93011474?s=200&v=4';
const image =
  "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  title: 'Card Title',
  icon,
  children: 'Card text.',
};

export const WithCustomImageIcon = Template.bind({});
WithCustomImageIcon.args = {
  title: "Card Title",
  icon: imageIcon,
  children: "Card text.",
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: "Card Title",
  image: image,
  children: "Card text.",
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  icon,
  children: 'The card text should be darker if there is no title.',
};

const RefCard = forwardRef<'div' | undefined, CardProps<'div'>>((args, ref) => (
  <Card {...args} mRef={ref} />
));
RefCard.displayName = 'RefCard';
const RefTemplate: ComponentStory<typeof RefCard> = (args) => {
  const ref = useRef<'div'>();
  return (
    <RefCard
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
  title: 'Card Title',
  children: 'Card text.',
  className:
    'bg-red-100 border-red-200 hover:border-red-800 dark:border-red-600 dark:hover:border-red-400',
};
