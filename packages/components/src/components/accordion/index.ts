import { Accordion as AccordionBase } from "./accordion";
import { AccordionGroup } from "./accordionGroup";

export const Accordion = Object.assign(AccordionBase, {
  Group: AccordionGroup,
});

export {
  getInitialOpenState,
  updateAndCopyUrl,
} from "./accordionUrlUtils";
