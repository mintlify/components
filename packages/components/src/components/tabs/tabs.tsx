'use client';

import { Children, useRef, useCallback, isValidElement, useState, ReactElement, ReactNode } from 'react';

import { Icon } from '@/components/icon';
import { Classes } from '@/lib/local/selectors';
import { IconLibrary, IconType } from '@/models';
import { cn } from '@/utils/cn';

/**
 * Simple slugify function that converts a string into a URL-friendly slug.
 */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const DEFAULT_TAB_TITLE = 'Tab Title';

export type TabsItemProps = {
  /** Unique identifier for the tab */
  id?: string;
  /** Title displayed in the tab button */
  title: string;
  /** Icon to display in the tab button (string for Icon component or ReactNode) */
  icon?: string;
  /** Icon type for FontAwesome icons */
  iconType?: IconType;
  /** Icon library to use */
  iconLibrary?: IconLibrary;
  /** Content displayed when the tab is active */
  children?: ReactNode;
};

/**
 * TabsItem is used as a child of Tabs to define individual tab panels.
 * Access via Tabs.Item
 */
function TabsItem({ children }: TabsItemProps) {
  // This component is used for its props only, the actual rendering is handled by Tabs
  return <>{children}</>;
}

export type TabsProps = {
  /** Tab items - should be Tabs.Item components */
  children: ReactElement<TabsItemProps>[];
  /** Index of the initially active tab (0-based) */
  defaultTabIndex?: number;
  /** Callback fired when a tab is clicked */
  onTabChange?: (tabIndex: number) => void;
  /** Additional CSS class for the tab list */
  className?: string;
  /** Whether to show a border at the bottom of the tabs container */
  borderBottom?: boolean;
};

function TabsRoot({
  children,
  defaultTabIndex = 0,
  onTabChange,
  className,
  borderBottom,
}: TabsProps) {
  const tabListRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  const arrayChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TabsItemProps> => isValidElement(child)
  );

  const tabIds = arrayChildren.map((child, index) => {
    if (child.props?.id) return child.props.id;
    const tabId = child.props?.title || DEFAULT_TAB_TITLE;
    return `${slugify(tabId)}-${index}`;
  });

  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex);

  const handleTabClick = useCallback(
    (index: number) => {
      if (index === activeTabIndex) return;
      setActiveTabIndex(index);
      onTabChange?.(index);
    },
    [activeTabIndex, onTabChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex =
          e.key === 'ArrowLeft'
            ? (currentIndex - 1 + arrayChildren.length) % arrayChildren.length
            : (currentIndex + 1) % arrayChildren.length;
        handleTabClick(newIndex);
        setTimeout(() => {
          tabRefs.current[newIndex]?.focus();
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
        borderBottom && 'border-b border-gray-200 dark:border-gray-200/10 pb-6'
      )}
    >
      <ul
        ref={tabListRef}
        role="tablist"
        className={cn(
          'not-prose mb-6 pb-[1px] flex-none min-w-full overflow-auto border-b border-gray-200 gap-x-6 flex dark:border-gray-200/10',
          className
        )}
        data-component-part="tabs-list"
      >
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => {
          const title = child.props?.title ?? DEFAULT_TAB_TITLE;
          const icon = child.props?.icon;
          const iconType = child.props?.iconType;
          const iconLibrary = child.props?.iconLibrary;
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
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleTabClick(i);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              data-component-part="tab"
            >
              <div
                className={cn(
                  'flex text-sm items-center gap-1.5 leading-6 font-semibold whitespace-nowrap pt-3 pb-2.5 -mb-px max-w-max border-b',
                  isActive
                    ? 'text-primary dark:text-primary-light border-current'
                    : 'text-gray-900 border-transparent hover:border-gray-300 dark:text-gray-200 dark:hover:border-gray-700'
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
                      isActive ? 'bg-primary dark:bg-primary-light' : 'bg-gray-900 dark:bg-gray-200',
                      Classes.TabIcon
                    )}
                    overrideColor
                  />
                )}{' '}
                {title}
              </div>
            </li>
          );
        })}
      </ul>
      <div data-component-part="tabs-panels">
        {arrayChildren.map((child: ReactElement<TabsItemProps>, i: number) => (
          <div
            key={tabIds[i]}
            id={`panel-${tabIds[i]}`}
            role="tabpanel"
            aria-labelledby={tabIds[i]}
            className={cn(
              'prose dark:prose-dark overflow-x-auto',
              i !== activeTabIndex && 'hidden'
            )}
            data-component-part="tab-content"
          >
            {child.props?.children}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Tabs component for organizing content into selectable tabs.
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <Tabs.Item title="First Tab">
 *     Content for the first tab
 *   </Tabs.Item>
 *   <Tabs.Item title="Second Tab">
 *     Content for the second tab
 *   </Tabs.Item>
 * </Tabs>
 * ```
 */
export const Tabs = Object.assign(TabsRoot, {
  Item: TabsItem,
});

// For backwards compatibility - export TabsItem separately too
export { TabsItem };
