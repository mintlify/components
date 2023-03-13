import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

import { ApiPlayground, RequestPathHeader } from '../../Api';

export default {
  title: 'Api/ApiPlayground',
  component: ApiPlayground,
} as ComponentMeta<typeof ApiPlayground>;

const Template: ComponentStory<typeof ApiPlayground> = (args) => {
  const [paramValues, setParamValues] = useState<Record<string, Record<string, unknown>>>(
    args.paramValues
  );

  args.paramValues = paramValues;
  args.onChangeParamValues = setParamValues;
  return <ApiPlayground {...args} />;
};

const testParamGroups = [
  {
    name: 'Body',
    params: [
      {
        name: 'Text Input',
        type: 'text',
        placeholder: 'Placeholder Value',
      },
      {
        name: 'File Input',
        type: 'file',
      },
      {
        name: 'Array Input',
        type: 'array',
      },
      {
        name: 'Object Input',
        type: 'object',
        properties: [
          { name: 'Example Property Name', type: 'number' },
          { name: 'camelCasePropertyName', type: 'string' },
        ],
      },
    ],
  },
  {
    name: 'Path',
    params: [
      {
        name: 'Text Input Second Page',
        type: 'text',
        required: true,
      },
    ],
  },
];

const testParamValues = {
  Body: {
    'Text Input': '',
    'Array Input': [
      { param: { name: 'This text should be hidden', type: 'text' }, value: 1 },
      { param: { name: 'This text should be hidden', type: 'text' }, value: 2 },
    ],
    'Object Input': {
      'Example Property Name': 123,
      camelCasePropertyName: 'Example string value',
    },
  },
  Path: {
    'Text Input Second Page': '',
  },
};

export const HeaderButNoResponse = Template.bind({});
HeaderButNoResponse.args = {
  method: 'GET',
  header: (
    <RequestPathHeader
      method="GET"
      path="/api/example/path"
      baseUrls={['Base URL 1', 'Base URL 2']}
      onBaseUrlChange={(baseUrl) => {
        console.log(baseUrl);
      }}
    />
  ),
  paramGroups: testParamGroups,
  paramValues: testParamValues,
  isSendingRequest: false,
};

export const NoHeader = Template.bind({});
NoHeader.args = {
  method: 'PATCH',
  paramGroups: testParamGroups,
  paramValues: testParamValues,
  isSendingRequest: false,
};
