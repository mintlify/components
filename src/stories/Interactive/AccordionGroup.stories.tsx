import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Accordion, AccordionGroup } from "../../Accordion";

export default {
  title: "Interactive/AccordionGroup",
  component: AccordionGroup,
} as ComponentMeta<typeof AccordionGroup>;

const Template: ComponentStory<typeof AccordionGroup> = (args) => (
  <AccordionGroup {...args} />
);

const TestText = (
  <article className="prose text-slate-900 dark:text-slate-200">
    <h3>Test Header</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt
      consectetur est vel viverra. Suspendisse in consequat lacus, eget
      fermentum tortor. Nulla rutrum sollicitudin diam sit amet posuere. Sed
      ullamcorper mauris non neque suscipit molestie at non velit. Praesent ut
      egestas urna. Nam ultricies, neque non molestie varius, nisi sem sagittis
      mauris, iaculis fringilla elit ipsum sed nunc. Vivamus id neque sit amet
      mi finibus sollicitudin.
    </p>
    <h3>Second Test Header</h3>
    <p>
      Ut sagittis ipsum a elit cursus, ac molestie dui egestas. Aliquam tempus
      felis in semper fermentum. Cras elementum blandit risus finibus
      scelerisque. Nam blandit quis enim sit amet congue. Integer hendrerit,
      enim quis scelerisque lobortis, sem diam venenatis diam, in condimentum
      tellus dolor eget libero. Mauris gravida orci eget turpis vulputate, eget
      imperdiet diam euismod. Aliquam sed ante molestie, viverra urna id, semper
      nibh. Nullam erat purus, consequat nec diam in, consectetur malesuada
      nibh. Sed viverra mollis justo ut tristique. Aenean fringilla, leo vitae
      fermentum feugiat, nisl turpis scelerisque metus, eu dictum augue metus
      sit amet nibh. Proin quis molestie leo, vitae facilisis justo.
    </p>
  </article>
);

export const FourChildren = Template.bind({});
FourChildren.args = {
  href: "https://mintlify.com",
  children: (
    <>
      <Accordion title="Title 1">{TestText}</Accordion>
      <Accordion title="Title 2">{TestText}</Accordion>
      <Accordion title="Title 3">{TestText}</Accordion>
      <Accordion title="Title 4">{TestText}</Accordion>
    </>
  ),
};
