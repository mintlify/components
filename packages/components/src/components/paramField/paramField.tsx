'use client';

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';

const MAX_DEFAULT_VALUE_LENGTH = 50;

/**
 * LinkIcon component for anchor links
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
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

/**
 * Scroll element into view with hash handling
 */
const scrollElementIntoView = ({
  id,
  shouldReturnEarly,
  postScrollCallback,
}: {
  id: string | undefined;
  shouldReturnEarly: boolean;
  postScrollCallback?: () => void;
}) => {
  if (shouldReturnEarly || !id) return;

  if (typeof window === 'undefined') return;

  const hash = window.location.hash.slice(1);
  if (hash !== id) return;

  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  postScrollCallback?.();
};

/**
 * Build a unique ID for the param field for deep linking
 */
const buildParamFieldId = (
  fieldType: 'param' | 'response' | undefined,
  name: string | undefined | null,
  parentName?: string
): string | undefined => {
  if (!name) return undefined;

  const prefix = fieldType === 'response' ? 'response' : 'param';
  const parts = [prefix, parentName, name].filter(Boolean);

  return parts.join('-');
};

// ----- Locale strings (defaults, can be overridden via context later) -----
const defaultLocale = {
  required: 'required',
  deprecated: 'deprecated',
  default: 'default: ',
  navigateToHeader: 'Navigate to this section',
};

export type InfoPillProps = {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
};

/**
 * InfoPill - displays metadata about a field (type, location, default value)
 */
export function InfoPill({ children, prefix, className }: InfoPillProps) {
  return (
    <div
      className={cn(
        'flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200 font-medium break-all',
        className
      )}
      data-component-part="info-pill"
    >
      {prefix && (
        <span className="text-gray-400 dark:text-gray-500" data-component-part="info-pill-prefix">
          {prefix}
        </span>
      )}
      <span data-component-part="info-pill-value">{children}</span>
    </div>
  );
}

export type RequiredPillProps = {
  label?: string;
  className?: string;
};

/**
 * RequiredPill - indicates a field is required
 */
export function RequiredPill({ label = defaultLocale.required, className }: RequiredPillProps) {
  return (
    <div
      className={cn(
        'px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium whitespace-nowrap',
        className
      )}
      data-component-part="required-pill"
    >
      {label}
    </div>
  );
}

export type DeprecatedPillProps = {
  label?: string;
  className?: string;
};

/**
 * DeprecatedPill - indicates a field is deprecated
 */
export function DeprecatedPill({ label = defaultLocale.deprecated, className }: DeprecatedPillProps) {
  return (
    <div
      className={cn(
        'px-2 py-0.5 rounded-md bg-amber-100/50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300 font-medium whitespace-nowrap',
        className
      )}
      data-component-part="deprecated-pill"
    >
      {label}
    </div>
  );
}

export type PropertyHeadProps = {
  name?: string | null;
  type?: string;
  location?: string;
  required?: boolean;
  deprecated?: boolean;
  defaultValue?: unknown;
  parentName?: string;
  id?: string;
  pre?: string[];
  post?: string[];
  fieldType?: 'param' | 'response';
  className?: string;
  labels?: {
    required?: string;
    deprecated?: string;
    default?: string;
    navigateToHeader?: string;
  };
};

/**
 * PropertyHead - displays the header portion of a property (name, type, pills)
 */
export function PropertyHead({
  name,
  type,
  location,
  required,
  deprecated,
  defaultValue,
  parentName,
  id,
  pre,
  post,
  fieldType,
  className,
  labels = {},
}: PropertyHeadProps) {
  const pillsRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const hasScrolledRef = useRef(false);
  const paramId = id ?? buildParamFieldId(fieldType, name, parentName);

  const mergedLabels = { ...defaultLocale, ...labels };

  const copyAnchorLink = useCallback(() => {
    if (paramId && typeof window !== 'undefined') {
      void copyToClipboard(window.location.href.split('#')[0] + '#' + paramId);
      window.location.hash = paramId;
    }
  }, [paramId]);

  useEffect(() => {
    const ref = pillsRef.current;
    if (!ref) return;

    function checkHeight() {
      const height = ref?.offsetHeight ?? 0;
      setIsMultiLine(height > 28);
    }

    checkHeight();
    const resizeObserver = new ResizeObserver(checkHeight);
    resizeObserver.observe(ref);

    return () => {
      resizeObserver.unobserve(ref);
    };
  }, []);

  useEffect(() => {
    scrollElementIntoView({
      id: paramId,
      shouldReturnEarly: hasScrolledRef.current || !paramId || !!parentName,
      postScrollCallback() {
        hasScrolledRef.current = true;
      },
    });
  }, [paramId, parentName]);

  const paramInfo = !parentName ? (
    name
  ) : (
    <>
      <span className="text-gray-500 dark:text-gray-400">{parentName}</span>
      {name}
    </>
  );

  if (name == null) return null;

  return (
    <div
      className={cn('flex font-mono text-sm group/param-head break-all relative', className)}
      id={paramId}
      key={paramId}
      data-component-part="head"
    >
      <div className="flex-1 flex flex-col content-start py-0.5 mr-5">
        <div className="flex items-center flex-wrap gap-2">
          {paramId && (
            <div className="absolute -top-1.5" data-component-part="anchor-wrapper">
              <a
                href={`#${paramId}`}
                className={cn(
                  parentName ? '-ml-[2.1rem]' : '-ml-10',
                  'flex items-center opacity-0 border-0 group-hover/param-head:opacity-100 focus:opacity-100 focus:outline-0 py-2 [.expandable-content_&]:-ml-[2.1rem] group/link'
                )}
                aria-label={mergedLabels.navigateToHeader}
                onClick={copyAnchorLink}
                data-component-part="anchor-link"
              >
                &#8203;
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light"
                  data-component-part="anchor-icon-wrapper"
                >
                  <LinkIcon />
                </div>
              </a>
            </div>
          )}
          {pre?.map((item, i) => (
            <div
              key={i}
              className="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
              data-component-part="meta-pre"
            >
              {item}
            </div>
          ))}
          {(parentName || name) && (
            <div
              className="font-semibold text-primary dark:text-primary-light cursor-pointer overflow-wrap-anywhere"
              data-component-part="name"
              onClick={copyAnchorLink}
            >
              {paramInfo}
            </div>
          )}
          <div
            ref={pillsRef}
            className={cn(
              'inline items-center gap-2 text-xs font-medium [&_div]:inline [&_div]:mr-2',
              isMultiLine ? '[&_div]:leading-6' : '[&_div]:leading-5'
            )}
            data-component-part="meta"
          >
            {type && <InfoPill>{type}</InfoPill>}
            {location && <InfoPill>{location}</InfoPill>}
            {defaultValue != null && (
              <InfoPill prefix={mergedLabels.default}>
                {typeof defaultValue === 'string'
                  ? defaultValue === ''
                    ? '""'
                    : defaultValue
                  : JSON.stringify(defaultValue)}
              </InfoPill>
            )}
            {required && <RequiredPill label={mergedLabels.required} />}
            {deprecated && <DeprecatedPill label={mergedLabels.deprecated} />}
            {post?.map((item, i) => (
              <div
                key={i}
                className="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
                data-component-part="meta-post"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- Base Property Component -----

export type PropertyBaseProps = {
  name: string;
  type?: string;
  location?: string;
  defaultValue?: unknown;
  required?: boolean;
  deprecated?: boolean;
  hidden?: boolean;
  id?: string;
  children: React.ReactNode;
  pre?: string[];
  post?: string[];
  fieldType?: 'param' | 'response';
  className?: string;
  labels?: PropertyHeadProps['labels'];
};

/**
 * PropertyBase - the core property display component
 */
function PropertyBase({
  name,
  type,
  location,
  defaultValue,
  required = false,
  deprecated = false,
  hidden = false,
  id,
  pre,
  post,
  fieldType,
  children,
  className,
  labels,
}: PropertyBaseProps) {
  const stringifiedDefaultValue = useMemo(() => {
    if (defaultValue == null) return null;

    if (typeof defaultValue === 'object') {
      // don't display values with nested objects; looks bad on one line
      const containsNestedObject = Object.values(defaultValue as Record<string, unknown>).some(
        (value) => typeof value === 'object'
      );
      if (containsNestedObject) {
        return null;
      }
    }

    const stringifiedValue = JSON.stringify(defaultValue);
    if (
      stringifiedValue &&
      stringifiedValue.length > 0 &&
      stringifiedValue.length < MAX_DEFAULT_VALUE_LENGTH
    ) {
      return stringifiedValue;
    }
    return null;
  }, [defaultValue]);

  if (hidden) {
    return null;
  }

  return (
    <div
      className={cn(
        Classes.Field,
        'pt-2.5 pb-5 my-2.5 border-gray-50 dark:border-gray-800/50 border-b',
        className
      )}
      data-component-part="root"
    >
      <PropertyHead
        name={name}
        type={type}
        location={location}
        required={required}
        deprecated={deprecated}
        defaultValue={stringifiedDefaultValue}
        id={id}
        pre={pre}
        post={post}
        fieldType={fieldType}
        labels={labels}
      />
      {children && (
        <div
          className="mt-4 prose-sm prose-gray dark:prose-invert [&_.prose>p:first-child]:mt-0 [&_.prose>p:last-child]:mb-0"
          data-component-part="content"
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ----- ParamField Component (MDX compatible) -----

export type ParamFieldProps = {
  query?: string;
  path?: string;
  body?: string;
  header?: string;
  children: React.ReactNode;
  default?: unknown;
  type?: string;
  location?: string;
  required?: boolean;
  deprecated?: boolean;
  hidden?: boolean;
  placeholder?: string;
  enum?: string[];
  id?: string;
  pre?: string[];
  post?: string[];
  className?: string;
  labels?: PropertyHeadProps['labels'];
};

/**
 * ParamField - a parameter field for API documentation
 * Used in MDX to document request parameters (query, path, body, header)
 */
export function ParamField({
  query,
  path,
  body,
  header,
  children,
  default: defaultValue,
  type,
  location,
  required = false,
  deprecated = false,
  hidden = false,
  id,
  pre,
  post,
  className,
  labels,
}: ParamFieldProps) {
  const name = query || path || body || header;

  if (name == null) {
    return null;
  }

  return (
    <PropertyBase
      name={name}
      defaultValue={defaultValue}
      type={type}
      location={location}
      required={required}
      deprecated={deprecated}
      hidden={hidden}
      id={id}
      pre={pre}
      post={post}
      fieldType="param"
      className={className}
      labels={labels}
    >
      {children}
    </PropertyBase>
  );
}

// ----- ResponseField Component -----

export type ResponseFieldProps = {
  name: string;
  type?: string;
  hidden?: boolean;
  default?: unknown;
  required?: boolean;
  deprecated?: boolean;
  children: React.ReactNode;
  id?: string;
  pre?: string[];
  post?: string[];
  className?: string;
  labels?: PropertyHeadProps['labels'];
};

/**
 * ResponseField - a response field for API documentation
 * Used in MDX to document response properties
 */
export function ResponseField({
  name,
  type,
  hidden,
  default: defaultValue,
  required,
  deprecated,
  children,
  id,
  pre,
  post,
  className,
  labels,
}: ResponseFieldProps) {
  return (
    <PropertyBase
      name={name}
      type={type}
      hidden={hidden}
      defaultValue={defaultValue}
      required={required}
      deprecated={deprecated}
      id={id}
      pre={pre}
      post={post}
      fieldType="response"
      className={className}
      labels={labels}
    >
      {children}
    </PropertyBase>
  );
}

// ----- Property namespace with sub-components -----

/**
 * Property - the main namespace for property components
 *
 * Usage:
 * - Property.Param - for request parameters
 * - Property.Response - for response fields
 * - Property.Head - for just the header portion
 * - Property.InfoPill - for custom info pills
 * - Property.RequiredPill - for required indicator
 * - Property.DeprecatedPill - for deprecated indicator
 */
export const Property = {
  Param: ParamField,
  Response: ResponseField,
  Head: PropertyHead,
  InfoPill,
  RequiredPill,
  DeprecatedPill,
};
