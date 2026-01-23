import type React from "react";
import { memo, useEffect, useState } from "react";

import { CopyToClipboardButton } from "@/components/code-block/copy-button";
import { cn } from "@/utils/cn";
import type { CopyToClipboardResult } from "@/utils/copy-to-clipboard";
import { CodeSelectDropdown } from "./code-select-dropdown";
import { CodeSnippet } from "./code-snippet";

type ExampleCodeSnippet = {
  filename: string;
  code: string;
  language: string;
};

interface CodeGroupSelectProps {
  snippets: Record<string, Record<string, ExampleCodeSnippet>>;
  setSelectedExampleIndex?: (index: number) => void;
  codeBlockTheme?: "system" | "dark";
  syncedLabel?: string;
  setSelectedLabel?: (label: string | undefined) => void;
  codeSnippetAriaLabel?: string;
  askAiButton?: React.ReactNode;
  onCopy?: (result: CopyToClipboardResult, textToCopy?: string) => void;
  copyButtonAriaLabel?: string;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
}

const CodeGroupSelect = memo(function CodeGroupSelect({
  snippets,
  setSelectedExampleIndex,
  codeBlockTheme = "system",
  syncedLabel,
  setSelectedLabel,
  codeSnippetAriaLabel = "Code snippet",
  askAiButton,
  onCopy,
  copyButtonAriaLabel,
  tooltipCopyText,
  tooltipCopiedText,
}: CodeGroupSelectProps) {
  const groups = Object.keys(snippets);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  const groupSnippets =
    selectedGroup !== undefined ? snippets[selectedGroup] : undefined;
  const options = groupSnippets ? Object.keys(groupSnippets) : undefined;
  const [selectedOption, setSelectedOption] = useState(options?.[0]);

  const safeSelectedOption =
    selectedOption && options?.includes(selectedOption)
      ? selectedOption
      : options?.[0];

  const snippet =
    groupSnippets !== undefined && safeSelectedOption !== undefined
      ? groupSnippets[safeSelectedOption]
      : undefined;

  const handleGroupSelect = (grp: string) => {
    setSelectedGroup(grp);
    const newGroupSnippets = snippets[grp];
    const newOptions = newGroupSnippets
      ? Object.keys(newGroupSnippets)
      : undefined;
    setSelectedOption(newOptions?.[0]);
  };

  const handleOptionSelect = (opt: string) => {
    setSelectedOption(opt);
    const index = options?.indexOf(opt) ?? -1;
    setSelectedExampleIndex?.(index >= 0 ? index : 0);
    if (opt !== syncedLabel) {
      setSelectedLabel?.(opt);
    }
  };

  useEffect(() => {
    const newGroups = Object.keys(snippets);
    if (!newGroups.includes(selectedGroup)) {
      setSelectedGroup(newGroups[0]);
      const newGroupSnippets = snippets[newGroups[0]];
      const newOptions = newGroupSnippets
        ? Object.keys(newGroupSnippets)
        : undefined;
      setSelectedOption(newOptions?.[0]);
    }
  }, [snippets, selectedGroup]);

  useEffect(() => {
    if (
      syncedLabel &&
      syncedLabel !== safeSelectedOption &&
      options?.includes(syncedLabel)
    ) {
      setSelectedOption(syncedLabel);
    }
  }, [syncedLabel, options, safeSelectedOption]);

  return (
    <div
      className={cn(
        "not-prose relative min-w-full max-w-full overflow-hidden rounded-2xl p-0.5 text-xs leading-6",
        codeBlockTheme === "system" &&
          "border border-gray-950/10 bg-gray-50 dark:border-white/10 dark:bg-white/5",
        codeBlockTheme === "dark" &&
          "bg-codeblock ring-1 ring-transparent dark:bg-white/5 dark:ring-white/[0.14]"
      )}
      data-testid="code-group-select"
    >
      <div className="flex w-full justify-between rounded-t-2xl text-xs leading-6">
        <CodeSelectDropdown
          data-testid="code-group-select-group"
          options={groups}
          selectedOption={selectedGroup}
          setSelectedOption={handleGroupSelect}
        />
        <div className="flex overflow-hidden">
          {options && (
            <CodeSelectDropdown
              data-testid="code-group-select-option"
              options={options}
              selectedOption={safeSelectedOption}
              setSelectedOption={handleOptionSelect}
            />
          )}
          <div
            className="flex items-center gap-1.5 pr-2.5"
            data-testid="code-group-select-copy-button"
          >
            <div data-testid="code-group-select-copy-button">
              <CopyToClipboardButton
                codeBlockTheme={codeBlockTheme}
                copyButtonAriaLabel={copyButtonAriaLabel}
                onCopied={
                  onCopy
                    ? (result, textToCopy) => onCopy(result, textToCopy)
                    : undefined
                }
                textToCopy={snippet?.code ?? ""}
                tooltipCopiedText={tooltipCopiedText}
                tooltipCopyText={tooltipCopyText}
              />
            </div>
            {askAiButton && askAiButton}
          </div>
        </div>
      </div>

      <section
        aria-label={codeSnippetAriaLabel}
        className={cn(
          "not-prose scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded max-h-[calc(100%-34px)] w-full min-w-full max-w-0 overflow-x-auto rounded-[14px] p-5 text-xs leading-[1.35rem] dark:bg-codeblock",
          codeBlockTheme === "system" &&
            "scrollbar-thumb-black/20 dark:scrollbar-thumb-white/10 codeblock-light bg-white text-gray-950 dark:text-gray-50",
          codeBlockTheme === "dark" &&
            "scrollbar-thumb-white/25 dark:scrollbar-thumb-white/10 codeblock-dark bg-codeblock text-gray-50"
        )}
      >
        <CodeSnippet language={snippet?.language}>{snippet?.code}</CodeSnippet>
      </section>
    </div>
  );
});

export { CodeGroupSelect, type ExampleCodeSnippet };
