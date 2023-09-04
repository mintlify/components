import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { CodeBlock } from '../../Code';
import { Steps } from '../../Steps';
import Step from '../../Steps/Step';

export default {
  title: 'Display/Steps',
  component: Steps,
  args: {
    children: [
      <Step key={0} title="Hello world" description="We'll get you setup here.">
        This is the first step to getting setup.
      </Step>,
      <Step key={1} title="Now let's get started">
        The next steps to doing things are...
        <CodeBlock>
          <pre>
            This is a code block. This is a code block. This is a code block. This is a code block.
          </pre>
        </CodeBlock>
      </Step>,
    ],
  },
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => (
  <div className="ml-16 mt-8">
    <Steps {...args} />
  </div>
);

export const MultipleSteps = Template.bind({});

export const SingleStep = Template.bind({});
SingleStep.args = {
  children: [
    <Step key={0} title="Hello world" description="We'll get you setup here.">
      This is the first step to getting setup.
    </Step>,
  ],
};

export const OutlineVariant = Template.bind({});
OutlineVariant.args = {
  children: [
    <Step key={0} title="Hello world" description="We'll get you setup here.">
      This is the first step to getting setup.
    </Step>,
    <Step key={1} title="Now let's get started" variant="outline">
      The next steps to doing things are...
      <CodeBlock>
        <pre>
          This is a code block. This is a code block. This is a code block. This is a code block.
        </pre>
      </CodeBlock>
    </Step>,
    <Step key={1} title="And another" variant="outline">
      One more step that still needs to get finished
    </Step>,
  ],
};
