import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

import { ApiInput } from '../../Api/inputs/ApiInput';
import { ApiInputValue } from '../../Api/types';

export default {
  title: 'Api/ApiInput',
  component: ApiInput,
} as ComponentMeta<typeof ApiInput>;

const Template: ComponentStory<typeof ApiInput> = (args) => {
  const [value, setValue] = useState<any>(args.value);
  return (
    <div className="max-w-md">
      <ApiInput
        param={args.param}
        value={value}
        onChangeParam={(parentInputs: string[], paramName: string, value: ApiInputValue) => {
          setValue(value);
        }}
        // Storybook automatically adds a blank function if we don't do this, and our code
        // shows a garbage can when the delete function exists.
        onDeleteArrayItem={undefined}
      />
    </div>
  );
};

export const TextInputWithPlaceholder = Template.bind({});
TextInputWithPlaceholder.args = {
  param: {
    name: 'Text Input',
    type: 'text',
    placeholder: 'Placeholder Value',
  },
  value: '',
};

export const BooleanInput = Template.bind({});
BooleanInput.args = {
  param: {
    name: 'Boolean Input',
    type: 'boolean',
  },
  value: true,
};

export const EnumInput = Template.bind({});
EnumInput.args = {
  param: {
    name: 'Enum Input',
    type: 'enum',
    enum: ['Enum Option 1', 'Enum Option 2', 'Enum Option 3'],
  },
  value: 'Enum Option 2',
};

export const ArrayInput = Template.bind({});
ArrayInput.args = {
  param: {
    name: 'Array Input',
    type: 'array',
  },
  value: [
    { param: { name: 'This text should be hidden', type: 'text' }, value: 1 },
    { param: { name: 'This text should be hidden', type: 'text' }, value: 2 },
  ],
};

export const ObjectInput = Template.bind({});
ObjectInput.args = {
  param: {
    name: 'Object Input',
    type: 'object',
    required: true,
    properties: [{ name: 'Example Property Name' }, { name: 'camelCasePropertyName' }],
  },
  value: {
    'Example Property Name': 123,
    camelCasePropertyName: 'Example string value',
  },
};

export const FileInput = Template.bind({});
FileInput.args = {
  param: {
    name: 'File Input',
    type: 'file',
  },
  value: '',
};

export const ArrayOfObjectsInput = Template.bind({});
ArrayOfObjectsInput.args = {
  param: {
    name: 'home_feed_contents',
    required: true,
    type: 'array',
    properties: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'price',
        type: 'object',
        properties: [
          {
            name: 'money',
            type: 'object',

            properties: [
              {
                name: 'currency_code',
                type: 'string',
              },
              {
                name: 'units',
                type: 'string',
              },
            ],
          },
          {
            name: 'prefix',
            placeholder: 'PREFIX_UNSPECIFIED',
            type: 'string',
            enum: [
              'PREFIX_UNSPECIFIED',
              'PREFIX_PER_UNIT',
              'PREFIX_PER_SESSION',
              'PREFIX_PER_PERSON',
              'PREFIX_FREE',
            ],
          },
        ],
      },
    ],
  },
  value: [],
};
