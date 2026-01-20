import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/dropdown';
import { getDisplayName } from '@/constants/snippetPresets';
import { cn } from '@/utils/cn';

import { LanguageIcon } from './languageIcon';

type LanguageDropdownProps = {
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    languages: string[];
    codeBlockTheme?: 'dark' | 'system';
};

export const LanguageDropdown = ({
    selectedLanguage,
    setSelectedLanguage,
    languages,
    codeBlockTheme = 'system',
}: LanguageDropdownProps) => {
    const hasOptions = languages.length > 1;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                disabled={!hasOptions}
                className="select-none bg-transparent dark:bg-transparent pb-1 text-xs font-medium cursor-default"
            >
                <div
                    className={cn(
                        'flex gap-1 items-center pl-2.5 pr-1.5 py-[5px] rounded-[10px] border text-gray-500 dark:text-gray-400',
                        hasOptions ? 'cursor-pointer' : 'cursor-default',
                        hasOptions &&
                        codeBlockTheme === 'system' &&
                        'hover:bg-gray-200/50 dark:hover:bg-gray-700/70 hover:text-primary dark:hover:text-primary-light',
                        hasOptions &&
                        codeBlockTheme === 'dark' &&
                        'hover:bg-gray-700/70 hover:text-primary-light',
                        isOpen
                            ? 'ring-1 dark:ring-gray-800/50 ' +
                            (codeBlockTheme === 'system' ? 'ring-gray-200/70 ' : 'ring-gray-800/50') +
                            ' border-gray-600/50 dark:border-gray-400/50'
                            : 'border-transparent'
                    )}
                >
                    <LanguageIcon language={selectedLanguage} />
                    <p className="truncate font-medium">{getDisplayName(selectedLanguage)}</p>
                    {hasOptions && <ChevronsUpDownIcon className="w-3.5 h-3.5 shrink-0" />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn(
                    'p-1 overflow-y-auto min-w-[170px] border dark:border-white/10 dark:bg-codeblock',
                    codeBlockTheme === 'system' && 'border-gray-200/70',
                    codeBlockTheme === 'dark' && 'border-white/10 bg-codeblock'
                )}
                align="end"
                sideOffset={0}
            >
                {languages.map((language, i) => {
                    const isSelected = language === selectedLanguage;
                    return (
                        <DropdownMenuItem
                            key={i}
                            isSelected={isSelected}
                            onSelect={() => setSelectedLanguage(language)}
                            className={cn(
                                'flex items-center py-1.5 gap-1.5 text-xs',
                                codeBlockTheme === 'system' &&
                                'hover:text-primary hover:bg-primary/10 dark:hover:text-primary-light dark:hover:bg-primary-light/10',
                                codeBlockTheme === 'dark' &&
                                'text-primary-light dark:text-primary-light hover:text-primary-light hover:bg-primary-light/10',
                                language === selectedLanguage &&
                                codeBlockTheme === 'system' &&
                                'text-primary dark:text-primary-light font-medium',
                                language === selectedLanguage &&
                                codeBlockTheme === 'dark' &&
                                'text-primary-light dark:text-primary-light font-medium',
                                language !== selectedLanguage &&
                                codeBlockTheme === 'system' &&
                                'text-gray-500 dark:text-white/50',
                                language !== selectedLanguage && codeBlockTheme === 'dark' && 'text-white/50'
                            )}
                        >
                            <LanguageIcon language={language} />
                            <div className="flex items-center min-w-0 flex-1 font-medium">
                                {getDisplayName(language)}
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
