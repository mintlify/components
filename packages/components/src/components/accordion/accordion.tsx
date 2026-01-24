import slugify from "@sindresorhus/slugify";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Icon as ComponentIcon } from "@/components/icon";

import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import type { IconType } from "@/utils/icon-utils";

import { AccordionCover } from "./accordion-cover";
import { CONNECTING_CHARACTER } from "./accordion-url-utils";

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
  onUrlStateChange?: (
    isOpen: boolean,
    id: string | undefined,
    parentIds: string[]
  ) => void;
};

const Accordion = ({
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
}: AccordionProps) => {
  const onChange = (open: boolean) => {
    if (open) {
      trackOpen?.({ title });
    } else {
      trackClose?.({ title });
    }
  };

  const Icon =
    typeof icon === "string" ? (
      <ComponentIcon className="size-4" icon={icon} iconType={iconType} />
    ) : (
      icon
    );
  return (
    <GenericAccordion
      _disabled={_disabled}
      className={className}
      defaultOpen={
        defaultOpen === true ||
        (typeof defaultOpen === "string" && defaultOpen === "true")
      }
      description={description}
      getInitialOpenFromUrl={getInitialOpenFromUrl}
      icon={Icon}
      onChange={onChange}
      onMount={onMount}
      onUrlStateChange={onUrlStateChange}
      title={title}
      topOffset={topOffset}
    >
      {children}
    </GenericAccordion>
  );
};

const AccordionContext = createContext({ parentIds: [] as string[] });

type GenericAccordionProps = {
  title: string | ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  onChange?: (open: boolean) => void;
} & Pick<
  AccordionProps,
  | "description"
  | "children"
  | "className"
  | "_disabled"
  | "onMount"
  | "topOffset"
  | "getInitialOpenFromUrl"
  | "onUrlStateChange"
>;

const GenericAccordion = ({
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
}: GenericAccordionProps) => {
  const generatedId = useId();
  const id =
    typeof title === "string"
      ? slugify(title.split(CONNECTING_CHARACTER).join("-"), {
          decamelize: false,
        })
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO
  useEffect(() => {
    if (getInitialOpenFromUrl && id) {
      const urlResult = getInitialOpenFromUrl(id, context.parentIds);
      if (urlResult === true && !openRef.current) {
        setOpen(true);
        openRef.current = true;
      }
    }

    onMount?.();
  }, []);

  const onClickOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    openRef.current = isOpen;

    if (!_disabled && onUrlStateChange) {
      onUrlStateChange(
        isOpen,
        typeof title === "string" ? id : undefined,
        context.parentIds
      );
    }

    onChange?.(isOpen);
  };

  return (
    <AccordionContext.Provider
      value={{
        ...context,
        parentIds: [
          ...context.parentIds,
          ...(typeof title === "string" ? [id] : []),
        ],
      }}
    >
      <details
        className={cn(
          Classes.Accordion,
          "mb-3 cursor-default overflow-hidden rounded-2xl border border-stone-200/70 bg-white dark:border-white/10 dark:bg-[#0b0c0e]",
          className
        )}
        data-component-part="accordion"
        key={typeof title === "string" ? title : "accordion"}
        onToggle={(e) => {
          const newState = e.currentTarget.open;
          if (newState !== openRef.current) {
            onClickOpen(newState);
          }
        }}
        open={open}
      >
        <AccordionCover
          description={description}
          icon={icon}
          id={id}
          open={open}
          title={title}
          topOffset={topOffset}
        />
        {/** biome-ignore lint/a11y/useSemanticElements: TODO */}
        <div
          aria-labelledby={`${id}-label`}
          className="prose prose-stone dark:prose-invert mx-6 mt-2 mb-4 cursor-default overflow-x-auto"
          data-component-part="accordion-content"
          id={`${id}-accordion-children`}
          role="region"
        >
          {children}
        </div>
      </details>
    </AccordionContext.Provider>
  );
};

export { Accordion };
