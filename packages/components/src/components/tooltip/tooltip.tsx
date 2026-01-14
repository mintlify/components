'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { ChevronRightIcon } from 'lucide-react';
import { ReactNode, isValidElement, useState } from 'react';

import { useHasHover } from '@/hooks/useHasHover';
import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

export type TooltipProps = {
  /** The descriptive text shown in the tooltip */
  description: string;
  /** The content that triggers the tooltip on hover/click */
  children: ReactNode;
  /** Optional title shown above the description */
  title?: string;
  /** Optional call-to-action text (requires href) */
  cta?: string;
  /** Optional link URL for the CTA */
  href?: string;
  /** Additional CSS classes for the root element */
  className?: string;
};

export function Tooltip({ description, children, title, cta, href, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const hasHover = useHasHover();

  if (!children) {
    return null;
  }

  const isButtonElement =
    isValidElement(children) &&
    (children.type === 'button' ||
      (typeof children.type === 'string' && children.type.toLowerCase() === 'button'));

  const handleClick = !hasHover
    ? () => {
        setOpen(!open);
      }
    : undefined;

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root open={open} onOpenChange={setOpen}>
        <RadixTooltip.Trigger
          aria-label={title ? `${title}: ${description}` : description}
          asChild={isButtonElement && isValidElement(children)}
          onClick={handleClick}
          className={className}
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
                className="text-gray-600 !mt-2 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light gap-0.5 flex items-center text-xs font-medium leading-4"
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
