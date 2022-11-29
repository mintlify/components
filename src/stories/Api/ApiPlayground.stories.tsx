import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ApiPlayground, RequestPathHeader } from "../../Api";

export default {
  title: "Api/ApiPlayground",
  component: ApiPlayground,
} as ComponentMeta<typeof ApiPlayground>;

const Template: ComponentStory<typeof ApiPlayground> = (args) => (
  <ApiPlayground {...args} />
);

export const HeaderButNoResponse = Template.bind({});
HeaderButNoResponse.args = {
  method: "GET",
  header: (
    <RequestPathHeader
      method="GET"
      path="/api/example/path"
      baseUrls={["Base URL 1", "Base URL 2"]}
      onBaseUrlChange={(baseUrl) => {
        console.log(baseUrl);
      }}
    />
  ),
};

export const NoHeader = Template.bind({});
NoHeader.args = {
  method: "PATCH",
};
