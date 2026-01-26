import {
  Children,
  isValidElement,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/icon";
import {
  CHILD_HEADING_IDS_ATTRIBUTE,
  CHILD_TAB_IDS_ATTRIBUTE,
} from "@/constants";
import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import type { IconLibrary, IconType } from "@/utils/icon-utils";
import { slugify } from "@/utils/slugify";

const DEFAULT_TAB_TITLE = "Tab Title";

type TabsItemProps = {
  id?: string;
  title: string;
  icon?: string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  children?: ReactNode;
  [CHILD_TAB_IDS_ATTRIBUTE]?: string;
  [CHILD_HEADING_IDS_ATTRIBUTE]?: string;
};

const TabsItem = ({ children }: TabsItemProps) => {
  return <>{children}</>;
};

/**
 * Mint app integration:
 * - Wrap with useTabState hook for URL hash sync, tab sync across components, and localStorage persistence
 * - useTabState provides: activeIndex, setActiveIndex (handles hash/sync/persist updates)
 * - Connect onTabChange to setActiveIndex for full integration
 * - Pass panelsRef and use it to implement findInPanels callback for useTabState
 * - The component renders role="tabpanel" and aria-controls attributes that useTabState's
 *   findAndActivateTabContainingElement() uses for DOM-based navigation
 */
type TabsProps = {
  children: ReactElement<TabsItemProps> | ReactElement<TabsItemProps>[];
  defaultTabIndex?: number;
  onTabChange?: (tabIndex: number) => void;
  className?: string;
  borderBottom?: boolean;
  ariaLabel?: string;
  panelsRef?: RefObject<HTMLDivElement>;
};

const TabsRoot = ({
  children,
  defaultTabIndex = 0,
  onTabChange,
  className,
  borderBottom,
  ariaLabel,
  panelsRef,
}: TabsProps) => {
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const uniqueId = useId();

  const arrayChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TabsItemProps> => isValidElement(child)
  );

  const tabIds = arrayChildren.map((child, index) => {
    if (child.props.id) {
      return child.props.id;
    }

    const tabId = child.props.title ?? DEFAULT_TAB_TITLE;
    return `${uniqueId}-${slugify(tabId)}-${index}`;
  });

  const validDefaultTabIndex =
    arrayChildren.length > 0
      ? Math.max(0, Math.min(defaultTabIndex, arrayChildren.length - 1))
      : 0;

  const [activeTabIndex, setActiveTabIndex] = useState(validDefaultTabIndex);

  useEffect(() => {
    if (arrayChildren.length > 0 && activeTabIndex >= arrayChildren.length) {
      setActiveTabIndex(arrayChildren.length - 1);
    }
  }, [arrayChildren.length, activeTabIndex]);

  const handleTabClick = useCallback(
    (index: number) => {
      if (index === activeTabIndex) {
        return;
      }
      setActiveTabIndex(index);
      onTabChange?.(index);
    },
    [activeTabIndex, onTabChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, currentIndex: number) => {
      const tabCount = arrayChildren.length;
      if (tabCount === 0) {
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex =
          e.key === "ArrowLeft"
            ? (currentIndex - 1 + tabCount) % tabCount
            : (currentIndex + 1) % tabCount;
        handleTabClick(newIndex);
        setTimeout(() => {
          tabRefs.current[newIndex]?.focus();
        }, 0);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTabClick(currentIndex);
      } else if (e.key === "Home") {
        e.preventDefault();
        handleTabClick(0);
        setTimeout(() => {
          tabRefs.current[0]?.focus();
        }, 0);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIndex = tabCount - 1;
        handleTabClick(lastIndex);
        setTimeout(() => {
          tabRefs.current[lastIndex]?.focus();
        }, 0);
      }
    },
    [arrayChildren.length, handleTabClick]
  );

  return (
    <div
      className={cn(
        Classes.Tabs,
        "tabs tab-container",
        borderBottom && "border-stone-200 border-b pb-6 dark:border-stone-700",
        className
      )}
    >
      <ul
        aria-label={ariaLabel ?? "Tabs"}
        className="not-prose mb-6 flex min-w-full flex-none gap-x-6 overflow-auto border-stone-200 border-b pb-px dark:border-stone-700"
        data-component-part="tabs-list"
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: TODO
        role="tablist"
      >
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => {
          const title = child.props.title ?? DEFAULT_TAB_TITLE;
          const icon = child.props.icon;
          const iconType = child.props.iconType;
          const iconLibrary = child.props.iconLibrary;
          const isActive = i === activeTabIndex;

          return (
            <li
              aria-controls={`panel-${tabIds[i]}`}
              aria-selected={isActive}
              className="cursor-pointer"
              data-child-heading-ids={child.props[CHILD_HEADING_IDS_ATTRIBUTE]}
              data-child-tab-ids={child.props[CHILD_TAB_IDS_ATTRIBUTE]}
              data-component-part="tab"
              id={tabIds[i]}
              key={tabIds[i]}
              onClick={(e) => {
                e.stopPropagation();
                handleTabClick(i);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: TODO
              role="tab"
              tabIndex={isActive ? 0 : -1}
            >
              <div
                className={cn(
                  "-mb-px flex max-w-max items-center gap-1.5 whitespace-nowrap border-b pt-3 pb-2.5 font-semibold text-sm leading-6",
                  isActive
                    ? "border-current text-primary dark:text-primary-light"
                    : "border-transparent text-stone-900 hover:border-stone-300 dark:text-stone-200 dark:hover:border-stone-700"
                )}
                data-active={isActive}
                data-component-part="tab-button"
                data-testid={`tab-${title}`}
              >
                {icon && (
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      isActive
                        ? "bg-primary dark:bg-primary-light"
                        : "bg-stone-900 dark:bg-stone-200",
                      Classes.TabIcon
                    )}
                    icon={icon}
                    iconLibrary={iconLibrary}
                    iconType={iconType}
                    overrideColor
                  />
                )}
                {title}
              </div>
            </li>
          );
        })}
      </ul>
      <div data-component-part="tabs-panels" ref={panelsRef}>
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => {
          const isActive = i === activeTabIndex;
          return (
            <div
              aria-hidden={!isActive}
              aria-labelledby={tabIds[i]}
              className={cn(
                "prose dark:prose-invert overflow-x-auto",
                !isActive && "hidden"
              )}
              data-component-part="tab-content"
              id={`panel-${tabIds[i]}`}
              key={tabIds[i]}
              role="tabpanel"
              tabIndex={isActive ? 0 : -1}
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Tabs = Object.assign(TabsRoot, {
  Item: TabsItem,
});

export type { TabsProps, TabsItemProps };
