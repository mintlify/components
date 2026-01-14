'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';
import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { Classes } from '@/lib/local/selectors';

const EXPANDABLE_CONTENT_CLASS = 'expandable-content';

export interface ExpandableProps {
  /** Title displayed in the expandable header */
  title?: string;
  /** Whether the expandable is open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when the open state changes */
  onChange?: (open: boolean) => void;
  /** Whether to lazily render children (only render when first opened) */
  lazy?: boolean;
  /** Content to display inside the expandable */
  children?: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

export function Expandable({
  title,
  defaultOpen = false,
  open: controlledOpen,
  onChange,
  lazy = false,
  children,
  className,
}: ExpandableProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;

  // shouldRenderChildren should only ever be set to true - we never want to unmount stateful components
  const [shouldRenderChildren, setShouldRenderChildren] = useState(open || !lazy);

  // Update shouldRenderChildren when open becomes true
  // Use useLayoutEffect to update synchronously before paint, preventing flash of empty expanded state
  useLayoutEffect(() => {
    if (open && !shouldRenderChildren) {
      setShouldRenderChildren(true);
    }
  }, [open, shouldRenderChildren]);

  const setOpenState = (newOpenState: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpenState);
    }
    onChange?.(newOpenState);

    // Ensure children are rendered when opening
    if (newOpenState) {
      setShouldRenderChildren(true);
    }
  };

  return (
    <details
      open={open}
      onToggle={(e) => {
        const newState = e.currentTarget.open;
        if (newState !== open) {
          setOpenState(newState);
        }
      }}
      className={cn(Classes.Expandable, 'mt-4 border-standard rounded-xl', className)}
      data-component-part="expandable"
    >
      <summary
        className={cn(
          'not-prose text-sm flex flex-row items-center content-center w-full cursor-pointer',
          'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 py-3 px-3.5 hover:bg-gray-50/50 dark:hover:bg-white/5 rounded-t-xl',
          'list-none [&::-webkit-details-marker]:hidden',
          !open && 'rounded-b-xl'
        )}
        aria-expanded={open}
        data-component-part="expandable-summary"
      >
        <span data-component-part="expandable-icon">
          <Icon
            icon="angle-right"
            className={cn('h-2.5 w-2.5 bg-zinc-400 transition-transform', open && 'rotate-90')}
            overrideSize
            overrideColor
          />
        </span>
        <div className="ml-3 leading-tight text-left">
          <p className="m-0">
            {open ? 'Hide' : 'Show'} {title || 'child attributes'}
          </p>
        </div>
      </summary>
      <div
        className={cn(
          EXPANDABLE_CONTENT_CLASS,
          'mx-3 px-2 border-t border-gray-100 dark:border-white/10'
        )}
        data-component-part="expandable-content"
      >
        {shouldRenderChildren && children}
      </div>
    </details>
  );
}
