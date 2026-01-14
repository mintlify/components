import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Classes } from '@/lib/local/selectors';

export type ResponseExampleProps = {
  /**
   * Code blocks to display as response examples.
   * Typically CodeBlock components or similar.
   */
  children?: ReactNode;
  /**
   * When true, displays multiple examples in a dropdown instead of tabs.
   */
  dropdown?: boolean;
  /**
   * Additional CSS classes for the root element.
   */
  className?: string;
  /**
   * Accessible label for the response example region.
   * Useful when multiple ResponseExample components are on the same page.
   */
  ariaLabel?: string;
};

/**
 * ResponseExample is a container for displaying API response examples.
 * It wraps code blocks and provides consistent styling and layout.
 *
 * When CodeGroup is fully available, this component integrates with it
 * to provide tabbed or dropdown navigation between multiple response examples.
 */
export function ResponseExample({
  children,
  dropdown,
  className,
  ariaLabel = 'Response example',
}: ResponseExampleProps) {
  return (
    <div
      className={cn(
        Classes.ResponseExample,
        'mt-8',
        className
      )}
      role="region"
      aria-label={ariaLabel}
      data-response-example
      data-dropdown={dropdown ? 'true' : undefined}
    >
      <div
        className="response-example-content"
        data-component-part="response-example-content"
      >
        {children}
      </div>
    </div>
  );
}
