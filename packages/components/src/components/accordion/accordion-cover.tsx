import type { ReactNode } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/utils/cn";

type AccordionCoverProps = {
  id: string;
  title: string | ReactNode;
  description?: string;
  open: boolean;
  icon?: ReactNode;
  topOffset?: string;
};

const AccordionCover = ({
  id,
  title,
  description,
  open,
  icon,
  topOffset = "-top-18",
}: AccordionCoverProps) => {
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: TODO
    <summary
      aria-controls={`${id}-accordion-children`}
      aria-expanded={open}
      className="not-prose relative flex w-full cursor-pointer list-none flex-row content-center items-center space-x-2 rounded-t-xl px-5 py-4 hover:bg-gray-100 hover:dark:bg-gray-800 [&::-webkit-details-marker]:hidden"
      data-component-part="accordion-button"
      id={`${id}-label`}
    >
      <div className={cn("absolute", topOffset)} id={id} />
      <div className="mr-0.5" data-component-part="accordion-caret-right">
        <Icon
          className={cn(
            "bg-gray-700 transition dark:bg-gray-400",
            open && "-mt-1 rotate-90 duration-200",
            !open && "duration-75"
          )}
          icon="caret-right"
          iconType="solid"
          size={12}
        />
      </div>
      {!!icon && (
        <div
          className="flex size-4 items-center justify-center fill-gray-800 text-gray-800 dark:fill-gray-100 dark:text-gray-100"
          data-component-part="accordion-icon"
        >
          {icon}
        </div>
      )}
      <div
        className="text-left leading-tight"
        contentEditable={false}
        data-component-part="accordion-title-container"
      >
        <p
          className="m-0 font-medium text-gray-900 dark:text-gray-200"
          data-component-part="accordion-title"
        >
          {title}
        </p>
        {!!description && (
          <p
            className="m-0 text-gray-900 dark:text-gray-200"
            data-component-part="accordion-description"
          >
            {description}
          </p>
        )}
      </div>
    </summary>
  );
};

export { AccordionCover };
