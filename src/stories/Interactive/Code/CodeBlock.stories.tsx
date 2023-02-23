import { expect } from '@storybook/jest';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Accordion } from '../../../Accordion';
import { CodeBlock } from '../../../Code';
import { delay } from '../../../utils/delay';

export default {
  title: 'Interactive/Code/CodeBlock',
  component: CodeBlock,
} as ComponentMeta<typeof CodeBlock>;

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args}>
    <p>{args.children ?? 'Example Code'}</p>
  </CodeBlock>
);

const TemplateInsideAccordion: ComponentStory<typeof CodeBlock> = (args) => (
  <Accordion
    title="Accordion"
    description="Testing to see the CodeBlock shrinks to fit inside an Accordion"
    defaultOpen={true}
  >
    <CodeBlock {...args}>
      <p>{args.children ?? 'Example Code'}</p>
    </CodeBlock>
  </Accordion>
);

export const WithFileName = Template.bind({});
WithFileName.args = {
  filename: 'Example File Name',
};

export const WithOnCopiedCallback = Template.bind({});
WithFileName.args = {
  filename: 'Example File Name',
  onCopy: () => console.log('Copied!'),
};

export const FileNameGreenAccents = Template.bind({});
FileNameGreenAccents.args = {
  filename: 'Example File Name',
  filenameColor: '#00ff00',
  tooltipColor: '#00AA00',
};

export const NoFileName = Template.bind({});
NoFileName.args = {};

export const InsideAccordionNoFileName = TemplateInsideAccordion.bind({});

export const InsideAccordionWithFileName = TemplateInsideAccordion.bind({});
InsideAccordionWithFileName.args = {
  filename: 'Example File Name',
  filenameColor: '#00ff00',
};

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM.
 */
export const CodeBlockInteractions = Template.bind({});
const testString = uuidv4();
const fileName = 'Name 1';
CodeBlockInteractions.args = {
  children: testString,
  filename: fileName,
};
CodeBlockInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // 👇 Assert DOM structure.
  await delay(20);
  await expect(canvas.getByText(fileName)).toBeInTheDOM();
  await expect(canvas.getByText(testString)).toBeInTheDOM();
  await expect(canvas.getByText('Copy')).toBeInTheDOM();
  await expect(canvas.getByText(testString)).toBeInTheDOM;
  await expect(canvas.getByText('Copy')).not.toBeVisible();

  // 👇 Simulate copy to clipboard.
  await userEvent.click(canvas.getByText('Copy'));
  // 👇 Assert DOM structure.
  await delay(20);
  await expect(canvas.getByText('Copied')).toBeVisible();
  await expect(canvas.getByText('Copied')).toBeInTheDOM();

  // 👇 Assert if copied to clipboard.
  await expect(await navigator.clipboard.readText()).toEqual(testString);

  // 👇 Wait for Tooltip to close.
  await delay(3000);

  // 👇 Expect Tooltip to be hidden.
  await expect(canvas.getByText('Copy')).not.toBeVisible();
};
