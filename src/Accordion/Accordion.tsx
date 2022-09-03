import { ReactNode, useState } from "react";
import clsx from "clsx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import AccordionCover from "./AccordionCover";
import getAccordionStyleFromType from "./getAccordionStyleFromType";

function Accordion({
  title,
  description,
  defaultOpen = false,
  onChange,
  icon,
  style = "rounded",
  children,
}: {
  title: string;
  description?: string;
  defaultOpen: boolean;
  onChange?: (open: boolean) => void;
  icon?: ReactNode | IconDefinition;
  style: "rounded" | "minimalist";
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
    getAccordionStyleFromType(style);

  return (
    <div key={title} role="listitem" className={parentClass}>
      <AccordionCover
        title={title}
        description={description}
        open={open}
        setOpen={onClickOpen}
        icon={icon}
        isRounded={style === "rounded"}
        coverClass={coverClass}
      ></AccordionCover>
      <dd className={clsx(contentClass, !open && "hidden")}>{children}</dd>
    </div>
  );
}

export default Accordion;
