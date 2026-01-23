import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/cn";
import type { CodeBlockTheme } from "@/utils/shiki/code-styling";
import { getDisplayName } from "@/utils/shiki/snippet-presets";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown";
import { LanguageIcon } from "./language-icon";

type LanguageDropdownProps = {
  selectedLanguage: string;
  setSelectedLanguage: (language: string, index: number) => void;
  languages: string[];
  codeBlockTheme?: CodeBlockTheme;
};

const LanguageDropdown = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
  codeBlockTheme = "system",
}: LanguageDropdownProps) => {
  const hasOptions = languages.length > 1;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger
        className="cursor-default select-none bg-transparent pb-1 font-medium text-xs dark:bg-transparent"
        disabled={!hasOptions}
      >
        <div
          className={cn(
            "flex items-center gap-1 rounded-[10px] border py-[5px] pr-1.5 pl-2.5 text-gray-500 dark:text-gray-400",
            hasOptions ? "cursor-pointer" : "cursor-default",
            hasOptions &&
              codeBlockTheme === "system" &&
              "hover:bg-gray-200/50 hover:text-primary dark:hover:bg-gray-700/70 dark:hover:text-primary-light",
            hasOptions &&
              codeBlockTheme === "dark" &&
              "hover:bg-gray-700/70 hover:text-primary-light",
            isOpen &&
              "border-gray-600/50 ring-1 dark:border-gray-400/50 dark:ring-gray-800/50",
            isOpen && codeBlockTheme === "system" && "ring-gray-200/70",
            isOpen && codeBlockTheme === "dark" && "ring-gray-800/50",
            !isOpen && "border-transparent"
          )}
        >
          <LanguageIcon language={selectedLanguage} />
          <p className="truncate font-medium">
            {getDisplayName(selectedLanguage)}
          </p>
          {hasOptions && <ChevronsUpDownIcon className="size-3.5 shrink-0" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "min-w-[170px] overflow-y-auto border p-1",
          codeBlockTheme === "system" &&
            "border-gray-200/70 bg-white dark:border-white/10 dark:bg-[#0F1117]",
          codeBlockTheme === "dark" && "border-white/10 bg-[#0F1117]"
        )}
        sideOffset={0}
      >
        {languages.map((language, i) => {
          const isSelected = language === selectedLanguage;
          return (
            <DropdownMenuItem
              className={cn(
                "flex items-center gap-1.5 py-1.5 text-xs",
                codeBlockTheme === "system" &&
                  "hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-light/10 dark:hover:text-primary-light",
                codeBlockTheme === "dark" &&
                  "text-primary-light hover:bg-primary-light/10 hover:text-primary-light dark:text-primary-light",
                language === selectedLanguage &&
                  codeBlockTheme === "system" &&
                  "font-medium text-primary dark:text-primary-light",
                language === selectedLanguage &&
                  codeBlockTheme === "dark" &&
                  "font-medium text-primary-light dark:text-primary-light",
                language !== selectedLanguage &&
                  codeBlockTheme === "system" &&
                  "text-gray-500 dark:text-white/50",
                language !== selectedLanguage &&
                  codeBlockTheme === "dark" &&
                  "text-white/50"
              )}
              isSelected={isSelected}
              key={`Language${i}${language}`}
              onSelect={() => setSelectedLanguage(language, i)}
            >
              <LanguageIcon language={language} />
              <div className="flex min-w-0 flex-1 items-center font-medium">
                {getDisplayName(language)}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageDropdown };
