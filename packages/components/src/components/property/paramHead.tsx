import { useRef, useState, useEffect, useCallback } from 'react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import slugify from '@sindresorhus/slugify';
import { cn } from '@/utils/cn';
import { LinkIcon } from '@/icons';
import { InfoPill, RequiredPill, DeprecatedPill } from './pills';

type ParamHeadProps = {
    name?: string | null;
    typeLabel?: string;
    location?: string;
    required?: boolean;
    deprecated?: boolean;
    defaultValue?: unknown;
    id?: string;
    pre?: string[];
    post?: string[];
    onMount?: () => void;
    navigateToHeaderAriaLabel?: string;
    defaultLabel?: string;
    requiredLabel?: string;
    deprecatedLabel?: string;
}

export function ParamHead({
    name,
    typeLabel,
    location,
    required,
    deprecated,
    defaultValue,
    id,
    pre,
    post,
    onMount,
    navigateToHeaderAriaLabel,
    defaultLabel,
    requiredLabel,
    deprecatedLabel,
}: ParamHeadProps) {
    const pillsRef = useRef<HTMLDivElement>(null);
    const [isMultiLine, setIsMultiLine] = useState(false);
    const paramId = id ?? slugify(name ?? '', { decamelize: true });

    const copyAnchorLink = useCallback(() => {
        if (paramId) {
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
        onMount?.();
    }, [onMount]);

    if (name == null) return null;

    return (
        <div
            className={cn('flex font-mono text-sm group/param-head param-head break-all relative')}
            id={paramId}
            key={paramId}
        >
            <div className="flex-1 flex flex-col content-start py-0.5 mr-5">
                <div className="flex items-center flex-wrap gap-2">
                    {paramId && (
                        <div className="absolute -top-1.5 -left-9">
                            <a
                                href={`#${paramId}`}
                                className="flex items-center opacity-0 border-0 group-hover/param-head:opacity-100 focus:opacity-100 focus:outline-0 py-2 group/link"
                                aria-label={navigateToHeaderAriaLabel}
                                onClick={copyAnchorLink}
                            >
                                &#8203;
                                <div className="w-6 h-6 rounded-md flex items-center justify-center shadow-sm text-gray-400 dark:text-white/50 dark:bg-background-dark dark:brightness-[1.35] dark:ring-1 dark:hover:brightness-150 bg-white ring-1 ring-gray-400/30 dark:ring-gray-700/25 hover:ring-gray-400/60 dark:hover:ring-white/20 group-focus/link:border-2 group-focus/link:border-primary dark:group-focus/link:border-primary-light">
                                    <LinkIcon />
                                </div>
                            </a>
                        </div>
                    )}
                    {pre?.map((item, i) => (
                        <div
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
                            data-component-part="field-meta-pre"
                        >
                            {item}
                        </div>
                    ))}
                    <div
                        className="font-semibold text-primary dark:text-primary-light cursor-pointer overflow-wrap-anywhere"
                        data-component-part="field-name"
                        onClick={copyAnchorLink}
                    >
                        {name}
                    </div>
                    <div
                        ref={pillsRef}
                        className={cn(
                            'inline items-center gap-2 text-xs font-medium [&_div]:inline [&_div]:mr-2',
                            isMultiLine ? '[&_div]:leading-6' : '[&_div]:leading-5'
                        )}
                        data-component-part="field-meta"
                    >
                        {typeLabel && <InfoPill>{typeLabel}</InfoPill>}
                        {location && <InfoPill>{location}</InfoPill>}
                        {defaultValue != null && (
                            <InfoPill prefix={defaultLabel}>
                                {typeof defaultValue === 'string'
                                    ? defaultValue === ''
                                        ? '""'
                                        : defaultValue
                                    : JSON.stringify(defaultValue)}
                            </InfoPill>
                        )}
                        {required && <RequiredPill label={requiredLabel} />}
                        {deprecated && <DeprecatedPill label={deprecatedLabel} />}
                        {post?.map((item, i) => (
                            <div
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200"
                                data-component-part="field-meta-post"
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
