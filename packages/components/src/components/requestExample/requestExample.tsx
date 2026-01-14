'use client';

import { ReactElement, ReactNode, useState, useId, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
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
  /**
   * Default selected snippet index
   * @default 0
   */
  defaultSnippetIndex?: number;
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
  defaultSnippetIndex = 0,
}: RequestExampleProps): ReactElement | null {
  const uniqueId = useId();
  const [activeIndex, setActiveIndex] = useState(() => {
    // Ensure default index is within bounds
    if (!snippets || snippets.length === 0) return 0;
    return Math.max(0, Math.min(defaultSnippetIndex, snippets.length - 1));
  });

  // Clamp activeIndex when snippets array changes
  useEffect(() => {
    if (snippets && snippets.length > 0 && activeIndex >= snippets.length) {
      setActiveIndex(snippets.length - 1);
    }
  }, [snippets, activeIndex]);

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

  // Safe access - clamp to valid range in case of race condition between render and effect
  const safeIndex = Math.min(activeIndex, snippets.length - 1);
  const activeSnippet = snippets[safeIndex];
  const getSnippetLabel = (snippet: CodeSnippet) => snippet.filename || snippet.language;

  // Refs for tab buttons to enable focus management
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Focus the active tab when it changes via keyboard
  const focusTab = useCallback((index: number) => {
    tabRefs.current[index]?.focus();
  }, []);

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      newIndex = (index + 1) % snippets.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      newIndex = (index - 1 + snippets.length) % snippets.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      newIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      newIndex = snippets.length - 1;
    }

    if (newIndex !== null) {
      setActiveIndex(newIndex);
      focusTab(newIndex);
    }
  };

  return (
    <div
      className={cn('request-example', className)}
      data-component-part="request-example"
      data-dropdown={dropdown}
    >
      {/* Selection controls - only show if multiple snippets */}
      {snippets.length > 1 && (
        dropdown ? (
          // Dropdown mode
          <div data-component-part="request-example-selector">
            <label
              htmlFor={`${uniqueId}-dropdown`}
              className="sr-only"
            >
              Select code example language
            </label>
            <select
              id={`${uniqueId}-dropdown`}
              value={safeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              data-component-part="request-example-dropdown"
            >
              {snippets.map((snippet, index) => (
                <option key={`${getSnippetLabel(snippet)}-${index}`} value={index}>
                  {getSnippetLabel(snippet)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          // Tabs mode (default)
          <div
            role="tablist"
            aria-label="Code example languages"
            data-component-part="request-example-tabs"
          >
            {snippets.map((snippet, index) => (
              <button
                key={`${getSnippetLabel(snippet)}-${index}`}
                ref={(el) => { tabRefs.current[index] = el; }}
                type="button"
                role="tab"
                id={`${uniqueId}-tab-${index}`}
                aria-selected={index === safeIndex}
                aria-controls={`${uniqueId}-panel-${index}`}
                tabIndex={index === safeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                data-component-part="request-example-tab"
                data-active={index === safeIndex}
              >
                {getSnippetLabel(snippet)}
              </button>
            ))}
          </div>
        )
      )}

      {/* Active snippet content */}
      <div
        role={snippets.length > 1 && !dropdown ? "tabpanel" : undefined}
        id={snippets.length > 1 && !dropdown ? `${uniqueId}-panel-${safeIndex}` : undefined}
        aria-labelledby={snippets.length > 1 && !dropdown ? `${uniqueId}-tab-${safeIndex}` : undefined}
        data-component-part="request-example-snippet"
        data-language={activeSnippet.language}
      >
        {activeSnippet.filename && (
          <div data-component-part="request-example-filename">
            {activeSnippet.filename}
          </div>
        )}
        <pre data-component-part="request-example-code">
          <code className={`language-${activeSnippet.language}`}>
            {activeSnippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
