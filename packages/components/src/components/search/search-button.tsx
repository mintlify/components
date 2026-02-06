import { SearchIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useSearch } from "./search-provider";

export interface SearchButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show keyboard shortcut hint (default: true) */
  showShortcut?: boolean;
  /** Custom shortcut text (default: '⌘K') */
  shortcutText?: string;
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  (
    {
      showShortcut = true,
      shortcutText = "⌘K",
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = useSearch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      context?.open();
      onClick?.(e);
    };

    return (
      <button
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
          "bg-white dark:bg-gray-900",
          "border border-gray-200 dark:border-gray-700",
          "rounded-xl",
          "hover:bg-gray-50 dark:hover:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600",
          "transition-colors",
          className
        )}
        onClick={handleClick}
        ref={ref}
        type="button"
        {...props}
      >
        <SearchIcon
          className="shrink-0 text-gray-400 dark:text-gray-500"
          size={16}
        />
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          {children || "Search..."}
        </span>
        {showShortcut && (
          <kbd className="hidden items-center gap-0.5 rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500 text-xs sm:inline-flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {shortcutText}
          </kbd>
        )}
      </button>
    );
  }
);

SearchButton.displayName = "SearchButton";
