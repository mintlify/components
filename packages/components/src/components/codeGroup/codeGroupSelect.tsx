import React, { useState, useEffect, memo } from 'react';

import { cn } from '@/utils/cn';

import { CodeSnippet } from './codeSnippet';
import { CodeGroupCopyButton } from './copyButton';
import { CodeSelectDropdown } from './codeSelectDropdown';

export type ExampleCodeSnippet = {
    filename: string;
    code: string;
    language: string;
};

interface CodeGroupSelectProps {
    snippets: Record<string, Record<string, ExampleCodeSnippet>>;
    setSelectedExampleIndex?: (index: number) => void;
    codeBlockTheme?: 'system' | 'dark';
    syncedLabel?: string;
    setSelectedLabel?: (label: string | undefined) => void;
    codeSnippetAriaLabel?: string;
    askAiButton?: React.ReactNode;
}

export const CodeGroupSelect = memo(function CodeGroupSelect({ snippets, setSelectedExampleIndex, codeBlockTheme = 'system', syncedLabel, setSelectedLabel, codeSnippetAriaLabel = 'Code snippet', askAiButton }: CodeGroupSelectProps) {
    const groups = Object.keys(snippets);
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);

    const groupSnippets = selectedGroup !== undefined ? snippets[selectedGroup] : undefined;
    const options = groupSnippets ? Object.keys(groupSnippets) : undefined;
    const [selectedOption, setSelectedOption] = useState(options && options[0]);

    const safeSelectedOption =
        selectedOption && options?.includes(selectedOption) ? selectedOption : options?.[0];

    const snippet =
        groupSnippets !== undefined && safeSelectedOption !== undefined
            ? groupSnippets[safeSelectedOption]
            : undefined;

    const handleGroupSelect = (grp: string) => {
        setSelectedGroup(grp);
    };

    const handleOptionSelect = (opt: string) => {
        setSelectedOption(opt);
        setSelectedExampleIndex?.(options?.indexOf(opt) ?? 0);
        if (opt !== syncedLabel) {
            setSelectedLabel?.(opt);
        }
    };

    useEffect(() => {
        const newGroups = Object.keys(snippets);
        if (!newGroups.includes(selectedGroup)) {
            setSelectedGroup(newGroups[0]);
            const newGroupSnippets = snippets[newGroups[0]];
            const newOptions = newGroupSnippets ? Object.keys(newGroupSnippets) : undefined;
            setSelectedOption(newOptions?.[0]);
        }
    }, [snippets, selectedGroup]);

    useEffect(() => {
        if (syncedLabel && syncedLabel !== safeSelectedOption && options?.includes(syncedLabel)) {
            setSelectedOption(syncedLabel);
        }
    }, [syncedLabel, options, safeSelectedOption]);

    return (
        <div
            className={cn(
                'text-xs p-0.5 leading-6 rounded-2xl not-prose overflow-hidden relative max-w-full min-w-full',
                codeBlockTheme === 'system' &&
                'bg-gray-50 dark:bg-white/5 border border-gray-950/10 dark:border-white/10',
                codeBlockTheme === 'dark' &&
                'bg-codeblock dark:bg-white/5 ring-1 ring-transparent dark:ring-white/[0.14]'
            )}
            data-testid="code-group-select"
        >
            <div className="flex justify-between text-xs leading-6 rounded-t-2xl w-full">
                <CodeSelectDropdown
                    selectedOption={selectedGroup}
                    setSelectedOption={handleGroupSelect}
                    options={groups}
                    data-testid="code-group-select-group"
                />
                <div className="flex overflow-hidden">
                    {options && (
                        <CodeSelectDropdown
                            selectedOption={safeSelectedOption}
                            setSelectedOption={handleOptionSelect}
                            options={options}
                            data-testid="code-group-select-option"
                        />
                    )}
                    <div
                        className="flex items-center gap-1.5 pr-2.5"
                        data-testid="code-group-select-copy-button"
                    >
                        <CodeGroupCopyButton code={snippet?.code ?? ''} />
                        {askAiButton && askAiButton}
                    </div>
                </div>
            </div>

            <div
                role="region"
                aria-label={codeSnippetAriaLabel}
                className={cn(
                    'dark:bg-codeblock not-prose rounded-xt p-5 min-w-full max-w-0 overflow-x-auto max-h-[calc(100%-34px)] w-full scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded text-xs leading-[1.35rem]',
                    codeBlockTheme === 'system' &&
                    'bg-white text-gray-950 dark:text-gray-50 scrollbar-thumb-black/20 dark:scrollbar-thumb-white/10 codeblock-light',
                    codeBlockTheme === 'dark' &&
                    'bg-codeblock text-gray-50 scrollbar-thumb-white/25 dark:scrollbar-thumb-white/10 codeblock-dark'
                )}
            >
                <CodeSnippet language={snippet?.language}>{snippet?.code}</CodeSnippet>
            </div>
        </div>
    );
});
