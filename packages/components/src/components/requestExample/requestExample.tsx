'use client';

import { ReactElement, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface CodeSnippet {
  /**
   * The programming language for syntax highlighting
   */
  language: string;
  /**
   * The filename or label displayed in the tab
   */
  filename?: string;
  /**
   * The code content
   */
  code: string;
}

export interface RequestExampleProps {
  /**
   * Array of code snippets to display
   */
  snippets?: CodeSnippet[];
  /**
   * Whether to show language dropdown instead of tabs
   * @default false
   */
  dropdown?: boolean;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Children elements (alternative to snippets prop for composition)
   */
  children?: ReactNode;
}

/**
 * RequestExample displays code snippets for API request examples.
 * Use this component to show code examples in API documentation.
 *
 * @example
 * ```tsx
 * <RequestExample
 *   snippets={[
 *     { language: 'curl', filename: 'cURL', code: 'curl -X GET https://api.example.com' },
 *     { language: 'python', filename: 'Python', code: 'requests.get("https://api.example.com")' },
 *   ]}
 * />
 * ```
 */
export function RequestExample({
  snippets,
  dropdown = false,
  className,
  children,
}: RequestExampleProps): ReactElement | null {
  // If children are provided, render them directly (for composition patterns)
  if (children) {
    return (
      <div
        className={cn('request-example', className)}
        data-component-part="request-example"
      >
        {children}
      </div>
    );
  }

  // If no snippets provided, return null
  if (!snippets || snippets.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('request-example', className)}
      data-component-part="request-example"
      data-dropdown={dropdown}
    >
      {snippets.map((snippet, index) => (
        <div
          key={`${snippet.filename || snippet.language}-${index}`}
          data-component-part="request-example-snippet"
          data-language={snippet.language}
        >
          {snippet.filename && (
            <div data-component-part="request-example-filename">
              {snippet.filename}
            </div>
          )}
          <pre data-component-part="request-example-code">
            <code className={`language-${snippet.language}`}>
              {snippet.code}
            </code>
          </pre>
        </div>
      ))}
    </div>
  );
}
