import { ReactNode, useState } from "react";
import clsx from "clsx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import AccordionCover from "./AccordionCover";
import getAccordionStyleFromVariant from "./getAccordionStyleFromType";

function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconColor,
  onChange,
  variant = "rounded",
  children,
}: {
  /** The main text of the Accordion shown in bold */
  title: string;

  /** Text under the title */
  description?: string;

  /** Whether the Accordion is open initially */
  defaultOpen: boolean;

  /** Icon to display to the left */
  icon?: ReactNode | IconDefinition;

  /** Icon's colour, will default to the text's colour if left undefined */
  iconColor?: string;

  /** Callback when the Accordion is clicked with the new open state */
  onChange?: (open: boolean) => void;

  /** The Accordion UI style */
  variant?: "rounded" | "minimalist";

  /** The Accordion contents */
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const onClickOpen = (open: boolean) => {
    setOpen(open);
    if (onChange) {
      onChange(open);
    }
  };

  const { parentClass, coverClass, contentClass } =
    getAccordionStyleFromVariant(variant);

  return (
    <div key={title} role="listitem" className={parentClass}>
      <AccordionCover
        title={title}
        description={description}
        open={open}
        setOpen={onClickOpen}
        icon={icon}
        iconColor={iconColor}
        isRounded={variant === "rounded"}
        coverClass={coverClass}
      ></AccordionCover>
      <dd className={clsx(contentClass, !open && "hidden")}>{children}</dd>
    </div>
  );
}

export default Accordion;
