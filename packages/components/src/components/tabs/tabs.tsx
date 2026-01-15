import { Children, useRef, useCallback, isValidElement, useState, useEffect, ReactElement, ReactNode, RefObject, CSSProperties, KeyboardEvent } from 'react';

import { Icon } from '@/components/icon';
import { DEFAULT_COLORS } from '@/constants';
import { Classes } from '@/lib/local/selectors';
import { IconLibrary, IconType } from '@/models';
import { cn } from '@/utils/cn';
import { CHILD_HEADING_IDS_ATTRIBUTE, CHILD_TAB_IDS_ATTRIBUTE, slugify } from '@/common';

const DEFAULT_TAB_TITLE = 'Tab Title';

export type TabsItemProps = {
  // injected by remarkComponentIds plugin based on title
  id?: string;
  title: string;
  icon?: string;
  iconType?: IconType;
  // pass in from DocsConfigContext if specified in docs.json
  iconLibrary?: IconLibrary;
  children?: ReactNode;
  // injected by remarkComponentIds plugin - JSON array of nested tab IDs for URL hash navigation
  [CHILD_TAB_IDS_ATTRIBUTE]?: string;
  // injected by remarkComponentIds plugin - JSON array of heading IDs within this tab for URL hash navigation
  [CHILD_HEADING_IDS_ATTRIBUTE]?: string;
};

function TabsItem({ children }: TabsItemProps) {
  return <>{children}</>;
}

/**
 * Mint app integration:
 * - Wrap with useTabState hook for URL hash sync, tab sync across components, and localStorage persistence
 * - useTabState provides: activeIndex, setActiveIndex (handles hash/sync/persist updates)
 * - Connect onTabChange to setActiveIndex for full integration
 * - Pass panelsRef and use it to implement findInPanels callback for useTabState
 * - The component renders role="tabpanel" and aria-controls attributes that useTabState's
 *   findAndActivateTabContainingElement() uses for DOM-based navigation
 */
export type TabsProps = {
  children: ReactElement<TabsItemProps> | ReactElement<TabsItemProps>[];
  defaultTabIndex?: number;
  // connect to useTabState.setActiveIndex in mint app for URL hash, tab sync, and localStorage
  onTabChange?: (tabIndex: number) => void;
  className?: string;
  borderBottom?: boolean;
  ariaLabel?: string;
  // pass a ref to use with useTabState's findInPanels callback for URL hash navigation to elements inside panels
  panelsRef?: RefObject<HTMLDivElement>;
  // pass in from DocsConfigContext (colors.primary) for active tab text/underline color
  activeColor?: string;
  // pass in from DocsConfigContext (colors.primary-light or colors.primaryLight) for dark mode
  activeColorDark?: string;
};

function TabsRoot({
  children,
  defaultTabIndex = 0,
  onTabChange,
  className,
  borderBottom,
  ariaLabel,
  panelsRef,
  activeColor = DEFAULT_COLORS.primary,
  activeColorDark = DEFAULT_COLORS.light,
}: TabsProps) {
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  const colorStyles = {
    '--tabs-active-color': activeColor,
    '--tabs-active-color-dark': activeColorDark,
  } as CSSProperties;

  const arrayChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TabsItemProps> => isValidElement(child)
  );

  const tabIds = arrayChildren.map((child, index) => {
    if (child.props.id) return child.props.id;
    const tabId = child.props.title ?? DEFAULT_TAB_TITLE;
    return `${slugify(tabId)}-${index}`;
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
      if (index === activeTabIndex) return;
      setActiveTabIndex(index);
      onTabChange?.(index);
    },
    [activeTabIndex, onTabChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, currentIndex: number) => {
      const tabCount = arrayChildren.length;
      if (tabCount === 0) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex =
          e.key === 'ArrowLeft'
            ? (currentIndex - 1 + tabCount) % tabCount
            : (currentIndex + 1) % tabCount;
        handleTabClick(newIndex);
        setTimeout(() => {
          tabRefs.current[newIndex]?.focus();
        }, 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTabClick(currentIndex);
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleTabClick(0);
        setTimeout(() => {
          tabRefs.current[0]?.focus();
        }, 0);
      } else if (e.key === 'End') {
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
        'tabs tab-container',
        borderBottom && 'border-b border-gray-200 dark:border-gray-700 pb-6'
      )}
      style={colorStyles}
    >
      <ul
        role="tablist"
        aria-label={ariaLabel ?? 'Tabs'}
        className={cn(
          'not-prose mb-6 pb-[1px] flex-none min-w-full overflow-auto border-b border-gray-200 gap-x-6 flex dark:border-gray-700',
          className
        )}
        data-component-part="tabs-list"
      >
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => {
          const title = child.props.title ?? DEFAULT_TAB_TITLE;
          const icon = child.props.icon;
          const iconType = child.props.iconType;
          const iconLibrary = child.props.iconLibrary;
          const isActive = i === activeTabIndex;

          return (
            <li
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabIds[i]}
              key={tabIds[i]}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tabIds[i]}`}
              tabIndex={isActive ? 0 : -1}
              className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--tabs-active-color] dark:focus-visible:ring-[--tabs-active-color-dark] focus-visible:ring-offset-2 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleTabClick(i);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              data-component-part="tab"
              data-child-tab-ids={child.props[CHILD_TAB_IDS_ATTRIBUTE]}
              data-child-heading-ids={child.props[CHILD_HEADING_IDS_ATTRIBUTE]}
            >
              <div
                className={cn(
                  'flex text-sm items-center gap-1.5 leading-6 font-semibold whitespace-nowrap pt-3 pb-2.5 -mb-px max-w-max border-b',
                  isActive
                    ? 'text-[--tabs-active-color] dark:text-[--tabs-active-color-dark] border-current'
                    : 'text-gray-900 border-transparent hover:border-gray-300 dark:text-gray-200 dark:hover:border-gray-600'
                )}
                data-component-part="tab-button"
                data-active={isActive}
                data-testid={`tab-${title}`}
              >
                {icon && (
                  <Icon
                    icon={icon}
                    iconType={iconType}
                    iconLibrary={iconLibrary}
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isActive ? 'bg-[--tabs-active-color] dark:bg-[--tabs-active-color-dark]' : 'bg-gray-900 dark:bg-gray-200',
                      Classes.TabIcon
                    )}
                    overrideColor
                  />
                )}
                {title}
              </div>
            </li>
          );
        })}
      </ul>
      <div ref={panelsRef} data-component-part="tabs-panels">
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => {
          const isActive = i === activeTabIndex;
          return (
            <div
              key={tabIds[i]}
              id={`panel-${tabIds[i]}`}
              role="tabpanel"
              aria-labelledby={tabIds[i]}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                'prose dark:prose-invert overflow-x-auto',
                !isActive && 'hidden'
              )}
              data-component-part="tab-content"
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  Item: TabsItem,
});

