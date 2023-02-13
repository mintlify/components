import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

import { BaseUrlDropdown } from '../../Api/BaseUrlDropdown';

export default {
  title: 'Api/BaseUrlDropdown',
  component: BaseUrlDropdown,
} as ComponentMeta<typeof BaseUrlDropdown>;

const Template: ComponentStory<typeof BaseUrlDropdown> = (args) => {
  const [_, setSelectedBaseUrl] = useState(args.baseUrls[0] ?? '');

  // You can console.log(selectedBaseUrl) here to test the state is set correctly from onChange().
  // We don't pass the selected value to the component because we don't need it. The <select> tag
  // used internally tracks the state.

  return (
    <BaseUrlDropdown
      baseUrls={args.baseUrls}
      defaultValue={args.baseUrls[0]}
      onChange={(baseUrl) => setSelectedBaseUrl(baseUrl)}
    />
  );
};

export const ThreeOptions = Template.bind({});
ThreeOptions.args = {
  baseUrls: ['Option 1', 'Very Long Option 2', 'Option 3'],
};
