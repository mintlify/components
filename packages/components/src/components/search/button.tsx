import { SearchIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useSearch } from "./provider";

type SearchButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  showShortcut?: boolean;
  shortcutText?: string;
};

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
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
          "bg-white dark:bg-stone-900",
          "border border-stone-200 dark:border-stone-700",
          "rounded-xl",
          "hover:bg-stone-50 dark:hover:bg-stone-800",
          "focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600",
          "transition-colors",
          className
        )}
        onClick={handleClick}
        ref={ref}
        type="button"
        {...props}
      >
        <SearchIcon
          className="shrink-0 text-stone-400 dark:text-stone-500"
          size={16}
        />
        <span className="flex-1 text-stone-500 dark:text-stone-400">
          {children || "Search..."}
        </span>
        {showShortcut && (
          <kbd className="hidden items-center gap-0.5 rounded border border-stone-200 bg-stone-100 px-1.5 py-0.5 font-medium font-sans text-stone-500 text-xs sm:inline-flex dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {shortcutText}
          </kbd>
        )}
      </button>
    );
  }
);

SearchButton.displayName = "SearchButton";

export type { SearchButtonProps };
export { SearchButton };
