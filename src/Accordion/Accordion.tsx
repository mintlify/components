import { ReactNode, useState } from "react";
import AccordionCover from "./AccordionCover";
import getAccordionStyleFromVariant from "./getAccordionStyleFromType";
import clsx from "clsx";

function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  onChange,
  variant = "rounded",
  children,
}: {
  /** The main text of the Accordion shown in bold */
  title: string;

  /** Text under the title */
  description?: string;

  /** Whether the Accordion is open initially */
  defaultOpen?: boolean;

  /** Icon to display to the left */
  icon?: ReactNode;

  /** Callback when the Accordion is clicked with the new open state */
  onChange?: (open: boolean) => void;

  /** The Accordion UI style */
  variant?: "rounded" | "minimalist";

  /** The Accordion contents */
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(Boolean(defaultOpen));

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
        coverClass={coverClass}
      />
      <div className={clsx(contentClass, !open && "hidden")}>{children}</div>
    </div>
  );
}

export default Accordion;
