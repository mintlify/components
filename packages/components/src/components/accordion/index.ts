import { Accordion as AccordionBase } from "./accordion";
import { AccordionGroup } from "./accordion-group";

export const Accordion = Object.assign(AccordionBase, {
  Group: AccordionGroup,
});

export type { AccordionProps } from "./accordion";
export type { AccordionGroupProps } from "./accordion-group";

export {
  getInitialOpenState,
  updateAndCopyUrl,
} from "./accordion-url-utils";
