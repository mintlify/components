import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import type { CodeBlockTheme, CodeStyling } from "@/utils/shiki/code-styling";
import { BaseCodeBlock } from "../code-block/base-code-block";
import {
  CopyToClipboardButton,
  type CopyToClipboardButtonProps,
} from "../code-block/copy-button";
import { CodeSelectDropdown } from "./code-select-dropdown";

const DEFAULT_CODE_SNIPPET_ARIA_LABEL = "Code snippet";

type ExampleCodeSnippet = {
  filename: string;
  code: string;
  language: string;
  audioUrl?: string;
};

interface CodeGroupSelectProps {
  snippets: Record<string, Record<string, ExampleCodeSnippet>>;
  className?: string;
  syncedLabel?: string;
  setSyncedLabel?: (label: string) => void;
  setSelectedExampleIndex?: (index: number) => void;
  askAiButton?: ReactNode;
  codeBlockTheme?: CodeBlockTheme;
  codeBlockThemeObject?: CodeStyling;
  codeSnippetAriaLabel?: string;
  copyButtonProps?: CopyToClipboardButtonProps;
}

const CodeGroupSelect = ({
  snippets,
  syncedLabel,
  setSyncedLabel,
  setSelectedExampleIndex,
  askAiButton,
  codeBlockTheme = "system",
  codeBlockThemeObject,
  codeSnippetAriaLabel = DEFAULT_CODE_SNIPPET_ARIA_LABEL,
  copyButtonProps,
  className,
}: CodeGroupSelectProps) => {
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
  };

  const handleOptionSelect = (opt: string) => {
    setSelectedOption(opt);
    setSelectedExampleIndex?.(options?.indexOf(opt) ?? 0);
    if (opt !== syncedLabel) {
      setSyncedLabel?.(opt);
    }
  };

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
        "not-prose relative flex min-w-full max-w-full flex-col overflow-hidden rounded-2xl p-0.5 text-xs leading-6",
        codeBlockTheme === "system" &&
          "border border-gray-950/10 bg-gray-50 dark:border-white/10 dark:bg-white/5",
        codeBlockTheme === "dark" &&
          "bg-codeblock ring-1 ring-transparent dark:bg-white/5 dark:ring-white/[0.14]",
        className
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
            <CopyToClipboardButton
              codeBlockTheme={codeBlockTheme}
              textToCopy={snippet?.code ?? ""}
              {...copyButtonProps}
            />
            {askAiButton && askAiButton}
          </div>
        </div>
      </div>

      <section
        aria-label={codeSnippetAriaLabel}
        className="flex flex-1 overflow-hidden"
      >
        <div className="relative h-full max-h-full w-full min-w-full max-w-full">
          {snippet?.audioUrl ? (
            <div className="p-4">
              <audio className="w-full" controls src={snippet.audioUrl}>
                <track kind="captions" />
              </audio>
            </div>
          ) : (
            <BaseCodeBlock
              codeBlockTheme={codeBlockTheme}
              codeBlockThemeObject={codeBlockThemeObject}
              isParentCodeGroup={true}
              isSmallText
              language={snippet?.language}
            >
              {snippet?.code}
            </BaseCodeBlock>
          )}
        </div>
      </section>
    </div>
  );
};

export { type ExampleCodeSnippet, type CodeGroupSelectProps, CodeGroupSelect };
