import { useId } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';

type OptionDropdownProps = {
    options: string[];
    selectedIndex?: number;
    onSelectOption?: (index: number) => void;
    noBackground?: boolean;
    selectSchemaTypeAriaLabel?: string;
}

export const OptionDropdown = ({
    options,
    selectedIndex,
    onSelectOption,
    noBackground,
    selectSchemaTypeAriaLabel,
}: OptionDropdownProps) => {
    const id = useId();
    const selectId = `opt-dd-${id.replace(/:/g, '')}`;

    const cssRules = options
        .map(
            (_, i) =>
                `#${selectId}:has(option[value="${i}"]:checked) ~ [data-idx="${i}"] { display: flex; }`
        )
        .join('\n');

    return (
        <div className={cn(Classes.OptionDropdown, 'inline-flex relative mr-0!')}>
            <div
                className={cn(
                    'font-mono text-xs font-medium inline-block! leading-4! items-center rounded-md space-x-1.5 text-gray-600 dark:text-gray-200 py-0.5',
                    !noBackground && 'bg-gray-100/50 dark:bg-white/5'
                )}
            >
                <style dangerouslySetInnerHTML={{ __html: cssRules }} />
                <div className="group relative inline-flex!">
                    <select
                        id={selectId}
                        aria-label={selectSchemaTypeAriaLabel}
                        className="absolute inset-0 w-full h-full flex opacity-0 cursor-pointer focus:outline-0"
                        onChange={(e) => onSelectOption?.(e.target.selectedIndex)}
                        value={selectedIndex}
                    >
                        {options.map((option, index) => (
                            <option value={index} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {options.map((option, index) => (
                        <span
                            key={index}
                            data-idx={index}
                            aria-hidden="true"
                            className="hidden bg-transparent text-right pl-0.5 pr-8 group-hover:text-gray-950 dark:group-hover:text-white overflow-wrap-anywhere max-w-96"
                        >
                            {option}
                        </span>
                    ))}
                </div>
                <Icon
                    icon="angle-down"
                    iconType="solid"
                    className="absolute top-1/2 -translate-y-1/2 right-4 h-2.5 w-2.5 shrink-0 bg-gray-500 dark:bg-gray-400 pointer-events-none"
                />
            </div>
        </div>
    );
};
