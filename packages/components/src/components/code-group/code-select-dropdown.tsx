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
};

const CodeSelectDropdown = ({
  selectedOption,
  setSelectedOption,
  options,
}: CodeSelectDropdownProps) => {
  const hasOptions = options.length > 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="min-w-16 select-none bg-transparent px-2 py-[5px] font-medium text-primary text-xs dark:bg-transparent dark:text-primary-light"
        disabled={!hasOptions}
      >
        <div className="flex min-w-16 items-center gap-1.5 rounded-lg px-2 py-1 group-hover:bg-primary/10 dark:group-hover:bg-primary-light/10">
          <p className="truncate">{selectedOption}</p>
          {hasOptions && <ChevronDownIcon className="min-w-3" size={12} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="overflow-y-auto border border-stone-200/70 bg-stone-50 dark:border-stone-800/50 dark:bg-[#0F1117]">
        {options.map((option, i) => (
          <DropdownMenuItem
            className={cn(
              "rounded-xl py-1.5 text-xs",
              "hover:bg-primary/10 hover:text-primary dark:hover:bg-primary-light/10 dark:hover:text-primary-light",
              option === selectedOption &&
                "font-medium text-primary dark:text-primary-light",
              option !== selectedOption && "text-stone-500 dark:text-white/50"
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
