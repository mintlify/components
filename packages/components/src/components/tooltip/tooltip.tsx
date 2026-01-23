import { Tooltip as TooltipBaseUI } from "@base-ui/react/tooltip";
import { ChevronRightIcon } from "lucide-react";
import { isValidElement, type ReactNode, useMemo, useState } from "react";
import { Classes } from "@/constants/selectors";
import { useHasHover } from "@/hooks/use-has-hover";
import { cn } from "@/utils/cn";
import { isRemoteUrl } from "@/utils/is-remote-url";
import { renderAsChild } from "@/utils/render-as-child";

type TooltipProps = {
  description?: string;
  children: ReactNode;
  title?: string;
  cta?: string;
  href?: string;
  className?: string;
};

const Tooltip = ({
  description,
  children,
  title,
  cta,
  href,
  className,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const hasHover = useHasHover();

  const isInteractive = isInteractiveElement(children);

  const handleClick = hasHover
    ? undefined
    : () => {
        setOpen((prev) => !prev);
      };

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: { reason: string }
  ) => {
    const { reason } = eventDetails;

    if (hasHover) {
      setOpen(nextOpen);
      return;
    }

    if (nextOpen) {
      setOpen(true);
    } else if (reason === "escape-key" || reason === "outside-press") {
      setOpen(false);
    }
  };

  const ariaLabel = useMemo(() => {
    if (isInteractive) {
      return undefined;
    }

    if (title && description) {
      return `${title}: ${description}`;
    }

    return title || description;
  }, [title, description, isInteractive]);

  if (children == null) {
    return null;
  }

  return (
    <TooltipBaseUI.Provider delay={0}>
      <TooltipBaseUI.Root onOpenChange={handleOpenChange} open={open}>
        <TooltipBaseUI.Trigger
          aria-label={ariaLabel}
          className={cn(
            className,
            !isInteractive &&
              "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          onClick={handleClick}
          render={isInteractive ? renderAsChild(children) : undefined}
        >
          {isInteractive ? null : underlineWhenTextOnly(children)}
        </TooltipBaseUI.Trigger>
        <TooltipBaseUI.Portal>
          <TooltipBaseUI.Positioner collisionPadding={8} sideOffset={4}>
            <TooltipBaseUI.Popup
              className="z-50 flex max-w-[16rem] flex-col gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_10px_16px_-3px_rgb(10_10_10/0.05),0_3px_10px_-2px_rgb(10_10_10/0.02)] dark:border-gray-900 dark:bg-gray-950"
              data-component-part="tooltip-content"
            >
              {!!title && (
                <p
                  className="font-medium text-gray-900 text-xs leading-4 dark:text-gray-200"
                  data-component-part="tooltip-title"
                >
                  {title}
                </p>
              )}
              {!!description && (
                <p
                  className="text-gray-600 text-xs leading-4 dark:text-gray-400"
                  data-component-part="tooltip-description"
                >
                  {description}
                </p>
              )}
              {cta && href && (
                <a
                  href={href}
                  {...(isRemoteUrl(href)
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="mt-2! flex items-center gap-0.5 rounded-sm font-medium text-gray-600 text-xs leading-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-primary-light"
                  data-component-part="tooltip-cta"
                >
                  {cta}
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={2.5}
                  />
                </a>
              )}
            </TooltipBaseUI.Popup>
          </TooltipBaseUI.Positioner>
        </TooltipBaseUI.Portal>
      </TooltipBaseUI.Root>
    </TooltipBaseUI.Provider>
  );
};

const isInteractiveElement = (children: ReactNode): boolean => {
  if (!isValidElement(children)) {
    return false;
  }

  if (typeof children.type === "function") {
    return true;
  }

  if (typeof children.type === "object") {
    return true;
  }

  if (typeof children.type === "string") {
    return ["button", "a", "input", "select", "textarea"].includes(
      children.type.toLowerCase()
    );
  }

  return false;
};

const underlineWhenTextOnly = (children: ReactNode) => {
  if (isValidElement(children)) {
    return children;
  }

  return (
    <span
      className={cn(
        Classes.Tooltip,
        "underline decoration-2 decoration-gray-400 decoration-dotted underline-offset-4 dark:decoration-gray-500"
      )}
    >
      {children}
    </span>
  );
};

export { Tooltip };
export type { TooltipProps };
