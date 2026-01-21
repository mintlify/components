import { ReactNode, useMemo } from 'react';

import { cn } from '@/utils/cn';
import { Classes } from '@/lib/local/selectors';
import { MAX_DEFAULT_VALUE_LENGTH } from '@/constants';
import { ParamHead } from './paramHead';

export type PropertyProps = {
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
    // pass in locale['aria.navigateToHeader']
    navigateToHeaderAriaLabel?: string;
    // pass in locale['api.default']
    defaultLabel?: string;
    // pass in locale['api.required']
    requiredLabel?: string;
    // pass in locale['api.deprecated']
    deprecatedLabel?: string;
}

const DEFAULT_NAVIGATE_TO_HEADER_ARIA_LABEL = 'Navigate to header';
const DEFAULT_DEFAULT_LABEL = 'default';
const DEFAULT_REQUIRED_LABEL = 'required';
const DEFAULT_DEPRECATED_LABEL = 'deprecated';

export function Property({
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
}: PropertyProps) {
    const stringifiedDefaultValue = useMemo(() => {
        if (defaultValue !== null && typeof defaultValue === 'object') {
            // don't display values with nested objects; looks bad on one line
            const containsNestedObject = Object.values(defaultValue).some(
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
        >
            <ParamHead
                name={name}
                type={type}
                location={location}
                required={required}
                deprecated={deprecated}
                default={stringifiedDefaultValue}
                id={id}
                pre={pre}
                post={post}
                onMount={onMount}
                navigateToHeaderAriaLabel={navigateToHeaderAriaLabel}
                defaultLabel={defaultLabel}
                requiredLabel={requiredLabel}
                deprecatedLabel={deprecatedLabel}
            />
            {children && (
                <div
                    className="mt-4 prose-sm prose-gray dark:prose-invert [&_.prose>p:first-child]:mt-0 [&_.prose>p:last-child]:mb-0"
                    data-component-part="field-content"
                >
                    {children}
                </div>
            )}
        </div>
    );
}

