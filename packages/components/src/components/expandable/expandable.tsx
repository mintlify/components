import { ReactNode, useEffect, useLayoutEffect, useState, RefObject } from 'react';

import { useExpandableMemory } from '@/hooks/useExpandableMemory';
import { Classes } from '@/lib/local/selectors';
import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';

const EXPANDABLE_CONTENT_CLASS = 'expandable-content';
const DEFAULT_OPENED_TEXT = 'Hide';
const DEFAULT_CLOSED_TEXT = 'Show';
const DEFAULT_TITLE = 'child attributes';

export interface ExpandableProps {
  title?: string;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  lazy?: boolean;
  className?: string;
  children?: ReactNode;
  uniqueParamId?: string;
  onMount?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  // pass in locale['hide']
  openedText?: string;
  // pass in locale['show']
  closedText?: string;
  hasScrolledToAnchorRef?: RefObject<boolean>;
  anchor?: string;
}

export function Expandable({
  title = DEFAULT_TITLE,
  defaultOpen = false,
  onChange: onChangeProp,
  lazy,
  className,
  children,
  uniqueParamId,
  onMount,
  onOpen,
  onClose,
  openedText = DEFAULT_OPENED_TEXT,
  closedText = DEFAULT_CLOSED_TEXT,
  hasScrolledToAnchorRef,
  anchor,
}: ExpandableProps) {
  // if uniqueParamId is provided, we use session storage to
  // track if a user manually toggled the param field expandable
  const shouldUseSessionStorage = !!uniqueParamId;
  const { ref: expandableRef, isExpanded, onManualToggle, isInSessionStorage } = useExpandableMemory(
    uniqueParamId || '',
    defaultOpen
  );

  // in case we ever render an expandable that is not a param field,
  // we can just use regular state to track it
  const [localOpen, setLocalOpen] = useState(defaultOpen);

  // Check if there's an anchor in the URL that matches this expandable
  // If so, override session storage to ensure the expandable opens for the anchor
  const containsAnchor = Boolean(uniqueParamId && anchor?.includes(uniqueParamId));
  const shouldOverrideForAnchor = containsAnchor && !hasScrolledToAnchorRef?.current;

  // If using session storage, check if we should override for anchor links
  // Otherwise, respect session storage or defaultOpen (if not yet in session storage)
  const open = shouldUseSessionStorage
    ? shouldOverrideForAnchor
      ? true
      : isInSessionStorage
        ? isExpanded
        : defaultOpen
    : localOpen;

  // setShouldRenderChildren should only ever be called with true - we never want to unmount stateful components
  const [shouldRenderChildren, setShouldRenderChildren] = useState(open || !lazy);

  // Update shouldRenderChildren when open becomes true (e.g., from session storage)
  // Use useLayoutEffect to update synchronously before paint, preventing flash of empty expanded state
  useLayoutEffect(() => {
    if (open && !shouldRenderChildren) {
      setShouldRenderChildren(true);
    }
  }, [open, shouldRenderChildren]);

  useEffect(() => {
    onMount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (open: boolean) => {
    setShouldRenderChildren(true);

    if (onChangeProp) {
      onChangeProp(open);
    }

    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const setOpenState = (newOpenState: boolean) => {
    if (shouldUseSessionStorage) {
      onManualToggle(newOpenState);
    } else {
      setLocalOpen(newOpenState);
    }

    onChange(newOpenState);
  };

  const contentId = `${title}-content`.replace(/\s+/g, '-');

  return (
    <details
      key={title}
      ref={expandableRef}
      open={open}
      onToggle={(e) => {
        const newState = e.currentTarget.open;
        if (newState !== open) {
          setOpenState(newState);
        }
      }}
      className={cn(Classes.Expandable, 'mt-4 border-standard rounded-xl', className)}
      data-testid={uniqueParamId + '-children'}
      data-component-part="expandable"
    >
      <summary
        className={cn(
          'not-prose text-sm flex flex-row items-center content-center w-full cursor-pointer',
          'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 py-3 px-3.5 hover:bg-gray-50/50 dark:hover:bg-white/5 rounded-t-xl',
          'list-none [&::-webkit-details-marker]:hidden',
          !open && 'rounded-b-xl'
        )}
        aria-controls={contentId}
        aria-expanded={open}
        data-component-part="expandable-button"
      >
        <Icon
          icon="angle-right"
          className={cn('h-2.5 w-2.5 bg-zinc-400 transition-transform', open && 'rotate-90')}
          data-component-part="expandable-icon"
        />
        <div className="ml-3 leading-tight text-left">
          <p className="m-0" contentEditable={false}>
            {open ? openedText : closedText} {title}
          </p>
        </div>
      </summary>
      <div
        id={contentId}
        className={cn(
          EXPANDABLE_CONTENT_CLASS,
          'mx-3 px-2 border-t border-gray-100 dark:border-white/10'
        )}
        data-component-part={EXPANDABLE_CONTENT_CLASS}
      >
        {shouldRenderChildren && children}
      </div>
    </details>
  );
}
