import { useMemo, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const MAX_DEFAULT_VALUE_LENGTH = 50;

export type ResponseFieldProps = {
  /** The name of the response field */
  name: string;
  /** The type of the field (e.g., "string", "number", "object") */
  type?: string;
  /** Whether the field is hidden */
  hidden?: boolean;
  /** Default value for the field */
  default?: unknown;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is deprecated */
  deprecated?: boolean;
  /** Description of the field */
  children?: ReactNode;
  /** Custom ID for the field (used for anchor links) */
  id?: string;
  /** Custom labels to display before the type */
  pre?: string[];
  /** Custom labels to display after the type */
  post?: string[];
  /** Additional CSS classes for the root element */
  className?: string;
};

function InfoPill({
  children,
  prefix,
  className,
}: {
  children: ReactNode;
  prefix?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200 font-medium break-all",
        className
      )}
      data-component-part="info-pill"
    >
      {prefix && (
        <span className="text-gray-400 dark:text-gray-500">{prefix}</span>
      )}
      <span>{children}</span>
    </div>
  );
}

function RequiredPill() {
  return (
    <div
      className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium whitespace-nowrap"
      data-component-part="required-pill"
      role="status"
      aria-label="Required field"
    >
      required
    </div>
  );
}

function DeprecatedPill() {
  return (
    <div
      className="px-2 py-0.5 rounded-md bg-amber-100/50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300 font-medium whitespace-nowrap"
      data-component-part="deprecated-pill"
      role="status"
      aria-label="Deprecated field"
    >
      deprecated
    </div>
  );
}

function ResponseFieldHead({
  name,
  type,
  required,
  deprecated,
  defaultValue,
  id,
  pre,
  post,
}: {
  name: string;
  type?: string;
  required?: boolean;
  deprecated?: boolean;
  defaultValue?: string | null;
  id?: string;
  pre?: string[];
  post?: string[];
}) {
  const fieldId = id ?? name;

  return (
    <div
      className="flex font-mono text-sm group/field-head break-all relative"
      id={fieldId}
      data-component-part="head"
    >
      <div className="flex-1 flex flex-col content-start py-0.5 mr-5">
        <div className="flex items-center flex-wrap gap-2">
          {pre?.map((item, i) => (
            <div
              key={i}
              className="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
              data-component-part="meta-pre"
            >
              {item}
            </div>
          ))}
          <div
            className="font-semibold text-primary dark:text-primary-light overflow-wrap-anywhere"
            data-component-part="name"
          >
            {name}
          </div>
          <div
            className="inline items-center gap-2 text-xs font-medium [&_div]:inline [&_div]:mr-2 [&_div]:leading-5"
            data-component-part="meta"
          >
            {type && <InfoPill>{type}</InfoPill>}
            {defaultValue != null && (
              <InfoPill prefix="default: ">{defaultValue}</InfoPill>
            )}
            {required && <RequiredPill />}
            {deprecated && <DeprecatedPill />}
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

export function ResponseField({
  name,
  type,
  hidden = false,
  default: defaultValue,
  required = false,
  deprecated = false,
  children,
  id,
  pre,
  post,
  className,
}: ResponseFieldProps) {
  const stringifiedDefaultValue = useMemo(() => {
    if (defaultValue === undefined || defaultValue === null) {
      return null;
    }

    if (typeof defaultValue === "object") {
      // don't display values with nested objects; looks bad on one line
      const containsNestedObject = Object.values(
        defaultValue as Record<string, unknown>
      ).some((value) => value !== null && typeof value === "object");
      if (containsNestedObject) {
        return null;
      }
    }

    const stringifiedValue =
      typeof defaultValue === "string"
        ? defaultValue === ""
          ? '""'
          : defaultValue
        : JSON.stringify(defaultValue);

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
        "pt-2.5 pb-5 my-2.5 border-gray-50 dark:border-gray-800/50 border-b",
        className
      )}
      data-component="response-field"
    >
      <ResponseFieldHead
        name={name}
        type={type}
        required={required}
        deprecated={deprecated}
        defaultValue={stringifiedDefaultValue}
        id={id}
        pre={pre}
        post={post}
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
