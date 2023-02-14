import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { RequestPathHeader } from '../../Api';

export default {
  title: 'Api/RequestPathHeader',
  component: RequestPathHeader,
} as ComponentMeta<typeof RequestPathHeader>;

const Template: ComponentStory<typeof RequestPathHeader> = (args) => (
  <RequestPathHeader
    method={args.method}
    path={args.path}
    baseUrls={args.baseUrls}
    defaultBaseUrl={args.baseUrls[0]}
    onBaseUrlChange={(baseUrl) => console.log(baseUrl)}
  />
);

export const MultipleBaseUrls = Template.bind({});
MultipleBaseUrls.args = {
  method: 'GET',
  path: '/api/example/path',
  baseUrls: ['Base URL 1', 'Base URL 2'],
};
