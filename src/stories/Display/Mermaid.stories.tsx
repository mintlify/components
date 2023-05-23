import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { Mermaid } from '../../Mermaid';

export default {
  title: 'Display/Mermaid',
  component: Mermaid,
} as ComponentMeta<typeof Mermaid>;

const Template: ComponentStory<typeof Mermaid> = (args) => <Mermaid {...args} />;

export const WithGraph = Template.bind({});
WithGraph.args = {
  children: `
    pie title NETFLIX
      "Time spent looking for movie" : 90
      "Time spent watching it" : 10
  `,
};

export const WithFlowchart = Template.bind({});
WithFlowchart.args = {
  children: `
    graph LR
      A[Square Rect] -- Link text --> B((Circle))
      A --> C(Round Rect)
      B --> D{Rhombus}
      C --> D
  `,
};

export const WithCommitFlow = Template.bind({});
WithCommitFlow.args = {
  children: `
    gitGraph:
      commit "Ashish"
      branch newbranch
      checkout newbranch
      commit id:"1111"
      commit tag:"test"
      checkout main
      commit type: HIGHLIGHT
      commit
      merge newbranch
      commit
      branch b2
      commit
  `,
};

export const WithSequenceDiagram = Template.bind({});
WithSequenceDiagram.args = {
  children: `
    sequenceDiagram
      Alice ->> Bob: Hello Bob, how are you?
      Bob-->>John: How about you John?
      Bob--x Alice: I am good thanks!
      Bob-x John: I am good thanks!
      Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

      Bob-->Alice: Checking with John...
      Alice->John: Yes... John, how are you?
  `,
};

export const WithMindmap = Template.bind({});
WithMindmap.args = {
  children: `
    mindmap
      root((mindmap))
        Origins
          Long history
          ::icon(fa fa-book)
          Popularisation
            British popular psychology author Tony Buzan
        Research
          On effectiveness<br/>and features
          On Automatic creation
            Uses
                Creative techniques
                Strategic planning
                Argument mapping
        Tools
          Pen and paper
          Mermaid
  `,
};
