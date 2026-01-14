'use client';

import { ComponentPropsWithoutRef, forwardRef, useCallback, ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

/**
 * Simple link icon for anchor links
 */
const LinkIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" height="12px" viewBox="0 0 576 512">
      <path d="M0 256C0 167.6 71.6 96 160 96h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C98.1 144 48 194.1 48 256s50.1 112 112 112h72c13.3 0 24 10.7 24 24s-10.7 24-24 24H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c61.9 0 112-50.1 112-112s-50.1-112-112-112H344c-13.3 0-24-10.7-24-24s10.7-24 24-24h72c88.4 0 160 71.6 160 160zM184 232H392c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
    </svg>
  );
};

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text: string): Promise<'success' | 'error'> {
  if (!text) {
    console.warn('Called copyToClipboard() with empty text');
  }
  try {
    await navigator.clipboard.writeText(text);
    return 'success';
  } catch (err) {
    console.error('Failed to copy: ', err);
    return 'error';
  }
}

/**
 * Scroll element into view by ID
 */
function scrollElementIntoView(id: string) {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(id);
  if (element) {
    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

export interface UpdatePropsBase {
  /**
   * ID of the update, used for anchor linking and navigation
   */
  id: string;
  /**
   * The label displayed in the sticky section (e.g., date or version)
   */
  label: string;
  /**
   * Description of the update, displayed below the label
   */
  description?: string;
  /**
   * Tags associated with the update for categorization
   */
  tags?: string[];
  /**
   * Content of the update entry
   */
  children?: ReactNode;
  /**
   * Accessible label for the anchor link
   */
  anchorAriaLabel?: string;
}

export type UpdateProps = UpdatePropsBase &
  Omit<ComponentPropsWithoutRef<'div'>, keyof UpdatePropsBase>;

/**
 * Update component for changelog entries with sticky label section.
 * Displays a label (typically a date), optional description, tags, and content.
 * Supports anchor linking for deep navigation.
 */
export const Update = forwardRef<HTMLDivElement, UpdateProps>(
  (
    {
      children,
      label,
      id,
      description,
      tags,
      className,
      anchorAriaLabel = 'Navigate to this update',
      ...props
    },
    ref
  ) => {
    const tagsArray = tags?.map((tag) => tag.trim()).filter(Boolean);

    const copyAnchorLink = useCallback(() => {
      void copyToClipboard(
        `https://${window.location.host}${window.location.pathname}#${id}`
      );
      window.location.hash = id;
      scrollElementIntoView(id);
    }, [id]);

    return (
      <div
        className={cn(
          Classes.Update,
          'flex flex-col relative items-start w-full lg:flex-row gap-2 lg:gap-6 py-8 update-container',
          className
        )}
        ref={ref}
        id={id}
        {...props}
      >
        <div
          className="lg:sticky top-[var(--scroll-mt)] group flex flex-col w-full lg:w-[160px] items-start flex-shrink-0 justify-start"
          data-component-part="label-container"
        >
          <div className="absolute">
            <a
              href={`#${id}`}
              className="-ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100 focus:opacity-100 focus:outline-0 group/link"
              aria-label={anchorAriaLabel}
            >
              &#8203;
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light"
                data-component-part="anchor-icon"
              >
                <LinkIcon />
              </div>
            </a>
          </div>
          <div
            className="cursor-pointer px-2 py-1 rounded-lg text-sm flex items-center flex-grow-0 justify-center font-medium bg-primary/10 text-primary dark:text-primary-light"
            onClick={copyAnchorLink}
            contentEditable={false}
            data-component-part="label"
          >
            {label}
          </div>
          {!!tagsArray?.length && (
            <div
              className="px-1 flex flex-wrap gap-2 text-secondary dark:text-secondary-light mt-3 text-sm"
              data-component-part="tag-list"
            >
              {tagsArray.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-lg text-sm font-medium"
                  data-component-part="tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {description && (
            <div
              className="px-1 text-secondary dark:text-secondary-light mt-3 text-sm max-w-[160px] break-words"
              contentEditable={false}
              data-component-part="description"
            >
              {description}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden px-0.5 max-w-full">
          <div className="prose-sm" data-component-part="content">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Update.displayName = 'Update';
