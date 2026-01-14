import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Classes } from '@/lib/local/selectors';

export interface ViewPropsBase {
  /**
   * The title identifier for this view.
   * Used to identify the view when controlled by a parent component.
   */
  title: string;
  /**
   * Controls whether this view is visible.
   * When undefined, the view is always visible.
   * @default true
   */
  visible?: boolean;
}

export type ViewProps = ViewPropsBase & Omit<ComponentPropsWithoutRef<'div'>, keyof ViewPropsBase>;

/**
 * View component for displaying conditional content sections.
 * Can be used standalone or controlled by a parent component for multi-view layouts.
 */
export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, title, visible = true, className, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        className={cn(Classes.MultiViewItem, className)}
        data-title={title}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

View.displayName = 'View';
