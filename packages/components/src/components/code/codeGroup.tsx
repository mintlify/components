import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, {
  ComponentPropsWithoutRef,
  FormEventHandler,
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { getCodeBlockScrollbarClassname } from '@/utils/getScrollbarClassname';
import { BaseCodeBlock } from './baseCodeBlock';
import { CodeBlockPropsBase } from './codeBlock';
import { getNodeText } from './getNodeText';

export type CopyToClipboardResult = {
  success: boolean;
  error?: Error;
};

export type CodeGroupPropsBase = {
  dropdown?: boolean;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  isSmallText?: boolean;
  children?: ReactElement<CodeBlockPropsBase>[] | ReactElement<CodeBlockPropsBase>;
  onChange?: FormEventHandler<HTMLDivElement> & ((index: number) => void);
  noMargins?: boolean;
  hideCodeSnippetFeedbackButton?: boolean;
  codeBlockTheme?: 'dark' | 'system';
  /**
   * Controlled selected tab index. When provided, the component operates in controlled mode.
   * Use with onChange to manage state externally (e.g., with useTabState hook).
   */
  selectedIndex?: number;
  /**
   * Default selected tab index for uncontrolled mode. Defaults to 0.
   */
  defaultSelectedIndex?: number;
  /**
   * Primary brand color (RGB values, e.g., "37 99 235"). Used for selected tab text and underline.
   * @default "37 99 235" (blue-600)
   */
  primary?: string;
  /**
   * Light variant of primary color (RGB values). Used for selected tab in dark mode.
   * @default "96 165 250" (blue-400)
   */
  primaryLight?: string;
  /**
   * Dark variant of primary color (RGB values). Used for focus states.
   * @default "29 78 216" (blue-700)
   */
  primaryDark?: string;
  /**
   * Render prop for action buttons (copy, feedback, AI, etc.)
   * Receives the currently selected code string and child props
   */
  renderActionButtons?: (params: {
    code: string;
    selectedIndex: number;
    childProps: CodeBlockPropsBase;
    onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  }) => ReactNode;
  /**
   * Render prop for language dropdown in dropdown mode
   */
  renderLanguageDropdown?: (params: {
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    languages: string[];
  }) => ReactNode;
};

export type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeGroupPropsBase | 'defaultValue'>;

type CodeBlockChild = Exclude<React.ReactElement<CodeBlockPropsBase>, boolean | null | undefined>;

export const CodeGroup = function CodeGroup({
  children,
  onCopied,
  onChange,
  isSmallText,
  className,
  noMargins,
  dropdown,
  codeBlockTheme = 'system',
  renderActionButtons,
  renderLanguageDropdown,
  selectedIndex: controlledSelectedIndex,
  defaultSelectedIndex = 0,
  primary = '37 99 235',
  primaryLight = '96 165 250',
  primaryDark = '29 78 216',
}: CodeGroupProps) {
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const childArr = Array.isArray(children)
    ? children
    : (React.Children.toArray(children) as Array<CodeBlockChild>);

  const [uncontrolledSelectedTab, setUncontrolledSelectedTab] = useState(defaultSelectedIndex);

  // Support both controlled and uncontrolled modes
  const isControlled = controlledSelectedIndex !== undefined;
  const selectedTab = isControlled ? controlledSelectedIndex : uncontrolledSelectedTab;

  const handleValueChange = useCallback(
    (value: string) => {
      const index = Number(value);
      const wasFocusOnTab = document.activeElement?.getAttribute('role') === 'tab';

      // Important to clear hash to avoid collisions with tab groups
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      // Only update internal state if in uncontrolled mode
      if (!isControlled) {
        setUncontrolledSelectedTab(index);
      }

      // Always call onChange callback
      if (typeof onChange === 'function') {
        onChange(index);
      }

      if (wasFocusOnTab) {
        requestAnimationFrame(() => {
          const trigger = triggerRefs.current.get(index);
          if (trigger) {
            trigger.focus();
          }
        });
      }
    },
    [onChange, isControlled]
  );

  if (!children) {
    return null;
  }

  if (childArr.length === 0) {
    console.warn('CodeGroup has no children, expected at least one CodeBlock child.');
    return null;
  }

  const selectedIndex = Number(selectedTab);

  const SelectedFilename = () => {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium min-w-0">
        {childArr[selectedIndex]?.props.icon &&
          typeof childArr[selectedIndex]?.props.icon === 'string' && (
            <ComponentIcon
              icon={childArr[selectedIndex]?.props.icon}
              iconType="regular"
              className={cn('h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400', Classes.CodeBlockIcon)}
              overrideColor
            />
          )}
        <span
          className={cn(
            'truncate',
            codeBlockTheme === 'system' && 'text-gray-950 dark:text-gray-50',
            codeBlockTheme === 'dark' && 'text-gray-50'
          )}
        >
          {childArr[selectedIndex]?.props.filename}
        </span>
      </div>
    );
  };

  const TabList = () => {
    return (
      <TabsPrimitive.List
        className={cn(
          'flex-1 w-0 text-xs leading-6 rounded-tl-xl gap-1 flex overflow-x-auto overflow-y-hidden',
          getCodeBlockScrollbarClassname(codeBlockTheme)
        )}
      >
        {childArr.map((child, index) => (
          <TabItem
            key={child.props.filename + 'TabItem' + index}
            value={String(index)}
            isSelected={selectedIndex === index}
            tabsLength={childArr.length}
            codeBlockTheme={codeBlockTheme}
            ref={(el) => {
              if (el) {
                triggerRefs.current.set(index, el);
              }
            }}
          >
            {child.props.icon && typeof child.props.icon === 'string' && (
              <ComponentIcon
                icon={child.props.icon}
                iconType="regular"
                className={cn(
                  'h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400',
                  codeBlockTheme === 'system'
                    ? 'group-hover:bg-primary dark:group-hover:bg-primary-light'
                    : 'group-hover:bg-gray-700/70 group-hover:text-primary-light',
                  Classes.CodeBlockIcon
                )}
                color={selectedIndex === index ? 'currentColor' : undefined}
                overrideColor
              />
            )}
            {child.props.filename}
          </TabItem>
        ))}
      </TabsPrimitive.List>
    );
  };

  const selectedCode = getNodeText(childArr[selectedIndex]?.props?.children);
  const selectedChildProps = childArr[selectedIndex]?.props;

  return (
    <TabsPrimitive.Root
      value={String(selectedTab)}
      onValueChange={handleValueChange}
      className={cn(
        Classes.CodeGroup,
        'p-0.5 mt-5 mb-8 flex flex-col not-prose relative overflow-hidden rounded-2xl border border-gray-950/10 dark:border-white/10',
        noMargins && 'my-0',
        codeBlockTheme === 'system' &&
          'bg-gray-50 dark:bg-white/5 dark:codeblock-dark text-gray-950 dark:text-gray-50 codeblock-light',
        codeBlockTheme === 'dark' &&
          'border-transparent bg-white/5 text-gray-50 codeblock-dark',
        className
      )}
      style={
        {
          '--primary': primary,
          '--primary-light': primaryLight,
          '--primary-dark': primaryDark,
        } as React.CSSProperties
      }
      asChild={false}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 relative',
          dropdown ? 'px-2.5' : 'pr-2.5 *:first:*:ml-2.5'
        )}
        data-component-part="code-group-tab-bar"
      >
        {dropdown ? <SelectedFilename /> : <TabList />}
        <div className="flex items-center justify-end shrink-0 gap-1.5">
          {dropdown && renderLanguageDropdown && (
            <>
              {renderLanguageDropdown({
                selectedLanguage: childArr[selectedIndex]?.props.language || '',
                setSelectedLanguage: (language: string) => {
                  const index = childArr.findIndex((child) => child.props.language === language);
                  if (index !== -1) {
                    handleValueChange(String(index));
                  }
                },
                languages: childArr.map((child) => child.props.language || ''),
              })}
            </>
          )}
          {renderActionButtons &&
            renderActionButtons({
              code: selectedCode,
              selectedIndex,
              childProps: selectedChildProps,
              onCopied,
            })}
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {childArr.map((child, index) => {
          return (
            <TabsPrimitive.Content
              key={child.props.filename + 'Content' + index}
              value={String(index)}
              className="w-full min-w-full max-w-full h-full max-h-full relative"
              tabIndex={-1}
            >
              <BaseCodeBlock
                {...child.props}
                isParentCodeGroup={true}
                isSmallText={isSmallText}
                shouldHighlight={index === selectedIndex}
                // avoid heavy re-rendering of the code block
                expandable={child.props.expandable && index === selectedIndex}
                codeBlockTheme={codeBlockTheme}
                codeBlockThemeObject={codeBlockTheme}
              />
            </TabsPrimitive.Content>
          );
        })}
      </div>
    </TabsPrimitive.Root>
  );
};

const TabItem = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  {
    children: ReactNode;
    value: string;
    isSelected: boolean;
    tabsLength: number;
    codeBlockTheme: 'dark' | 'system' | undefined;
  }
>(function TabItem({ children, value, isSelected, tabsLength, codeBlockTheme }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        'group flex items-center relative gap-1.5 my-1 mb-1.5 outline-0 whitespace-nowrap font-medium !ml-0 first:!ml-2.5 focus:outline-2',
        isSelected && codeBlockTheme === 'system' && 'text-primary dark:text-primary-light',
        isSelected &&
          (codeBlockTheme === 'dark' || codeBlockTheme == undefined) &&
          'text-primary-light',
        !isSelected && codeBlockTheme === 'system' && 'text-gray-500 dark:text-gray-400',
        !isSelected && (codeBlockTheme === 'dark' || codeBlockTheme == undefined) && 'text-gray-400'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 px-1.5 rounded-lg z-10',
          tabsLength > 1 &&
            codeBlockTheme === 'system' &&
            'group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/70 group-hover:text-primary dark:group-hover:text-primary-light',
          tabsLength > 1 &&
            (codeBlockTheme === 'dark' || codeBlockTheme == undefined) &&
            'group-hover:bg-gray-700/70 group-hover:text-primary-light'
        )}
      >
        {children}
      </div>

      {isSelected && (
        <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary dark:bg-primary-light" />
      )}
    </TabsPrimitive.Trigger>
  );
});
