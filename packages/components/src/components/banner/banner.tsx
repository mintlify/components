import { XIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

export type BannerVariant = 'primary' | 'info' | 'warning' | 'danger' | 'success';

export type BannerProps = {
  /** The content to display in the banner */
  children: ReactNode;
  /** Visual variant of the banner */
  variant?: BannerVariant;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Additional class names for custom styling */
  className?: string;
  /** Accessible label for the dismiss button */
  dismissAriaLabel?: string;
};

const variantStyles: Record<BannerVariant, string> = {
  primary:
    'bg-primary-dark text-white/90 dark:text-white/90 [&_a]:text-white [&_a:hover]:text-white/80',
  info: 'bg-sky-600 text-white/90 dark:bg-sky-700 [&_a]:text-white [&_a:hover]:text-white/80',
  warning:
    'bg-amber-500 text-amber-950 dark:bg-amber-600 dark:text-amber-50 [&_a]:text-amber-950 dark:[&_a]:text-amber-50 [&_a:hover]:opacity-80',
  danger:
    'bg-red-600 text-white/90 dark:bg-red-700 [&_a]:text-white [&_a:hover]:text-white/80',
  success:
    'bg-emerald-600 text-white/90 dark:bg-emerald-700 [&_a]:text-white [&_a:hover]:text-white/80',
};

export function Banner({
  children,
  variant = 'primary',
  dismissible = false,
  onDismiss,
  className,
  dismissAriaLabel = 'Dismiss banner',
}: BannerProps) {
  const showDismissButton = dismissible && onDismiss;

  return (
    <div
      className={cn(
        Classes.Banner,
        'relative w-full px-4 py-2 text-center text-sm font-medium',
        'flex items-center justify-center',
        '[&_a]:underline [&_a]:underline-offset-2',
        variantStyles[variant],
        className
      )}
      role="banner"
      data-variant={variant}
    >
      <div
        className={cn(
          'flex-1 min-w-0',
          showDismissButton && 'pr-8'
        )}
        data-component-part="banner-content"
      >
        {children}
      </div>
      {showDismissButton && (
        <button
          type="button"
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'flex items-center justify-center',
            'size-8 rounded-sm',
            'opacity-70 hover:opacity-100',
            'transition-opacity',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
          )}
          onClick={onDismiss}
          aria-label={dismissAriaLabel}
          data-component-part="banner-dismiss"
        >
          <XIcon className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
