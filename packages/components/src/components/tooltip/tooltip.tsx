import * as RadixTooltip from '@radix-ui/react-tooltip';
import { ChevronRightIcon } from 'lucide-react';
import { ReactNode, isValidElement, useState } from 'react';

import { useHasHover } from '@/hooks/useHasHover';
import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

export type TooltipProps = {
  description: string;
  children: ReactNode;
  title?: string;
  cta?: string;
  href?: string;
  className?: string;
};

export function Tooltip({ description, children, title, cta, href, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const hasHover = useHasHover();

  if (children == null) {
    return null;
  }

  const isInteractive = isInteractiveElement(children);

  const handleClick = !hasHover
    ? () => {
        setOpen((prev) => !prev);
      }
    : undefined;

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root open={open} onOpenChange={setOpen}>
        <RadixTooltip.Trigger
          aria-label={isInteractive ? undefined : (title ? `${title}: ${description}` : description)}
          asChild={isInteractive}
          onClick={handleClick}
          className={cn(
            className,
            !isInteractive &&
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm'
          )}
        >
          {underlineWhenTextOnly(children)}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            collisionPadding={8}
            className="z-50 max-w-[16rem] px-4 py-3 rounded-xl bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-900 space-y-1 shadow-[0_10px_16px_-3px_rgb(10_10_10/0.05),0_3px_10px_-2px_rgb(10_10_10/0.02)]"
            data-component-part="tooltip-content"
            onPointerDownOutside={() => setOpen(false)}
          >
            {!!title && (
              <p
                className="text-xs font-medium leading-4 text-gray-900 dark:text-gray-200"
                data-component-part="tooltip-title"
              >
                {title}
              </p>
            )}
            <p
              className="text-xs text-gray-600 dark:text-gray-400 leading-4"
              data-component-part="tooltip-description"
            >
              {description}
            </p>
            {cta && href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                data-component-part="tooltip-cta"
                className="text-gray-600 mt-2! dark:text-gray-400 hover:text-primary dark:hover:text-primary-light gap-0.5 flex items-center text-xs font-medium leading-4"
              >
                {cta}
                <ChevronRightIcon className="size-3" strokeWidth={2.5} aria-hidden="true" />
              </a>
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

function isInteractiveElement(children: ReactNode): boolean {
  if (!isValidElement(children)) {
    return false;
  }

  if (typeof children.type === 'function') {
    return true;
  }

  if (typeof children.type === 'object') {
    return true;
  }

  if (typeof children.type === 'string') {
    return ['button', 'a', 'input', 'select', 'textarea'].includes(children.type.toLowerCase());
  }

  return false;
}

function underlineWhenTextOnly(children: ReactNode) {
  if (isValidElement(children)) {
    return children;
  }

  return (
    <span
      className={cn(
        Classes.Tooltip,
        'underline decoration-dotted decoration-2 underline-offset-4 decoration-gray-400 dark:decoration-gray-500'
      )}
    >
      {children}
    </span>
  );
}
