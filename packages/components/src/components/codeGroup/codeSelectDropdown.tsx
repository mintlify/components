import { ChevronDownIcon } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/dropdown';
import { cn } from '@/utils/cn';

interface CodeSelectDropdownProps {
    selectedOption?: string;
    setSelectedOption: (option: string) => void;
    options: string[];
    codeBlockTheme?: 'system' | 'dark';
}

export const CodeSelectDropdown = ({
    selectedOption,
    setSelectedOption,
    options,
    codeBlockTheme = 'system',
}: CodeSelectDropdownProps) => {
    const hasOptions = options.length > 1;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                disabled={!hasOptions}
                className={cn(
                    'select-none bg-transparent px-2 py-[5px] text-xs font-medium min-w-16 flex-1 dark:bg-transparent',
                    codeBlockTheme === 'system' && 'text-primary dark:text-primary-light',
                    codeBlockTheme === 'dark' && 'text-primary-light'
                )}
            >
                <div className="flex gap-1.5 items-center px-2 py-1 group-hover:hover:bg-primary-light/10 rounded-lg min-w-16">
                    <p className="truncate">{selectedOption}</p>
                    {hasOptions && <ChevronDownIcon size={12} className="min-w-3" />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn(
                    'overflow-y-auto',
                    codeBlockTheme === 'system' &&
                    'border border-gray-200/70 dark:border-gray-800/50 bg-gray-50 dark:bg-[#0F1117]',
                    codeBlockTheme === 'dark' && 'border-none bg-[#0F1117]'
                )}
            >
                {options.map((option, i) => (
                    <DropdownMenuItem
                        key={i}
                        onSelect={() => setSelectedOption(option)}
                        className={cn(
                            'py-1.5 text-xs',
                            codeBlockTheme === 'system' &&
                            'hover:text-primary hover:bg-primary/10 dark:hover:text-primary-light dark:hover:bg-primary-light/10',
                            codeBlockTheme === 'dark' &&
                            'text-primary-light dark:text-primary-light hover:text-primary-light hover:bg-primary-light/10',
                            option === selectedOption &&
                            codeBlockTheme === 'system' &&
                            'text-primary dark:text-primary-light font-medium',
                            option === selectedOption &&
                            codeBlockTheme === 'dark' &&
                            'text-primary-light dark:text-primary-light font-medium',
                            option !== selectedOption &&
                            codeBlockTheme === 'system' &&
                            'text-gray-500 dark:text-white/50',
                            option !== selectedOption && codeBlockTheme === 'dark' && 'text-white/50'
                        )}
                    >
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
