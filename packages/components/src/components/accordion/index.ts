import { Accordion as AccordionBase } from "./accordion";
import { AccordionGroup } from "./accordion-group";

export const Accordion = Object.assign(AccordionBase, {
  Group: AccordionGroup,
});

// biome-ignore lint/performance/noBarrelFile: TODO
export {
  getInitialOpenState,
  updateAndCopyUrl,
} from "./accordion-url-utils";
