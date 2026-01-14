import { IconType } from '@/models';
import slugify from '@sindresorhus/slugify';
import { isEqual } from 'lodash';
import { ReactNode, createContext, useContext, useEffect, useId, useRef, useState } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { cn } from '@/utils/cn';

import { AccordionCover } from './accordionCover';

type AccordionProps = {
  title: string;
  description?: string;
  defaultOpen: boolean;
  icon?: ReactNode | string;
  iconType?: IconType;
  children: ReactNode;
  className?: string;
  _disabled?: boolean;
  trackOpen?: (event: { title: string }) => void;
  trackClose?: (event: { title: string }) => void;
  onMount?: () => void;
  topOffset?: string;
  getInitialOpenFromUrl?: (id: string, parentIds: string[]) => boolean;
  onUrlStateChange?: (isOpen: boolean, id: string | undefined, parentIds: string[]) => void;
}

export function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  iconType,
  children,
  className,
  _disabled,
  trackOpen,
  trackClose,
  onMount,
  topOffset,
  getInitialOpenFromUrl,
  onUrlStateChange,
}: AccordionProps) {
  const onChange = (open: boolean) => {
    if (open) {
      trackOpen?.({ title });
    } else {
      trackClose?.({ title });
    }
  };

  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon icon={icon} iconType={iconType} className="w-4 h-4" />
    ) : (
      icon
    );
  return (
    <GenericAccordion
      title={title}
      description={description}
      defaultOpen={
        defaultOpen === true || (typeof defaultOpen === 'string' && defaultOpen === 'true')
      }
      onChange={onChange}
      icon={Icon}
      className={className}
      _disabled={_disabled}
      onMount={onMount}
      topOffset={topOffset}
      getInitialOpenFromUrl={getInitialOpenFromUrl}
      onUrlStateChange={onUrlStateChange}
    >
      {children}
    </GenericAccordion>
  );
}

const AccordionContext = createContext({ parentIds: [] as string[] });

function GenericAccordion({
  title,
  description,
  defaultOpen = false,
  icon,
  onChange,
  children,
  className,
  _disabled,
  onMount,
  topOffset,
  getInitialOpenFromUrl,
  onUrlStateChange,
}: {
  /** The main text of the Accordion shown in bold */
  title: string | ReactNode;

  /** Text under the title */
  description?: string;

  /** Whether the Accordion is open initially */
  defaultOpen?: boolean;

  /** Icon to display to the left */
  icon?: ReactNode;

  /** Callback when the Accordion is clicked with the new open state */
  onChange?: (open: boolean) => void;

  /** The Accordion contents */
  children: ReactNode;

  /** Custom className for the root element */
  className?: string;

  /** For internal use only (whether to make clicking affect URL state) */
  _disabled?: boolean;

  /** Callback when the accordion mounts (called on initial render if conditions are met) */
  onMount?: () => void;

  /** Custom top offset for the anchor element (default: '-top-[4.5rem]') */
  topOffset?: string;

  /** Get initial open state based on URL/hash. Return true to open, false to use defaultOpen. */
  getInitialOpenFromUrl?: (id: string, parentIds: string[]) => boolean;

  /** Called when accordion state changes to update URL. Receives open state, accordion id, and parent ids. */
  onUrlStateChange?: (isOpen: boolean, id: string | undefined, parentIds: string[]) => void;
}) {
  const connectingCharacter = ':';
  const generatedId = useId();
  const id =
    typeof title === 'string'
      ? slugify(title.replace(connectingCharacter, '-'), { decamelize: false })
      : generatedId;

  const context = useContext(AccordionContext);

  const initialOpen = (() => {
    if (getInitialOpenFromUrl && id) {
      return getInitialOpenFromUrl(id, context.parentIds);
    }
    return defaultOpen;
  })();

  const [open, setOpen] = useState<boolean>(initialOpen);
  const openRef = useRef<boolean>(initialOpen);

  useEffect(() => {
    if (!onMount || !open) return;

    if (getInitialOpenFromUrl) {
      const hashes =
        typeof window !== 'undefined'
          ? window.location.hash.substring(1).split(connectingCharacter)
          : undefined;

      if (
        id &&
        hashes &&
        hashes.length > context.parentIds.length &&
        hashes[context.parentIds.length] === id &&
        isEqual(context.parentIds, hashes.slice(0, context.parentIds.length))
      ) {
        // used for scrollElementIntoView into view when open from url
        onMount();
      }
    } else {
      onMount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    openRef.current = isOpen;

    // Call the URL state change callback if provided
    if (!_disabled && onUrlStateChange) {
      onUrlStateChange(isOpen, typeof title === 'string' ? id : undefined, context.parentIds);
    }

    // Call the onChange callback
    if (onChange) {
      onChange(isOpen);
    }
  };

  const parentClass =
    'border border-gray-200/70 dark:border-white/10 rounded-2xl mb-3 overflow-hidden bg-white dark:bg-[#0b0c0e]';
  const coverClass = 'py-4 px-5 space-x-2 hover:bg-gray-100 hover:dark:bg-gray-800 rounded-t-xl';
  const contentClass = 'mt-2 mb-4 mx-6';

  return (
    <AccordionContext.Provider
      value={{
        ...context,
        parentIds: [...context.parentIds, ...(typeof title === 'string' ? [id] : [])],
      }}
    >
      <details
        open={open}
        onToggle={(e) => {
          const newState = e.currentTarget.open;
          if (newState !== openRef.current) {
            onClickOpen(newState);
          }
        }}
        key={typeof title === 'string' ? title : 'accordion'}
        className={cn(Classes.Accordion, parentClass, 'cursor-default', className)}
        data-component-part="accordion"
      >
        <AccordionCover
          id={id}
          title={title}
          description={description}
          open={open}
          icon={icon}
          coverClass={coverClass}
          topOffset={topOffset}
        />
        <div
          id={id + ' accordion children'}
          role="region"
          aria-labelledby={id + '-label'}
          className={cn(
            contentClass,
            'prose prose-gray dark:prose-invert overflow-x-auto cursor-default'
          )}
          data-component-part="accordion-content"
        >
          {children}
        </div>
      </details>
    </AccordionContext.Provider>
  );
}
