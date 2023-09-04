import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { CodeBlock } from '../../Code';
import { Steps } from '../../Steps';
import Step from '../../Steps/Step';

export default {
  title: 'Display/Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => (
  <div className="ml-16 mt-8">
    <Steps {...args}>
      <Step title="Hello world" description="We'll get you setup here.">
        This is the first step to getting setup.
      </Step>

      <Step title="Now let's get started" variant="outline">
        The next steps to doing things are...
        <CodeBlock>
          <pre>
            This is a code block. This is a code block. This is a code block. This is a code block.
          </pre>
        </CodeBlock>
      </Step>
    </Steps>
  </div>
);

export const Default = Template.bind({});
