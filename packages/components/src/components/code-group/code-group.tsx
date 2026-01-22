import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from "@radix-ui/react-tabs";
import React, {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

import { BaseCodeBlock } from "@/components/code-block/base-code-block";
import type { CodeBlockProps } from "@/components/code-block/code-block";
import { CopyToClipboardButton } from "@/components/code-block/copy-button";
import { Icon as ComponentIcon } from "@/components/icon";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import type { CopyToClipboardResult } from "@/utils/copy-to-clipboard";
import { getNodeText } from "@/utils/get-node-text";
import type { CodeStyling } from "@/validation";

import { LanguageDropdown } from "./language-dropdown";

type CodeGroupPropsBase = {
  dropdown?: boolean;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  isSmallText?: boolean;
  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;
  noMargins?: boolean;
  // pass in from CodeSnippetFeedbackProvider
  feedbackModalOpen?: boolean;
  anchorRef?: RefObject<HTMLDivElement>;
  codeBlockTheme?: "dark" | "system";
  codeBlockThemeObject?: CodeStyling;
  // pass in from useTabState
  initialSelectedTab?: number;
  onSelectedTabChange?: (index: number) => void;
  askAiButton?: ReactNode;
  feedbackButton?: ReactNode;
};

type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<"div">, keyof CodeGroupPropsBase>;

type CodeBlockChild = Exclude<
  React.ReactElement<CodeBlockProps>,
  boolean | null | undefined
>;

const CodeGroup = function CodeGroup({
  children,
  onCopied,
  isSmallText,
  className,
  noMargins,
  dropdown,
  feedbackModalOpen,
  anchorRef,
  codeBlockTheme = "system",
  codeBlockThemeObject,
  initialSelectedTab = 0,
  onSelectedTabChange,
  askAiButton,
  feedbackButton,
  ...props
}: CodeGroupProps) {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const childArr = React.Children.toArray(children) as CodeBlockChild[];

  const handleValueChange = useCallback(
    (value: string) => {
      const index = Number(value);
      const wasFocusOnTab =
        document.activeElement?.getAttribute("role") === "tab";

      // Important to clear hash to avoid collisions with tab groups
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }

      setSelectedTab(index);
      onSelectedTabChange?.(index);

      if (wasFocusOnTab) {
        requestAnimationFrame(() => {
          const trigger = triggerRefs.current.get(index);
          if (trigger) {
            trigger.focus();
          }
        });
      }
    },
    [onSelectedTabChange]
  );

  if (!children) {
    return null;
  }

  if (childArr.length === 0) {
    console.warn(
      "CodeGroup has no children, expected at least one CodeBlock child."
    );
    return null;
  }

  const selectedIndex = Number(selectedTab);

  return (
    // @ts-expect-error defaultValue should never an issue or passed in to the CodeBlock component
    <TabsRoot
      className={cn(
        Classes.CodeGroup,
        "not-prose relative mt-5 mb-8 flex flex-col overflow-hidden rounded-2xl border border-gray-950/10 p-0.5 dark:border-white/10",
        noMargins && "my-0",
        codeBlockTheme === "system" &&
          "dark:codeblock-dark codeblock-light bg-gray-50 text-gray-950 dark:bg-white/5 dark:text-gray-50",
        codeBlockTheme === "dark" &&
          "codeblock-dark border-transparent bg-codeblock text-gray-50 dark:bg-white/5",
        feedbackModalOpen && "border border-primary dark:border-primary-light",
        className
      )}
      onValueChange={handleValueChange}
      ref={anchorRef as React.Ref<HTMLDivElement>}
      value={String(selectedTab)}
      {...props}
      asChild={false}
    >
      <div
        className={cn(
          "relative flex items-center justify-between gap-2",
          dropdown ? "px-2.5" : "pr-2.5 *:first:*:ml-2.5"
        )}
        data-component-part="code-group-tab-bar"
      >
        {dropdown ? (
          <div className="flex min-w-0 items-center gap-1.5 font-medium text-xs">
            {childArr[selectedIndex]?.props.icon &&
              typeof childArr[selectedIndex]?.props.icon === "string" && (
                <ComponentIcon
                  className={cn(
                    "h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400",
                    Classes.CodeBlockIcon
                  )}
                  icon={childArr[selectedIndex]?.props.icon}
                  iconType="regular"
                  overrideColor
                />
              )}
            <span
              className={cn(
                "truncate",
                codeBlockTheme === "system" &&
                  "text-gray-950 dark:text-gray-50",
                codeBlockTheme === "dark" && "text-gray-50"
              )}
            >
              {childArr[selectedIndex]?.props.filename}
            </span>
          </div>
        ) : (
          <TabsList
            className={cn(
              "flex w-0 flex-1 gap-1 overflow-x-auto overflow-y-hidden rounded-tl-xl text-xs leading-6",
              codeBlockTheme === "system"
                ? "scrollbar-code-system"
                : "scrollbar-code-dark"
            )}
          >
            {childArr.map((child, index) => (
              <TabItem
                codeBlockTheme={codeBlockTheme}
                isSelected={selectedIndex === index}
                key={`${child.props.filename}TabItem${index}`}
                ref={(el) => {
                  if (el) {
                    triggerRefs.current.set(index, el);
                  }
                }}
                tabsLength={childArr.length}
                value={String(index)}
              >
                {child.props.icon && typeof child.props.icon === "string" && (
                  <ComponentIcon
                    className={cn(
                      "h-3.5 w-3.5 bg-gray-500 dark:bg-gray-400",
                      codeBlockTheme === "system"
                        ? "group-hover:bg-primary dark:group-hover:bg-primary-light"
                        : "group-hover:bg-gray-700/70 group-hover:text-primary-light",
                      Classes.CodeBlockIcon
                    )}
                    color={selectedIndex === index ? "currentColor" : undefined}
                    icon={child.props.icon}
                    iconType="regular"
                    overrideColor
                  />
                )}
                {child.props.filename}
              </TabItem>
            ))}
          </TabsList>
        )}
        <div className="flex shrink-0 items-center justify-end gap-1.5">
          {dropdown && (
            <LanguageDropdown
              languages={childArr.map((child) => child.props.language || "")}
              selectedLanguage={childArr[selectedIndex]?.props.language || ""}
              setSelectedLanguage={(language: string) => {
                const index = childArr.findIndex(
                  (child) => child.props.language === language
                );
                if (index !== -1) {
                  handleValueChange(String(index));
                }
              }}
            />
          )}
          {feedbackButton && feedbackButton}
          <CopyToClipboardButton
            onCopied={onCopied}
            textToCopy={getNodeText(childArr[selectedIndex]?.props?.children)}
          />
          {askAiButton && askAiButton}
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {childArr.map((child, index) => {
          return (
            <TabsContent
              className="relative h-full max-h-full w-full min-w-full max-w-full"
              key={`${child.props.filename}Content${index}`}
              tabIndex={-1}
              value={String(index)}
            >
              <BaseCodeBlock
                {...child.props}
                codeBlockTheme={codeBlockTheme}
                codeBlockThemeObject={codeBlockThemeObject ?? codeBlockTheme}
                expandable={child.props.expandable && index === selectedIndex}
                // avoid heavy re-rendering of the code block
                isParentCodeGroup={true}
                isSmallText={isSmallText}
                shouldHighlight={index === selectedIndex}
              />
            </TabsContent>
          );
        })}
      </div>
    </TabsRoot>
  );
};

const TabItem = forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  {
    children: ReactNode;
    value: string;
    isSelected: boolean;
    tabsLength: number;
    codeBlockTheme: "dark" | "system" | undefined;
  }
>(function TabItem(
  { children, value, isSelected, tabsLength, codeBlockTheme },
  ref
) {
  return (
    <TabsTrigger
      className={cn(
        "group relative my-1 mb-1.5 ml-0! flex items-center gap-1.5 whitespace-nowrap font-medium outline-0 first:ml-2.5! focus-visible:outline-2",
        isSelected &&
          codeBlockTheme === "system" &&
          "text-primary dark:text-primary-light",
        isSelected && codeBlockTheme === "dark" && "text-primary-light",
        !isSelected &&
          codeBlockTheme === "system" &&
          "text-gray-500 dark:text-gray-400",
        !isSelected && codeBlockTheme === "dark" && "text-gray-400"
      )}
      ref={ref}
      value={value}
    >
      <div
        className={cn(
          "z-10 flex items-center gap-1.5 rounded-lg px-1.5 focus:outline-none",
          tabsLength > 1 &&
            codeBlockTheme === "system" &&
            "group-hover:bg-gray-200/50 group-hover:text-primary dark:group-hover:bg-gray-700/70 dark:group-hover:text-primary-light",
          tabsLength > 1 &&
            codeBlockTheme === "dark" &&
            "group-hover:bg-gray-700/70 group-hover:text-primary-light"
        )}
      >
        {children}
      </div>

      {isSelected && (
        <div className="absolute right-0 -bottom-1.5 left-0 h-0.5 rounded-full bg-primary dark:bg-primary-light" />
      )}
    </TabsTrigger>
  );
});

export { CodeGroup, type CodeGroupProps, type CodeGroupPropsBase };
