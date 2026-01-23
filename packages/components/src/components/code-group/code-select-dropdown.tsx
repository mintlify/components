import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/utils/cn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown";

type CodeSelectDropdownProps = {
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
  options: string[];
  codeBlockTheme?: "system" | "dark";
}

const CodeSelectDropdown = ({
  selectedOption,
  setSelectedOption,
  options,
  codeBlockTheme = "system",
}: CodeSelectDropdownProps) => {
  const hasOptions = options.length > 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "min-w-16 flex-1 select-none bg-transparent px-2 py-[5px] font-medium text-xs dark:bg-transparent",
          codeBlockTheme === "system" && "text-primary dark:text-primary-light",
          codeBlockTheme === "dark" && "text-primary-light"
        )}
        disabled={!hasOptions}
      >
        <div className="flex min-w-16 items-center gap-1.5 rounded-lg px-2 py-1 group-hover:bg-primary-light/10">
          <p className="truncate">{selectedOption}</p>
          {hasOptions && <ChevronDownIcon className="min-w-3" size={12} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "overflow-y-auto",
          codeBlockTheme === "system" &&
            "border border-gray-200/70 bg-gray-50 dark:border-gray-800/50 dark:bg-[#0F1117]",
          codeBlockTheme === "dark" && "border-none bg-[#0F1117]"
        )}
      >
        {options.map((option, i) => (
          <DropdownMenuItem
            className={cn(
              "py-1.5 text-xs",
              codeBlockTheme === "system" &&
                "hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-light/10 dark:hover:text-primary-light",
              codeBlockTheme === "dark" &&
                "text-primary-light hover:bg-primary-light/10 hover:text-primary-light dark:text-primary-light",
              option === selectedOption &&
                codeBlockTheme === "system" &&
                "font-medium text-primary dark:text-primary-light",
              option === selectedOption &&
                codeBlockTheme === "dark" &&
                "font-medium text-primary-light dark:text-primary-light",
              option !== selectedOption &&
                codeBlockTheme === "system" &&
                "text-gray-500 dark:text-white/50",
              option !== selectedOption &&
                codeBlockTheme === "dark" &&
                "text-white/50"
            )}
            key={`Option${i}${option}`}
            onSelect={() => setSelectedOption(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CodeSelectDropdown };
