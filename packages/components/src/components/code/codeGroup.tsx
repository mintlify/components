import { slugify } from '@/common/slugify';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, {
  ComponentPropsWithoutRef,
  FormEventHandler,
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';

// import { CodeSnippetFeedbackProvider } from '@/contexts/CodeSnippetFeedbackContext';
// import { useCodeBlockThemeEnum } from '@/hooks/useCodeBlockTheme';
// import { useTabState } from '@/hooks/useTabState';
import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { extractCodeBlockBaseProps } from './codeBlockUtils';

import { getCodeBlockScrollbarClassname } from '@/utils/getScrollbarClassname';

// import { CopyToClipboardResult } from '../../utils/copyToClipboard';
// import { AskAiCodeBlockButton } from './AskAiCodeBlockButton';
// import { BaseCodeBlock } from './BaseCodeBlock';
// import { CodeBlockProps, CopyToClipboardButton } from './CodeBlock';
// import { CodeSnippetFeedbackButton } from './CodeSnippetFeedback/CodeSnippetFeedbackButton';
// import { LanguageDropdown } from './LanguageDropdown';
// import { getNodeText } from './getNodeText';

export type CodeGroupPropsBase = {
  dropdown?: boolean;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  isSmallText?: boolean;
  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;
  onChange?: FormEventHandler<HTMLDivElement> & ((index: number) => void);
  noMargins?: boolean;
  hideCodeSnippetFeedbackButton?: boolean;
};

export type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeGroupPropsBase>;

type CodeBlockChild = Exclude<React.ReactElement<CodeBlockProps>, boolean | null | undefined>;

export const CodeGroup = function CodeGroup({
  children,
  onCopied,
  onChange,
  isSmallText,
  className,
  noMargins,
  dropdown,
  hideCodeSnippetFeedbackButton,
  ...props
}: CodeGroupProps) {
  const codeBlockTheme = useCodeBlockThemeEnum();
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const childArr = Array.isArray(children)
    ? children
    : // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: Please fix this violation when you can!
    (React.Children.toArray(children) as Array<CodeBlockChild>);

  const getChildKey = useCallback(
    (child: CodeBlockChild) => {
      return dropdown ? child.props.language : child.props.filename;
    },
    [dropdown]
  );

  const tabIds = useMemo(
    () => childArr.map((child) => slugify(getChildKey(child) ?? '')),
    [childArr, getChildKey]
  );

  const tabLabels = useMemo(
    () => childArr.map((child) => getChildKey(child) ?? ''),
    [childArr, getChildKey]
  );

  const { activeIndex: selectedTab, setActiveIndex } = useTabState({
    tabIds,
    tabLabels,
    persistKey: 'code',
    defaultIndex: 0,
    onIndexChange: onChange,
  });

  const handleValueChange = useCallback(
    (value: string) => {
      const index = Number(value);
      const wasFocusOnTab = document.activeElement?.getAttribute('role') === 'tab';

      // Important to clear hash to avoid collisions with tab groups
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      setActiveIndex({ index, updateHash: false });

      if (wasFocusOnTab) {
        requestAnimationFrame(() => {
          const trigger = triggerRefs.current.get(index);
          if (trigger) {
            trigger.focus();
          }
        });
      }
    },
    [setActiveIndex]
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

  return (
    <CodeSnippetFeedbackProvider
      code={getNodeText(childArr[selectedIndex]?.props?.children)}
      hideCodeSnippetFeedbackButton={
        childArr[selectedIndex]?.props.hideCodeSnippetFeedbackButton ||
        hideCodeSnippetFeedbackButton
      }
      {...extractCodeBlockBaseProps(childArr[selectedIndex]?.props)}
    >
      {({ feedbackModalOpen, anchorRef }) => {
        return (
          // @ts-expect-error defaultValue should never an issue or passed in to the CodeBlock component
          <TabsPrimitive.Root
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            ref={anchorRef as React.Ref<HTMLDivElement>}
            value={String(selectedTab)}
            onValueChange={handleValueChange}
            className={cn(
              Classes.CodeGroup,
              'p-0.5 mt-5 mb-8 flex flex-col not-prose relative overflow-hidden rounded-2xl border border-gray-950/10 dark:border-white/10',
              noMargins && 'my-0',
              codeBlockTheme === 'system' &&
              'bg-gray-50 dark:bg-white/5 dark:codeblock-dark text-gray-950 dark:text-gray-50 codeblock-light',
              codeBlockTheme === 'dark' &&
              'border-transparent bg-codeblock dark:bg-white/5 text-gray-50 codeblock-dark',
              feedbackModalOpen && 'border border-primary dark:border-primary-light',
              className
            )}
            {...props}
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
                {dropdown && (
                  <LanguageDropdown
                    selectedLanguage={childArr[selectedIndex]?.props.language || ''}
                    setSelectedLanguage={(language: string) => {
                      const index = childArr.findIndex(
                        (child) => child.props.language === language
                      );
                      if (index !== -1) {
                        handleValueChange(String(index));
                      }
                    }}
                    languages={childArr.map((child) => child.props.language || '')}
                  />
                )}
                <CodeSnippetFeedbackButton />
                <CopyToClipboardButton
                  textToCopy={getNodeText(childArr[selectedIndex]?.props?.children)}
                  onCopied={onCopied}
                />
                <AskAiCodeBlockButton
                  code={getNodeText(childArr[selectedIndex]?.props?.children)}
                  {...extractCodeBlockBaseProps(childArr[selectedIndex]?.props)}
                />
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
                    />
                  </TabsPrimitive.Content>
                );
              })}
            </div>
          </TabsPrimitive.Root>
        );
      }}
    </CodeSnippetFeedbackProvider>
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
