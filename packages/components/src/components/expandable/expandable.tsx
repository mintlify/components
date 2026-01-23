import {
  type ReactNode,
  type RefObject,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from "react";
import { Icon } from "@/components/icon";
import { useExpandableMemory } from "@/hooks/use-expandable-memory";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";

const EXPANDABLE_CONTENT_CLASS = "expandable-content";
const DEFAULT_OPENED_TEXT = "Hide";
const DEFAULT_CLOSED_TEXT = "Show";
const DEFAULT_TITLE = "child attributes";

type ExpandableProps = {
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
  openedText?: string;
  closedText?: string;
  hasScrolledToAnchorRef?: RefObject<boolean>;
  anchor?: string;
};

const Expandable = ({
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
}: ExpandableProps) => {
  const shouldUseSessionStorage = !!uniqueParamId;
  const {
    ref: expandableRef,
    isExpanded,
    onManualToggle,
    isInSessionStorage,
  } = useExpandableMemory(uniqueParamId || "", defaultOpen);

  const [localOpen, setLocalOpen] = useState(defaultOpen);

  const containsAnchor = Boolean(
    uniqueParamId && anchor?.includes(uniqueParamId)
  );
  const shouldOverrideForAnchor =
    containsAnchor && !hasScrolledToAnchorRef?.current;

  const open = shouldUseSessionStorage
    ? // biome-ignore lint/style/noNestedTernary: TODO
      shouldOverrideForAnchor
      ? true
      : // biome-ignore lint/style/noNestedTernary: TODO
        isInSessionStorage
        ? isExpanded
        : defaultOpen
    : localOpen;

  const [shouldRenderChildren, setShouldRenderChildren] = useState(
    open || !lazy
  );

  useLayoutEffect(() => {
    if (open && !shouldRenderChildren) {
      setShouldRenderChildren(true);
    }
  }, [open, shouldRenderChildren]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO
  useEffect(() => {
    onMount?.();
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

  const reactId = useId();
  const contentId = `${title}-${reactId}-content`.replace(/\s+/g, "-");

  return (
    <details
      className={cn(
        Classes.Expandable,
        "mt-4 rounded-xl border-standard",
        className
      )}
      data-component-part="expandable"
      data-testid={uniqueParamId ? `${uniqueParamId}-children` : undefined}
      key={title}
      onToggle={(e) => {
        const newState = e.currentTarget.open;
        if (newState !== open) {
          setOpenState(newState);
        }
      }}
      open={open}
      ref={expandableRef as RefObject<HTMLDetailsElement>}
    >
      {/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: TODO */}
      <summary
        aria-controls={contentId}
        aria-expanded={open}
        className={cn(
          "not-prose flex w-full cursor-pointer flex-row content-center items-center text-sm",
          "rounded-t-xl px-3.5 py-3 text-gray-600 hover:bg-gray-50/50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-200",
          "list-none [&::-webkit-details-marker]:hidden",
          !open && "rounded-b-xl"
        )}
        data-component-part="expandable-button"
      >
        <Icon
          className={cn(
            "size-2.5 bg-zinc-400 transition-transform",
            open && "rotate-90"
          )}
          data-component-part="expandable-icon"
          icon="angle-right"
        />
        <div className="ml-3 text-left leading-tight">
          <p className="m-0" contentEditable={false}>
            {open ? openedText : closedText} {title}
          </p>
        </div>
      </summary>
      <div
        className={cn(
          EXPANDABLE_CONTENT_CLASS,
          "mx-3 border-gray-100 border-t px-2 dark:border-white/10"
        )}
        data-component-part={EXPANDABLE_CONTENT_CLASS}
        id={contentId}
      >
        {shouldRenderChildren && children}
      </div>
    </details>
  );
};

export { Expandable };
export type { ExpandableProps };
