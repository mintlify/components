import { expect, jest } from '@storybook/jest';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Accordion } from '../../../Accordion';
import { CodeBlock, CodeGroup } from '../../../Code';
import { delay } from '../../../utils/delay';

export default {
  title: 'Interactive/Code/CodeGroup',
  component: CodeGroup,
  decorators: [
    (Story) => (
      <div className={'mt-6'}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CodeGroup>;

const Template: ComponentStory<typeof CodeGroup> = ({ children, ...props }) => (
  <CodeGroup {...props}>{children}</CodeGroup>
);

const TemplateInsideAccordion: ComponentStory<typeof CodeGroup> = ({ children, ...props }) => (
  <Accordion
    title="Accordion"
    description="Testing to see the CodeGroup shrinks to fit inside an Accordion"
    defaultOpen={true}
  >
    <CodeGroup {...props}>{children}</CodeGroup>
  </Accordion>
);

export const OneChild = Template.bind({});
OneChild.args = {
  selectedColor: '#ffff00',
  children: (
    <CodeBlock filename="Very Very Very Long Filename">
      <p>Example Code</p>
    </CodeBlock>
  ),
};

export const ThreeChildren = Template.bind({});
ThreeChildren.args = {
  selectedColor: '#ffff00',
  children: [
    <CodeBlock filename="Name 1">
      <p>First Page of Code</p>
    </CodeBlock>,
    <CodeBlock filename="Duplicated Name, But Different Content">
      <p>Second Page of Code</p>
      <p>The next line of code is as long as possible to test scrolling:</p>
      <p>
        Loremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsumloremipsum
      </p>
    </CodeBlock>,
    <CodeBlock filename="Duplicated Name, But Different Content">
      <p>Third Page of Code</p>
      <p>Second Line on Third Page of Code</p>
    </CodeBlock>,
  ],
};

export const InsideAccordionWithTwoChildren = TemplateInsideAccordion.bind({});
InsideAccordionWithTwoChildren.args = {
  selectedColor: '#ffff00',
  children: [
    <CodeBlock filename="Name 1">
      <p>First Page of Code</p>
    </CodeBlock>,
    <CodeBlock filename="Name 2">
      <p>Second Page of Code</p>
      <p>Second Line on Second Page of Code</p>
    </CodeBlock>,
  ],
};

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM.
 */
export const CodeGroupInteractions = Template.bind({});
const filename = 'Name 1';
const filename2 = 'Name 2';
const testString = uuidv4();
const testString2 = uuidv4();
CodeGroupInteractions.args = {
  children: [
    <CodeBlock filename={filename}>
      <p>{testString}</p>
    </CodeBlock>,
    <CodeBlock filename={filename2}>
      <p>{testString2}</p>
    </CodeBlock>,
  ],
};

CodeGroupInteractions.play = async ({ canvasElement }) => {
  let clipboardData: unknown = '';

  jest.spyOn(window, 'navigator', 'get').mockImplementation(() => {
    return {
      clipboard: {
        writeText: jest.fn((data) => {
          clipboardData = data;
        }),
        readText: jest.fn(() => {
          return clipboardData;
        }),
      },
    } as any;
  });

  const canvas = within(canvasElement);
  await expect(window.navigator.clipboard).toBeDefined();

  await delay(20);
  await userEvent.hover(await within(canvasElement).getByRole('button'));

  // 👇 Assert DOM structure.
  await expect(canvas.getByText(filename)).toBeInTheDocument();
  await expect(canvas.getByText(testString)).toBeInTheDocument();
  await expect(canvas.getByText('Copy')).toBeInTheDocument();
  await expect(canvas.getByText(testString)).toBeInTheDocument;
  await expect(canvas.getByText('Copy')).not.toBeVisible();

  // 👇 Simulate copy to clipboard.
  await userEvent.click(canvas.getByRole('button'));

  // 👇 Assert DOM structure.
  await delay(100);
  await expect(canvas.getByText('Copied')).toBeInTheDocument();
  await expect(canvas.getByText('Copied')).toBeVisible();
  // 👇 Assert if copied to clipboard.
  await expect(await window.navigator.clipboard.readText()).toEqual(testString);

  // 👇 Simulate tab switch.
  await userEvent.click(canvas.getByText(filename2));
  await delay(100);
  await expect(canvas.getByText(filename2)).toBeInTheDocument();
  await expect(canvas.getByText(testString2)).toBeInTheDocument();

  // 👇 Simulate copy to clipboard click.
  await userEvent.click(canvas.getByRole('button'));
  await delay(500);

  // 👇 Assert DOM structure.
  await expect(canvas.queryByText('Copied')).toBeInTheDocument();
  await expect(canvas.queryByText('Copied')).toBeVisible();

  // 👇 Assert if copied to clipboard.
  await expect(await window.navigator.clipboard.readText()).toEqual(testString2);

  // 👇 Wait for Tooltip to close.
  await delay(3000);

  // 👇 Expect Tooltip to be hidden.
  await expect(canvas.queryByText('Copy')).not.toBeVisible();
};
