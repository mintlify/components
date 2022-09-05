import clsx from "clsx";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { UserDefinedIcon } from "../UserDefinedIcon";

function AccordionItemCover({
  title,
  description,
  open,
  setOpen,
  icon,
  iconColor,
  isRounded,
  coverClass,
}: {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => any;
  icon?: ReactNode | IconDefinition;
  iconColor?: string;
  isRounded: boolean;
  coverClass: string;
}) {
  // In rounded style, we round the button itself so when a web browser in keyboard navigation mode
  // highlights the button the highlight will follow the corners.
  return (
    <button
      onClick={() => setOpen(!open)}
      className={clsx(
        "not-prose flex flex-row items-center content-center w-full",
        isRounded && "rounded-t-xl",
        isRounded && !open && "rounded-b-xl",
        coverClass
      )}
      aria-controls={title + "Children"}
      aria-expanded={open}
    >
      <ToggleIcon open={open} />
      <UserDefinedIcon icon={icon} color={iconColor} />
      <div className="leading-tight text-left">
        <p className="m-0 font-medium text-slate-900 dark:text-slate-200">
          {title}
        </p>
        {description ? (
          <p className="m-0 text-slate-900 dark:text-slate-200">
            {description}
          </p>
        ) : null}
      </div>
    </button>
  );
}

function ToggleIcon({ open }: { open: boolean }) {
  // We rotate the icon 90 degrees when open.
  // Chevron Right icon comes from Font Awesome's free solid icons v6.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="h-3 w-3"
      style={{
        fill: "currentColor",
        transform: open ? "rotate(90deg)" : undefined,
      }}
    >
      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
}

export default AccordionItemCover;
