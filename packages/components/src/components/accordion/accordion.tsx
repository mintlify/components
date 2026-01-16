import { IconType } from '@/models';
import slugify from '@sindresorhus/slugify';
import { ReactNode, createContext, useContext, useEffect, useId, useRef, useState } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { cn } from '@/utils/cn';

import { AccordionCover } from './accordionCover';
import { CONNECTING_CHARACTER } from './accordionUrlUtils';

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

  /** Custom top offset for the anchor element (default: '-top-18') */
  topOffset?: string;

  /** Get initial open state based on URL/hash. Return true to open, false to use defaultOpen. */
  getInitialOpenFromUrl?: (id: string, parentIds: string[]) => boolean;

  /** Called when accordion state changes to update URL. Receives open state, accordion id, and parent ids. */
  onUrlStateChange?: (isOpen: boolean, id: string | undefined, parentIds: string[]) => void;
}) {
  const generatedId = useId();
  const id =
    typeof title === 'string'
      ? slugify(title.split(CONNECTING_CHARACTER).join('-'), { decamelize: false })
      : generatedId;

  const context = useContext(AccordionContext);

  const initialOpen = (() => {
    if (getInitialOpenFromUrl && id) {
      const urlResult = getInitialOpenFromUrl(id, context.parentIds);
      if (urlResult === true) {
        return true;
      }
    }
    return defaultOpen;
  })();

  const [open, setOpen] = useState<boolean>(initialOpen);
  const openRef = useRef<boolean>(initialOpen);

  useEffect(() => {
    if (getInitialOpenFromUrl && id) {
      const urlResult = getInitialOpenFromUrl(id, context.parentIds);
      if (urlResult === true && !openRef.current) {
        setOpen(true);
        openRef.current = true;
      }
    }

    onMount?.();
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
        className={cn(Classes.Accordion, 'border border-gray-200/70 dark:border-white/10 rounded-2xl mb-3 overflow-hidden bg-white dark:bg-[#0b0c0e] cursor-default', className)}
        data-component-part="accordion"
      >
        <AccordionCover
          id={id}
          title={title}
          description={description}
          open={open}
          icon={icon}
          topOffset={topOffset}
        />
        <div
          id={id + '-accordion-children'}
          role="region"
          aria-labelledby={id + '-label'}
          className="mt-2 mb-4 mx-6 prose prose-gray dark:prose-invert overflow-x-auto cursor-default"
          data-component-part="accordion-content"
        >
          {children}
        </div>
      </details>
    </AccordionContext.Provider>
  );
}
