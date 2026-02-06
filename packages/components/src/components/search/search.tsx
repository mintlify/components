import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Loader2Icon, SearchIcon, SearchXIcon } from "lucide-react";
import {
  Fragment,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";

export interface SearchResult {
  id: string;
  header: string;
  content: string;
  link: string;
  metadata?: {
    breadcrumbs?: string[];
    [key: string]: unknown;
  };
}

export interface SearchProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  /** Control modal visibility */
  isOpen: boolean;
  /** Called when modal closes */
  onClose: () => void;
  isLoading?: boolean;
  placeholder?: string;
  recentSearches?: SearchResult[];
  onSelectResult?: (result: SearchResult, query: string) => void;
  className?: string;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  position?: "top" | "center";
}

function SearchHit({
  isActive,
  header,
  description,
  metadata,
}: {
  isActive: boolean;
  header: string;
  description: string;
  metadata?: SearchResult["metadata"];
}) {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer flex-col gap-1 rounded-xl px-2.5 py-2 transition-colors",
        isActive && "bg-gray-100 dark:bg-white/5"
      )}
    >
      {metadata?.breadcrumbs && metadata.breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1 truncate text-gray-500 text-xs dark:text-gray-400">
          {metadata.breadcrumbs.map((crumb, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Breadcrumbs are positional and may contain duplicates
            <Fragment key={idx}>
              {idx > 0 && <span className="text-gray-400"> &gt; </span>}
              <span className="truncate">{crumb}</span>
            </Fragment>
          ))}
        </div>
      )}
      <div className="truncate font-medium text-gray-900 text-sm dark:text-white">
        {header}
      </div>
      {description && (
        <div className="line-clamp-2 text-gray-600 text-sm dark:text-gray-400">
          {description}
        </div>
      )}
    </div>
  );
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      onSearch,
      results,
      isOpen,
      onClose,
      isLoading = false,
      placeholder = "Search...",
      recentSearches = [],
      onSelectResult,
      className,
      emptyState,
      loadingState,
      position = "top",
    },
    ref
  ) => {
    const [query, setQuery] = useState("");
    const [isContentScrolled, setIsContentScrolled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // biome-ignore lint/style/noNonNullAssertion: Ref is guaranteed to exist when accessed
    useImperativeHandle(ref, () => inputRef.current!);

    // Clear query when modal closes
    useEffect(() => {
      if (!isOpen) {
        setQuery("");
      }
    }, [isOpen]);

    const handleQueryChange = useCallback(
      (value: string) => {
        setQuery(value);
        onSearch(value);
      },
      [onSearch]
    );

    const handleSelectOption = useCallback(
      (result: SearchResult) => {
        if (!result) {
          return;
        }
        onSelectResult?.(result, query);
        onClose();
      },
      [onSelectResult, query, onClose]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle Escape key
        if (e.key === "Escape") {
          onClose();
          return;
        }

        // Handle Tab key to prevent default behavior when results exist
        if (
          e.key === "Tab" &&
          (results.length > 0 || recentSearches.length > 0)
        ) {
          e.preventDefault();
          // Reset cursor position to end of input
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          );
        }

        // Handle Enter + Cmd/Ctrl to select first result
        if (
          e.key === "Enter" &&
          (e.metaKey || e.ctrlKey) &&
          results.length > 0
        ) {
          const firstResult = results[0];
          if (firstResult) {
            handleSelectOption(firstResult);
          }
        }
      },
      [results, recentSearches, handleSelectOption, onClose]
    );

    const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
      setIsContentScrolled(e.currentTarget.scrollTop > 0);
    }, []);

    const showRecentSearches = useMemo(
      () => !query && recentSearches.length > 0 && results.length === 0,
      [query, recentSearches.length, results.length]
    );

    const showResults = useMemo(
      () => query && results.length > 0 && !isLoading,
      [query, results.length, isLoading]
    );

    const showEmptyState = useMemo(
      () => query && !isLoading && results.length === 0,
      [query, isLoading, results.length]
    );

    const searchContent = (
      <Combobox<SearchResult | null>
        onChange={(value) => {
          if (value) {
            handleSelectOption(value);
          }
        }}
        value={null}
      >
        {/* Search Input */}
        <div
          className={cn(
            "relative z-10 h-14 border-transparent border-b p-1.5 transition",
            isContentScrolled && "border-gray-200 dark:border-white/10"
          )}
        >
          <ComboboxInput
            autoComplete="off"
            autoFocus
            className={cn(
              "peer h-full w-full rounded-xl border border-gray-200 bg-white pr-14 pl-11 text-gray-950 tracking-tight outline-none transition placeholder:text-gray-400 focus:border-gray-950 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-white placeholder:dark:text-white/50",
              !isContentScrolled && query && "shadow-lg"
            )}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            value={query}
          />
          <SearchIcon
            className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-950 opacity-50 peer-focus:opacity-100 dark:text-white"
            size={18}
          />
          {query && (
            <div className="absolute top-1/2 right-6 flex -translate-y-1/2 items-center justify-center gap-1 rounded-md bg-gray-950/5 px-1.5 py-1.5 font-medium text-xs text-zinc-950/70 leading-[9px] dark:bg-white/5 dark:text-white/70">
              ESC
            </div>
          )}
        </div>

        {/* Results */}
        <ComboboxOptions
          className="mx-1.5 max-h-[calc(100vh-10rem)] overflow-y-auto"
          onScroll={handleScroll}
          static
        >
          {/* Recent Searches */}
          {showRecentSearches && (
            <>
              <div className="flex items-center justify-between px-2.5 py-2">
                <span className="truncate text-gray-500 text-sm">
                  Recent searches
                </span>
              </div>
              {recentSearches.map((result) => (
                <ComboboxOption
                  className="last:mb-2"
                  key={result.id}
                  value={result}
                >
                  {({ focus }) => (
                    <SearchHit
                      description={result.content}
                      header={result.header}
                      isActive={focus}
                      metadata={result.metadata}
                    />
                  )}
                </ComboboxOption>
              ))}
            </>
          )}

          {/* Search Results */}
          {showResults &&
            results.map((result) => (
              <ComboboxOption
                className="last:mb-2"
                key={result.id}
                value={result}
              >
                {({ focus }) => (
                  <SearchHit
                    description={result.content}
                    header={result.header}
                    isActive={focus}
                    metadata={result.metadata}
                  />
                )}
              </ComboboxOption>
            ))}

          {/* Loading State */}
          {isLoading && query && (
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              {loadingState || (
                <>
                  <Loader2Icon className="h-6 w-6 animate-spin text-gray-400 dark:text-gray-500" />
                  <div className="text-center">
                    <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
                      Searching...
                    </p>
                    <p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
                      Finding results for "{query}"
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Empty State */}
          {showEmptyState && (
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              {emptyState || (
                <>
                  <SearchXIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                  <div className="text-center">
                    <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
                      No results found
                    </p>
                    <p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
                      Try searching with different keywords
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </ComboboxOptions>
      </Combobox>
    );

    return (
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className={cn("relative z-50", className)}
          onClose={onClose}
        >
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity dark:bg-black/40" />
          </TransitionChild>

          {/* Modal */}
          <div
            className={cn(
              "fixed inset-0 z-10 flex justify-center p-4",
              position === "top" ? "items-start pt-16" : "items-center"
            )}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900">
                {searchContent}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

Search.displayName = "Search";
