import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Expandable } from '../../Expandable';
import { ParamField } from '../../Param';

export default {
  title: 'Interactive/Expandable',
  component: Expandable,
} as ComponentMeta<typeof Expandable>;

const Template: ComponentStory<typeof Expandable> = (args) => <Expandable {...args} />;

const TestParamFields = (
  <>
    <ParamField name="variable_name" type="query" required>
      Param description.
    </ParamField>
    <ParamField name="variable_name_2" type="query" defaultValue="example_default">
      Param description.
    </ParamField>
    <ParamField name="variable_name_3" type="body" optional={true}>
      Param description.
    </ParamField>
  </>
);

export const Default = Template.bind({});
Default.args = {
  title: 'properties',
  children: TestParamFields,
};
