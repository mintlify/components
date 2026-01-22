// biome-ignore lint/performance/noNamespaceImport: TODO
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ChevronRightIcon } from "lucide-react";
import { isValidElement, type ReactNode, useState } from "react";

import { useHasHover } from "@/hooks/useHasHover";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import { isRemoteUrl } from "@/utils/isRemoteUrl";

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

  if (children == null) {
    return null;
  }

  const isInteractive = isInteractiveElement(children);

  const handleClick = hasHover
    ? undefined
    : () => {
        setOpen((prev) => !prev);
      };

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root onOpenChange={setOpen} open={open}>
        <RadixTooltip.Trigger
          aria-label={
            isInteractive
              ? undefined
              : // biome-ignore lint/style/noNestedTernary: TODO
                title && description
                ? `${title}: ${description}`
                : title || description
          }
          asChild={isInteractive}
          className={cn(
            className,
            !isInteractive &&
              "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          onClick={handleClick}
        >
          {underlineWhenTextOnly(children)}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="z-50 flex max-w-[16rem] flex-col gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_10px_16px_-3px_rgb(10_10_10/0.05),0_3px_10px_-2px_rgb(10_10_10/0.02)] dark:border-gray-900 dark:bg-gray-950"
            collisionPadding={8}
            data-component-part="tooltip-content"
            onPointerDownOutside={() => setOpen(false)}
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
                className="mt-2! flex items-center gap-0.5 font-medium text-gray-600 text-xs leading-4 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
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
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
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
