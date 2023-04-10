import { Tab } from '@headlessui/react';
import { clsx } from 'clsx';
import React, {
  ComponentPropsWithoutRef,
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';

import { CopyToClipboardResult } from '../utils/copyToClipboard';
import { getNodeText } from '../utils/getNodeText';
import { CodeBlockProps, CopyToClipboardButton } from './CodeBlock';

export type CodeGroupPropsBase = {
  /**
   * Color of the filename text and the border underneath it when the content is being shown
   */
  selectedColor?: string;
  /**
   * Background color for the tooltip saying `Click to Copy` when hovering the clipboard button.
   */
  tooltipColor?: string;
  /**
   * The callback function when a user clicks on the copied to clipboard button
   */
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;

  isSmallText?: boolean;

  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;

  onChange?: FormEventHandler<HTMLDivElement> & ((index: number) => void);
};

export type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeGroupPropsBase>;

/**
 * Group multiple code blocks into a tabbed UI.
 * Uses CodeBlocks as children but does not render them directly. Instead,
 * CodeGroup extracts the props and renders CodeBlock's children.
 *
 * @param {CodeBlock[]} - children
 */
export const CodeGroup = forwardRef(function CodeGroup(
  {
    children,
    selectedColor,
    tooltipColor,
    onCopied,
    isSmallText,
    className,
    ...props
  }: CodeGroupProps,
  ref: ForwardedRef<HTMLDivElement> | undefined
) {
  if (children == null) {
    // Hide the frame when no children were passed
    console.warn('CodeGroup has no children, expected at least one CodeBlock child.');
    return null;
  } else if (!Array.isArray(children)) {
    // Allow looping over a single child
    children = [children];
  } else if (children.length === 0) {
    return null;
  }
  const childArr = React.Children.toArray(children) as Array<
    Exclude<React.ReactElement<CodeBlockProps>, boolean | null | undefined>
  >;
  return (
    <Tab.Group ref={ref} as="div" className={clsx('not-prose gray-frame', className)} {...props}>
      <Tab.List className="flex text-xs bg-black leading-6 rounded-t-xl">
        {({ selectedIndex }) => (
          <>
            {childArr.map((child, tabIndex: number) => (
              <>
                <TabItem
                  key={child?.props?.filename + 'TabItem' + tabIndex}
                  myIndex={tabIndex}
                  selectedIndex={selectedIndex}
                  selectedColor={selectedColor}
                >
                  {child?.props?.filename || 'Filename'}
                </TabItem>
              </>
            ))}
            <div
              className={clsx(
                'flex-auto flex justify-end items-center pr-4 rounded-tr'
              )}
            >
              <CopyToClipboardButton
                textToCopy={getNodeText(childArr[selectedIndex]?.props?.children)}
                tooltipColor={tooltipColor ?? selectedColor}
                onCopied={onCopied}
              />
            </div>
          </>
        )}
      </Tab.List>
      <Tab.Panels className="flex overflow-auto">
        {childArr.map((child) => (
          <Tab.Panel
            key={child?.props?.filename}
            className={clsx('flex-none code-in-gray-frame', isSmallText && 'text-xs leading-5')}
            style={{ fontVariantLigatures: 'none' }}
          >
            {child?.props?.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
});

interface TabItemProps {
  children: ReactNode;
  selectedIndex: number;
  myIndex: number;
  selectedColor?: string;
}

function TabItem({ children, selectedIndex, myIndex, selectedColor = '#CBD5E1' }: TabItemProps) {
  const isSelected = selectedIndex === myIndex;

  return (
    <Tab
      className="flex items-center relative overflow-hidden px-4 pt-2.5 pb-2 text-zinc-400 outline-none"
      style={isSelected ? { color: selectedColor } : {}}
    >
      <span className="z-10">{children}</span>

      {/* Active tab highlight bar */}
      {isSelected && (
        <div
          className="pointer-events-none absolute inset-0 border-b"
          style={{ borderColor: selectedColor }}
        />
      )}
    </Tab>
  );
}