import { cn } from "@/utils/cn";

type InfoPillProps = {
    children: React.ReactNode;
    prefix?: string;
    className?: string;
}

export function InfoPill({
    children,
    prefix,
    className,
}: InfoPillProps) {
    return (
        <div
            className={cn(
                'flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200 font-medium break-all',
                className
            )}
            data-component-part="field-info-pill"
        >
            {prefix && <span className="text-gray-400 dark:text-gray-500">{prefix}</span>}
            <span>{children}</span>
        </div>
    );
}

export function RequiredPill({ label }: { label?: string }) {
    return (
        <div
            className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium whitespace-nowrap"
            data-component-part="field-required-pill"
        >
            {label}
        </div>
    );
}

export function DeprecatedPill({ label }: { label?: string }) {
    return (
        <div
            className="px-2 py-0.5 rounded-md bg-amber-100/50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300 font-medium whitespace-nowrap"
            data-component-part="field-deprecated-pill"
        >
            {label}
        </div>
    );
}
