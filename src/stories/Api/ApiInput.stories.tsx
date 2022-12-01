import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ApiInput } from "../../Api/ApiInput";
import { ApiInputValue } from "../../Api/types";

export default {
  title: "Api/ApiInput",
  component: ApiInput,
} as ComponentMeta<typeof ApiInput>;

const Template: ComponentStory<typeof ApiInput> = (args) => (
  <div className="max-w-md">
    <ApiInput
      param={args.param}
      value={args.value}
      onChangeParam={(
        parentInputs: string[],
        paramName: string,
        value: ApiInputValue
      ) => {
        console.log(value);
      }}
      // Storybook automatically adds a blank function if we don't do this, and our code
      // shows a garbage can when the delete function exists.
      onDeleteArrayItem={undefined}
    />
  </div>
);

export const TextInputWithPlaceholder = Template.bind({});
TextInputWithPlaceholder.args = {
  param: {
    name: "Text Input",
    type: "text",
    placeholder: "Placeholder Value",
  },
  value: "",
};

export const ArrayInput = Template.bind({});
ArrayInput.args = {
  param: {
    name: "Array Input",
    type: "array",
  },
  value: [
    { param: { name: "This text should be hidden", type: "text" }, value: 1 },
    { param: { name: "This text should be hidden", type: "text" }, value: 2 },
  ],
};

export const ObjectInput = Template.bind({});
ObjectInput.args = {
  param: {
    name: "Object Input",
    type: "object",
    properties: [
      { name: "Example Property Name" },
      { name: "camelCasePropertyName" },
    ],
  },
  value: {
    "Example Property Name": 123,
    camelCasePropertyName: "Example string value",
  },
};