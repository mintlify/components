import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { RequestMethodBubble } from '../../Api';

export default {
  title: 'Api/RequestMethodBubble',
  component: RequestMethodBubble,
} as ComponentMeta<typeof RequestMethodBubble>;

const Template: ComponentStory<typeof RequestMethodBubble> = (args) => (
  <RequestMethodBubble {...args} />
);

export const GET = Template.bind({});
GET.args = {
  method: 'GET',
};

export const POST = Template.bind({});
POST.args = {
  method: 'POST',
};

export const PUT = Template.bind({});
PUT.args = {
  method: 'PUT',
};

export const DELETE = Template.bind({});
DELETE.args = {
  method: 'DELETE',
};

export const PATCH = Template.bind({});
PATCH.args = {
  method: 'PATCH',
};

export const OPTIONS = Template.bind({});
OPTIONS.args = {
  method: 'OPTIONS',
};
