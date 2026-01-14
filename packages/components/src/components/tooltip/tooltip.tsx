'use client';

import { ReactNode, isValidElement, useState, useRef, useEffect } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

export type TooltipProps = {
  tip: string;
  children: ReactNode;
  headline?: string;
  className?: string;
};

export function Tooltip({ tip, children, headline, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Check if tooltip would overflow the top of viewport
      if (triggerRect.top - tooltipRect.height - 8 < 0) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  }, [isVisible]);

  if (!children) {
    return null;
  }

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {underlineWhenTextOnly(children)}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          data-component-part="tooltip-content"
          className={cn(
            'absolute z-50 max-w-[16rem] px-3 py-2 rounded-lg bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-800 space-y-1 shadow-lg',
            'left-1/2 -translate-x-1/2',
            position === 'top' && 'bottom-full mb-2',
            position === 'bottom' && 'top-full mt-2'
          )}
        >
          {!!headline && (
            <p
              className="text-xs font-medium leading-4 text-gray-900 dark:text-gray-200"
              data-component-part="tooltip-headline"
            >
              {headline}
            </p>
          )}
          <p
            className="text-xs text-gray-600 dark:text-gray-400 leading-4 whitespace-nowrap"
            data-component-part="tooltip-tip"
          >
            {tip}
          </p>
        </div>
      )}
    </div>
  );
}

function underlineWhenTextOnly(children: ReactNode) {
  if (isValidElement(children)) {
    return children;
  }

  return (
    <span
      className={cn(
        Classes.Tooltip,
        'underline decoration-dotted decoration-2 underline-offset-4 decoration-gray-400 dark:decoration-gray-500'
      )}
    >
      {children}
    </span>
  );
}
