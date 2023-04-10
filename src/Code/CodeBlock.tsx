import { clsx } from 'clsx';
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef, ReactNode, useEffect, useState } from 'react';

import { copyToClipboard, CopyToClipboardResult } from '../utils/copyToClipboard';
import { getNodeText } from '../utils/getNodeText';

export interface CodeBlockPropsBase {
  filename?: string;
  /**
   *  Color of the filename text and the border underneath it when content is being shown.
   */
  filenameColor?: string;
  /**
   * Background color for the tooltip saying `Click to Copy` when hovering the clipboard button.
   */
  tooltipColor?: string;
  /**
   * The callback function when a user clicks on the copied to clipboard button
   */
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
}

export type CodeBlockProps = CodeBlockPropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof CodeBlockPropsBase>;

export const CodeBlock = forwardRef(function CodeBlock(
  {
    filename,
    filenameColor,
    tooltipColor,
    onCopied,
    children,
    className,
    ...props
  }: CodeBlockProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const Button = (props: Partial<ComponentPropsWithoutRef<typeof CopyToClipboardButton>>) => (
    <CopyToClipboardButton
      textToCopy={getNodeText(children)}
      tooltipColor={tooltipColor ?? filenameColor}
      onCopied={onCopied}
      {...props}
    />
  );

  return (
    <div
      className={clsx('mb-8 not-prose gray-frame', className)}
      ref={ref}
      {...props}
    >
      {filename ? (
        <CodeTabBar filename={filename} filenameColor={filenameColor}>
          <Button />
        </CodeTabBar>
      ) : (
        <Button className="absolute top-4 right-3" />
      )}
      <div
        className="code-in-gray-frame children:!my-0 children:!shadow-none children:!bg-transparent"
        style={{ fontVariantLigatures: 'none' }}
      >
        {children}
      </div>
    </div>
  );
});

/**
 * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
 * Styling should look the same though.
 */
function CodeTabBar({
  filename,
  filenameColor,
  children,
}: {
  filename: string;
  filenameColor?: string;
  children?: ReactNode
}) {
  return (
    <div className="flex rounded-t-xl bg-black text-slate-400 text-xs leading-6">
      <div
        className="flex-none border-b px-4 pt-2.5 pb-2 flex items-center"
        style={{ color: filenameColor, borderBottomColor: filenameColor }}
      >
        {filename}
      </div>
      <div className='flex-1 mt-0.5 mr-3 flex items-center justify-end'>
        {children}
      </div>
    </div>
  );
}

export function CopyToClipboardButton({
  textToCopy,
  tooltipColor = '#002937',
  onCopied,
  className,
}: {
  textToCopy: string;
  tooltipColor?: string;
  onCopied?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  className?: string;
} & ComponentPropsWithoutRef<'button'>) {
  const [isCopiedActive, setIsCopiedActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Hide copy button if the browser does not support it
    if (typeof window !== 'undefined' && !navigator?.clipboard) {
      console.warn(
        "The browser's Clipboard API is unavailable. The Clipboard API is only available on HTTPS."
      );
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  // Hide copy button if you would copy an empty string
  if (!textToCopy || isDisabled) {
    return null;
  }
  
  const onCopy = async () => {
    const result = await copyToClipboard(textToCopy);
    if (onCopied) {
      onCopied(result, textToCopy);
    }
    if (result === 'success') {
      setIsCopiedActive(true);
      setTimeout(() => {
        setIsCopiedActive(false);
      }, 2000);
    }
  }

  return (
    <div className={clsx(className || "relative group")} >
      <button className={clsx("h-7 w-7 flex items-center justify-center rounded-md hover:bg-white/20", isCopiedActive ? 'bg-white/20' : '')} onClick={onCopy}>
        {
          isCopiedActive ? <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{fill: tooltipColor}}>
          <path d="M14.7813 1.21873C15.0751 1.51248 15.0751 1.98748 14.7813 2.2781L6.53135 10.5312C6.2376 10.825 5.7626 10.825 5.47197 10.5312L1.21885 6.28123C0.925098 5.98748 0.925098 5.51248 1.21885 5.22185C1.5126 4.93123 1.9876 4.9281 2.27822 5.22185L5.99697 8.9406L13.7188 1.21873C14.0126 0.924976 14.4876 0.924976 14.7782 1.21873H14.7813Z" />
          </svg> : <svg className="fill-white/30 group-hover:fill-white/50" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 14.5H9C9.275 14.5 9.5 14.275 9.5 14V12H11V14C11 15.1031 10.1031 16 9 16H2C0.896875 16 0 15.1031 0 14V7C0 5.89687 0.896875 5 2 5H4V6.5H2C1.725 6.5 1.5 6.725 1.5 7V14C1.5 14.275 1.725 14.5 2 14.5ZM7 11C5.89687 11 5 10.1031 5 9V2C5 0.896875 5.89687 0 7 0H14C15.1031 0 16 0.896875 16 2V9C16 10.1031 15.1031 11 14 11H7Z"/>
        </svg>
        }
      </button>
      <div className='absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5' style={{backgroundColor: tooltipColor}}>
        {isCopiedActive ?  'Copied!' : 'Copy'}
      </div>
    </div>
  )
}