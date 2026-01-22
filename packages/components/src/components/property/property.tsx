import { type ReactNode, useMemo } from "react";
import { MAX_DEFAULT_VALUE_LENGTH } from "@/constants";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import { ParamHead } from "./param-head";

type PropertyProps = {
  name: string;
  type: string;
  location?: string;
  hidden?: boolean;
  default?: unknown;
  required?: boolean;
  deprecated?: boolean;
  children: ReactNode;
  id?: string;
  pre?: string[];
  post?: string[];
  className?: string;
  onMount?: () => void;
  navigateToHeaderAriaLabel?: string;
  defaultLabel?: string;
  requiredLabel?: string;
  deprecatedLabel?: string;
};

const DEFAULT_NAVIGATE_TO_HEADER_ARIA_LABEL = "Navigate to header";
const DEFAULT_DEFAULT_LABEL = "default";
const DEFAULT_REQUIRED_LABEL = "required";
const DEFAULT_DEPRECATED_LABEL = "deprecated";

const Property = ({
  name,
  type,
  location,
  hidden,
  default: defaultValue,
  required,
  deprecated,
  children,
  id,
  pre,
  post,
  className,
  onMount,
  navigateToHeaderAriaLabel = DEFAULT_NAVIGATE_TO_HEADER_ARIA_LABEL,
  defaultLabel = DEFAULT_DEFAULT_LABEL,
  requiredLabel = DEFAULT_REQUIRED_LABEL,
  deprecatedLabel = DEFAULT_DEPRECATED_LABEL,
}: PropertyProps) => {
  const stringifiedDefaultValue = useMemo(() => {
    if (defaultValue !== null && typeof defaultValue === "object") {
      // don't display values with nested objects; looks bad on one line
      const containsNestedObject = Object.values(defaultValue).some(
        (value) => value !== null && typeof value === "object"
      );

      if (containsNestedObject) {
        return null;
      }
    }

    try {
      const stringifiedValue = JSON.stringify(defaultValue);
      if (
        stringifiedValue &&
        stringifiedValue.length > 0 &&
        stringifiedValue.length < MAX_DEFAULT_VALUE_LENGTH
      ) {
        return stringifiedValue;
      }
    } catch {
      return null;
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
        "my-2.5 border-gray-50 border-b pt-2.5 pb-5 dark:border-gray-800/50",
        className
      )}
    >
      <ParamHead
        default={stringifiedDefaultValue}
        defaultLabel={defaultLabel}
        deprecated={deprecated}
        deprecatedLabel={deprecatedLabel}
        id={id}
        location={location}
        name={name}
        navigateToHeaderAriaLabel={navigateToHeaderAriaLabel}
        onMount={onMount}
        post={post}
        pre={pre}
        required={required}
        requiredLabel={requiredLabel}
        type={type}
      />
      {children && (
        <div
          className="prose-sm prose-gray dark:prose-invert mt-4 [&_.prose>p:first-child]:mt-0 [&_.prose>p:last-child]:mb-0"
          data-component-part="field-content"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { Property };
export type { PropertyProps };
